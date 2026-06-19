import nodemailer from "nodemailer";
import transporter from "../configs/mailService.js";

export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Welcome to GoGrocery Family",
            text: "Thank you for subscribing to GoGrocery. All latest updates will be sent here."
        });

        res.json({
            success: true
        });

    } catch (error) {   
        res.json({
            success: false,
            message: error.message
        });
    }
}

export const contact = async (req,res) => {
    try {
        const {email, message}=req.body;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to:process.env.MAIL_USER,
            subject:"Query from the customer",
            text:`From: ${email} \n\nMessage: ${message}`
        });

        res.json({
            success: true
        })

    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    }
};