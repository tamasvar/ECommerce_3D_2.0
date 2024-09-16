import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Extract email, products, shipping cost, etc., from request body
    const { email, products, shippingCost, totalPrice, orderDate, formattedAddress } = await request.json();

    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAILUSER!,
        pass: process.env.GMAILPASSWORD!,
      },
    });

    // Dynamically generate product rows for the email based on the products array
    const productRows = products
      .map((product: any) => {
        return `
        <tr>
          <td><img src="${product.product.image || 'https://via.placeholder.com/100'}" alt="${product.product.name}" style="max-width: 100px; border-radius: 5px;"></td>
          <td>${product.product.name}</td>
          <td>${product.style || 'N/A'}</td>
          <td>${product.size || 'N/A'}</td>
          <td style="text-align: right;">$${(product.price / 100).toFixed(2)}</td>
        </tr>
      `;
      })
      .join('');

    // Email content with dynamic data and inline CSS styling
    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order - Sultry3DPrints</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 800px;
            margin: 30px auto;
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #222;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .header h1 {
            font-size: 26px;
            color: #ff5722;
            margin: 0;
          }
          .header img {
            max-height: 50px;
          }
          .order-info {
            padding: 20px;
          }
          .order-info h2 {
            font-size: 18px;
            color: #ff5722;
            margin-bottom: 10px;
          }
          .order-info p {
            font-size: 16px;
            margin: 5px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            text-align: left;
            padding: 12px;
            border: 1px solid #ddd;
          }
          th {
            background-color: #ff5722;
            color: #fff;
          }
          .shipping, .total {
            text-align: right;
            padding-right: 20px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #888;
            background-color: #f0f0f0;
          }
          .footer a {
            color: #ff5722;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Summary - Sultry3DPrints</h1>
            <img src="https://sultry3dprints.com/logo.png" alt="Sultry3DPrints Logo">
          </div>

          <div class="order-info">
            <h2>Customer Information</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${formattedAddress}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Style</th>
                <th>Size</th>
                <th style="text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>

          <div class="shipping">
            <p><strong>Shipping:</strong> $${(shippingCost / 100).toFixed(2)}</p>
          </div>

          <div class="order-info total">
            <p><strong>Total: $${(totalPrice / 100).toFixed(2)}</strong></p>
          </div>

          <div class="footer">
            <p>Thank you for your order! Check out more of our work at <a href="https://linktr.ee/sultry3dprints">Linktree</a>!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Set up email details
    const mailOptions = {
      from: process.env.GMAILUSER!,
      to: email,
      subject: 'Order Summary - Sultry3DPrints',
      html: emailContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');

    // Respond with success
    return NextResponse.json({ message: 'Email Sent Successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to Send Email' }, { status: 500 });
  }
}
