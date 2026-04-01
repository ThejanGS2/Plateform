import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { sendEmail } from '../utils/mailer';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req: Request, res: Response) => {
  const { fullName, password, phone } = req.body;
  const email = req.body.email.toLowerCase().trim();
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.isVerified) {
        return res.status(400).json({ message: 'User already exists and is verified. Please log in.' });
      } else {
        // User exists but not verified, generate new code and resend
        const newCode = generateVerificationCode();
        userExists.verificationCode = newCode;
        await userExists.save();
        
        await sendEmail(
          email,
          'Verify your Plateform account (New Code)',
          `Your new verification code is: ${newCode}`
        );
        
        return res.status(200).json({ 
          message: 'Account already exists but not verified. A new code has been sent.', 
          email: userExists.email 
        });
      }
    }

    const verificationCode = generateVerificationCode();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      isVerified: false,
      verificationCode
    });

    // Send email (in production, use a queue)
    await sendEmail(
      email,
      'Verify your Plateform account',
      `Your verification code is: ${verificationCode}`
    );

    res.status(201).json({
      message: 'Registration successful. Please verify your email.',
      email: newUser.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { code } = req.body;
  const email = req.body.email.toLowerCase().trim();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Email verified successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during verification' });
  }
};

export const resendCode = async (req: Request, res: Response) => {
  const email = req.body.email.toLowerCase();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    await user.save();

    await sendEmail(
      email,
      'Your new verification code',
      `Your new verification code is: ${verificationCode}`
    );

    res.json({ message: 'Verification code resent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while resending code' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase().trim();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failure: User ${email} not found in database.`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      console.log(`Login failure: User ${email} exists but is not verified.`);
      return res.status(401).json({ message: 'Please verify your email first', email: user.email });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login failure: Password mismatch for user ${email}.`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`Login success: User ${email} authenticated.`);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email.toLowerCase().trim();
  console.log(`\n[FORGOT PASSWORD] Recovery requested for: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    await user.save();

    await sendEmail(
      email,
      'Password Reset Code',
      `Your password reset code is: ${verificationCode}`
    );

    res.json({ message: 'Password reset code sent to your email', email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while sending reset code' });
  }
};

export const verifyResetCode = async (req: Request, res: Response) => {
  const { code } = req.body;
  const email = req.body.email.toLowerCase().trim();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Success, but don't delete yet. Let reset-password do that.
    res.json({ message: 'Code verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during code verification' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { code, password } = req.body;
  const email = req.body.email.toLowerCase().trim();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.verificationCode = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { fullName, phone, bio, email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  console.log(`\n[UPDATE PROFILE] Updating profile for: ${email}`);

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

