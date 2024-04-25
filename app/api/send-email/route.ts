import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

export async function POST(req: Request) {
    try {

        const { name, email, message } = await req.json()

        // Setup the transporter for nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'jaydenbaek0522@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            },
        });

        // Prepare email data
        const mailOptions = {
            from: 'jaydenbaek0522@gmail.com', // sender address
            to: "baekjinho0522@gmail.com", // your own email address to receive messages
            subject: "New Message from Personal Website",
            text: `Message from: ${name} \nEmail: ${email} \nMessage: ${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false, message: 'Failed to send email' }), { status: 500 });
    }
}
