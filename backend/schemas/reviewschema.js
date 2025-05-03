import mongoose from 'mongoose';
import { Path } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Doctor from './doctorschema.js';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',  // Reference to the User model (who wrote the review)
    required: true
  },
  doctorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',  // Reference to the Doctor model
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5  // Rating should be between 1 and 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  }, 
  name: {
    type: String,
    required: true,
   
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// reviewSchema.pre("/^find/",function (next){
//     this.populate({
//         Path:'user',
//         select:'name photo'
//     });
//     next();

// });
// reviewSchema.statics.calcAverageRatings=async function(doctorId){
// const stats=await this.aggregate([{
//     $match:{
//         doctor:doctorId}
        
// },
// {
//     $group:{
//         _id:"$doctor",
//         averageRating:{$avg:"$rating"},
//         numofrating:{$sum:1}

    
//     }
// }
// ])
// console.log(stats)
// await Doctor.findByIdAndUpdate(doctorId,{
//     totalRating:stats[0].numofrating,
//     // averageRating.stats[0].avgRating
// })

// }
// reviewSchema.post('save',function(){
//     this.constructor.calcAverageRatings(this.doctor)
// })
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
