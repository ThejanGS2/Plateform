"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.resetPassword = exports.verifyResetCode = exports.forgotPassword = exports.login = exports.resendCode = exports.verifyEmail = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const mailer_1 = require("../utils/mailer");
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const register = async (req, res) => {
    const { fullName, password, phone, role } = req.body;
    const email = req.body.email.toLowerCase().trim();
    try {
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            if (userExists.isVerified) {
                return res.status(400).json({ message: 'User already exists and is verified. Please log in.' });
            }
            else {
                // User exists but not verified, generate new code and resend
                const newCode = generateVerificationCode();
                userExists.verificationCode = newCode;
                await userExists.save();
                await (0, mailer_1.sendEmail)(email, 'Verify your Plateform account (New Code)', `Your new verification code is: ${newCode}`);
                return res.status(200).json({
                    message: 'Account already exists but not verified. A new code has been sent.',
                    email: userExists.email
                });
            }
        }
        const verificationCode = generateVerificationCode();
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await User_1.default.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
            role: role || 'customer',
            isVerified: false,
            verificationCode
        });
        // Send email (in production, use a queue)
        await (0, mailer_1.sendEmail)(email, 'Verify your Plateform account', `Your verification code is: ${verificationCode}`);
        res.status(201).json({
            message: 'Registration successful. Please verify your email.',
            email: newUser.email
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};
exports.register = register;
const verifyEmail = async (req, res) => {
    const { code } = req.body;
    const email = req.body.email.toLowerCase().trim();
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            message: 'Email verified successfully',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                role: user.role
            },
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during verification' });
    }
};
exports.verifyEmail = verifyEmail;
const resendCode = async (req, res) => {
    const email = req.body.email.toLowerCase();
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const verificationCode = generateVerificationCode();
        user.verificationCode = verificationCode;
        await user.save();
        await (0, mailer_1.sendEmail)(email, 'Your new verification code', `Your new verification code is: ${verificationCode}`);
        res.json({ message: 'Verification code resent successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while resending code' });
    }
};
exports.resendCode = resendCode;
const login = async (req, res) => {
    const { password } = req.body;
    const email = req.body.email.toLowerCase().trim();
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log(`Login failure: User ${email} not found in database.`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            console.log(`Login failure: User ${email} exists but is not verified.`);
            return res.status(401).json({ message: 'Please verify your email first', email: user.email });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log(`Login failure: Password mismatch for user ${email}.`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log(`Login success: User ${email} authenticated.`);
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                role: user.role
            },
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    const email = req.body.email.toLowerCase().trim();
    console.log(`\n[FORGOT PASSWORD] Recovery requested for: ${email}`);
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const verificationCode = generateVerificationCode();
        user.verificationCode = verificationCode;
        await user.save();
        await (0, mailer_1.sendEmail)(email, 'Password Reset Code', `Your password reset code is: ${verificationCode}`);
        res.json({ message: 'Password reset code sent to your email', email });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while sending reset code' });
    }
};
exports.forgotPassword = forgotPassword;
const verifyResetCode = async (req, res) => {
    const { code } = req.body;
    const email = req.body.email.toLowerCase().trim();
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
        // Success, but don't delete yet. Let reset-password do that.
        res.json({ message: 'Code verified successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during code verification' });
    }
};
exports.verifyResetCode = verifyResetCode;
const resetPassword = async (req, res) => {
    const { code, password } = req.body;
    const email = req.body.email.toLowerCase().trim();
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        user.password = hashedPassword;
        user.verificationCode = undefined;
        await user.save();
        res.json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during password reset' });
    }
};
exports.resetPassword = resetPassword;
const updateProfile = async (req, res) => {
    const { fullName, phone, bio, avatarUrl } = req.body;
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    console.log(`\n[UPDATE PROFILE] Updating profile for user ID: ${userId}`);
    try {
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (fullName !== undefined)
            user.fullName = fullName;
        if (phone !== undefined)
            user.phone = phone;
        if (bio !== undefined)
            user.bio = bio;
        if (avatarUrl !== undefined)
            user.avatarUrl = avatarUrl;
        await user.save();
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating profile' });
    }
};
exports.updateProfile = updateProfile;
