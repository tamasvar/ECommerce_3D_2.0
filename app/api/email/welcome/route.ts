import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    // Itt kezeld a POST kérést
   
    try {
    const { email } = await request.json(); // Az e-mail cím és a kosár tartalma
    

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAILUSER!,
      pass: process.env.GMAILPASSWORD!,
    },
    });


    const toHostMailData = {
      from: process.env.GMAILUSER!,
      to: [email], // Both user and host emails
      subject: "Welcome to Sultry3DPrints", // E-mail tárgya
      html: ` 
	  		<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Sultry3DPrints</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
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
      text-align: left;
      flex-grow: 1;
    }
    .header img {
      max-height: 50px;
      margin-left: 20px;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
      padding: 0 20px;
    }
    .service-item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 100px;
    }
    .service-item img {
      max-width: 50%;
      border-radius: 10px;
    }
    .cta {
      text-align: center;
      margin: 30px 0;
    }
    .cta a {
      background-color: #ff5722;
      color: #fff;
      padding: 12px 25px;
      border-radius: 30px;
      text-decoration: none;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    .cta a:hover {
      background-color: #e64a19;
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
    .contact-message {
      text-align: center;
      margin: 20px;
      font-size: 16px;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Sultry3DPrints!</h1>
      <img src="https://sultry3dprints.com/logo.png" alt="Sultry3DPrints Logo">
    </div>

    <p>We're excited to have you on board! At <strong>Sultry3DPrints</strong>, we specialize in crafting high-quality 3D-printed figurines and custom vinyl stickers to bring your designs to life.</p>

    <p>We offer two main services:</p>

    <h2 style="color: #ff5722; font-size: 18px; text-align: center;">3D Printing</h2>
    <p>If you find a 3D model online, we can print it for you in any size, from small to large-scale. We even offer custom painting services for your 3D prints, though please note that painting requires a bit more time to complete.</p>
    <div class="service-item">
      <img src="https://sultry3dprints.com/assets/welcome_email3d.jpg" alt="3D Model">
    </div>
    <h2 style="color: #ff5722; font-size: 18px; text-align: center;">Vinyl Stickers</h2>
    <p>Have a high-resolution image? We can turn it into a custom vinyl sticker of any size. Whether it's for your personal collection or something more creative, we've got you covered with high-quality, durable vinyl stickers.</p>
      <div class="service-item">
        <img src="https://sultry3dprints.com/assets/welcome_emailvinyil.png" alt="Vinyl Stickers">
      </div>
    

    <div class="contact-message">
      <p>If you have any requests or questions, don't hesitate to <a href="mailto:your-email@example.com">contact me</a>!</p>
    </div>

    <div class="cta">
      <a href="https://linktr.ee/sultry3dprints">See Our Previous Work</a>
    </div>

    <div class="footer">
      <p>Check out our previous projects and stay updated on <a href="https://linktr.ee/sultry3dprints">Linktree</a>!</p>
    </div>
  </div>
</body>
</html>

      `,
    };

    
    await transporter.sendMail(toHostMailData);
    console.log("Email sent successfully.");
    
     return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}       

