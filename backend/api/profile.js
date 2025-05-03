import jwt from "jsonwebtoken";
import Doctor from "../schemas/doctorschema.js";
import Patient from "../schemas/patientschema.js";
import Receptionist from "../schemas/recption.js";


export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        let user = await Doctor.findById(decoded.id) ||
                   await Patient.findById(decoded.id) ||
                   await Receptionist.findById(decoded.id) 

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
