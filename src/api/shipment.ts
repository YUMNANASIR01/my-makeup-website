// pages/api/shipment.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      country,
      paymentMethod,
      cartItems,
    } = req.body;

    // Basic validation
    if (!name || !email || !phone || !address || !city || !country || !paymentMethod || !cartItems?.length) {
      return res.status(400).json({ error: 'Missing required fields or cart is empty.' });
    }

    // Simulate DB save / shipment processing
    const fakeShipmentId = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.status(200).json({
      message: 'Order placed successfully!',
      shipmentId: fakeShipmentId,
      status: 'pending',
      paymentMethod,
      estDelivery: '3-5 business days',
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
