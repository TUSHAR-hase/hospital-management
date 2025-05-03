import Doctor from "../schemas/doctorschema.js";
import Patient from "../schemas/patient.js";
import Review from "../schemas/reviewschema.js"
// import Review from "../schemas/reviewschema.js";
import jwt from 'jsonwebtoken';

export const getalreview = async (res, resp) => {
    try {
      const id=res.params.id
     
        const review = await Review.find({doctorid:id});
        // console.log(`review data of is${review}`)
        
        resp.status(200).json({ review, success: "true" });
     
    } catch (error) {
      // console.log(error)
      resp.status(500).json({error:error});

    }
}
// export const createreview = async (res, resp) => {
//     if (!res.body.doctor) {
//         res.body.doctor = res.params.doctorId;
//     }
//     if (!res.body.patient) {
//         res.body.patient = res.params.patientId;
//     }
//     if (!res.body.receptation) {
//         res.body.receptation = res.params.receptationId;
//     } const newreview = new Review(res.body);
//     try {
//         const sevedreview = await newreview.save();
//         await Doctor.findByIdAndUpdate(req.body.doctor, {
//             $push: { reviews: sevedreview._id }
//         })
//         res.status(201).json({
//             status: "success",
//             data: sevedreview
//         })
//     } catch (error) {

//         res.status(404).json({
//             status: "error",
//             message: error.message
//         })
//     }
// } 
// export const createreview  = async (req, res) => {
//     try {
//         const id=req.params.id
//         const userid=req.user._id;
//       const {  rating, comment } = req.body;
    
//      console.log(userid)
//      console.log(id)

//       const existingReview = await Review.findOne({ doctor: id, user: userid });

//       if (existingReview) {
//         return res.status(400).json({ message: "You have already reviewed this doctor." });
//       }
  
//       // Create Review
//       const newreview = new Review(req.body);
//       const review= await newreview.save();
     
  
//       res.status(201).json({ success: true, message: "Review added successfully!",review });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };
export const createreview = async (req, res) => {
  try {
    console.log(req.params.id)
    const id=req.params.id

    console.log("Received Headers:", req.headers); // ✅ Check incoming headers

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Authorization Header Missing or Incorrect");  // ✅ Debug log
      return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);  // ✅ Debug log

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      console.log("Decoded Token:", decoded);
    } catch (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ success: false, message: "Invalid token." });
    }

    const userid = decoded.id;
    console.log("User ID from Token:", userid);
  
    console.log("Doctor ID:", id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Doctor ID is required." });
    }

    const existingReview = await Review.findOne({ doctorid: id, user: userid });
    if (existingReview) {
      return res.status(400).json({ success: false, message: "You have already reviewed this doctor." });
    }

    const { rating, comment ,name} = req.body;
    const newReview = new Review({
      doctorid: id,
      user: userid,
      rating,
      name:name,
      comment,
    });

    const review = await newReview.save();
    console.log("Review Saved Successfully:", review);

    res.status(201).json({ success: true, message: "Review added successfully!", review });
  } catch (error) {
    console.error("Error in creating review:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
