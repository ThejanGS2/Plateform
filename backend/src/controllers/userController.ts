import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import User from '../models/User';

// Addresses
export const getAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('addresses');
    res.json(user?.addresses || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addAddress = async (req: AuthRequest, res: Response) => {
  const { label, street, city, postCode, apartment, isDefault } = req.body;
  console.log('Backend: Adding address for user:', req.user?.id, 'Data:', req.body);
  try {
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push({ label, street, city, postCode, apartment, isDefault });
    console.log('Backend: User addresses BEFORE save:', JSON.stringify(user.addresses, null, 2));
    await user.save();
    console.log('Backend: User addresses AFTER save:', JSON.stringify(user.addresses, null, 2));
    res.status(201).json(user.addresses);
  } catch (error: any) {
    console.error('Backend: addAddress error:', error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const removeAddress = async (req: AuthRequest, res: Response) => {
  const { addressId } = req.params;
  try {
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.addresses = user.addresses.filter(addr => (addr as any)._id.toString() !== addressId);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAddress = async (req: AuthRequest, res: Response) => {
  const { addressId } = req.params;
  const { label, street, city, postCode, apartment, isDefault } = req.body;
  try {
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const address = (user.addresses as any).id(addressId);
    if (!address) return res.status(404).json({ message: 'Address not found' });

    if (label !== undefined) address.label = label;
    if (street !== undefined) address.street = street;
    if (city !== undefined) address.city = city;
    if (postCode !== undefined) address.postCode = postCode;
    if (apartment !== undefined) address.apartment = apartment;
    if (isDefault !== undefined) {
      if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }
      address.isDefault = isDefault;
    }

    console.log('Backend: Address BEFORE update save:', JSON.stringify(address, null, 2));
    await user.save();
    console.log('Backend: Address AFTER update save:', JSON.stringify(address, null, 2));
    res.json(user.addresses);
  } catch (error: any) {
    console.error('Backend: updateAddress error:', error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

import PaymentMethod from '../models/PaymentMethod';

// Payment Methods
export const getPaymentMethods = async (req: AuthRequest, res: Response) => {
  try {
    const methods = await PaymentMethod.find({ userId: req.user?.id });
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addPaymentMethod = async (req: AuthRequest, res: Response) => {
  const { cardHolder, cardNumber, expiryDate, cardType, isDefault, cvc } = req.body;
  try {
    if (isDefault) {
      await PaymentMethod.updateMany({ userId: req.user?.id }, { isDefault: false });
    }

    const newMethod = new PaymentMethod({
      userId: req.user?.id,
      cardHolder,
      cardNumber,
      expiryDate,
      cardType,
      cvc,
      isDefault
    });

    await newMethod.save();
    const updatedMethods = await PaymentMethod.find({ userId: req.user?.id });
    res.status(201).json(updatedMethods);
  } catch (error: any) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const removePaymentMethod = async (req: AuthRequest, res: Response) => {
  const { paymentMethodId } = req.params;
  try {
    const method = await PaymentMethod.findOne({ _id: paymentMethodId, userId: req.user?.id });
    if (!method) return res.status(404).json({ message: 'Payment method not found' });

    await PaymentMethod.deleteOne({ _id: paymentMethodId });
    const updatedMethods = await PaymentMethod.find({ userId: req.user?.id });
    res.json(updatedMethods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
