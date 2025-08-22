
import express from "express";
import Application from "../schemas/applicationschema.js"
const router = express.Router();
export const postinternship=async(req,res)=>{
     const { name, email, phone, resume_url, portfolio_url, Cover_latter, id, title, organization } = req.body;
console.log(req.body)
  if (!name || !email || !resume_url || !id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const application = new Application({
      name,
      email,
      phone,
      resume_url,
      portfolio_url,  // Naya field yahan include karo
      Cover_latter,
      id,
    title,
      organization,
    });

    await application.save();

    res.status(200).json({ message: 'Application saved successfully', data: application });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
export default router