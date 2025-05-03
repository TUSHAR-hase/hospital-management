import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, BriefcaseMedical, GraduationCap, Phone, CalendarCheck } from "lucide-react";
import { BASE_URL } from "../../config";
import {jwtDecode} from "jwt-decode";
const DoctorDetail = () => {
  // ... existing state and logic ...
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  const [doctors, setDoctors] = useState([]);
  const [name, setusername] = useState("")
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(doctors?.reviews || []);


  console.log("User Role:", role);
  console.log("User ID:", userid);
  console.log("Token from LocalStorage:", token);

  if (!token) {
    alert("Session expired! Please login again.");
    navigate("/login");
  }

 
const decodedToken = jwtDecode(token);
console.log("Decoded Token Data:", decodedToken);

 
  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/doctors/singledoctor/${id}`)
      .then(response => response.json())
      .then(data => {

        setDoctors(data.getdoctordetail);


      })
      .catch(error => {
        console.error("Error fetching doctors:", error);

      });
    if (role === "doctor") {
      fetch(`${BASE_URL}/api/v1/doctors/singledoctor/${id}`)
        .then(response => response.json())
        .then(data => {

          setDoctors(data.getdoctordetail);


        })
        .catch(error => {
          console.error("Error fetching doctors:", error);

        });
    } else {
      fetch(`${BASE_URL}/api/v1/users/singleuser/${userid}`)
        .then(response => response.json())
        .then(data => {
          console.log("Doctor Data:", data);
          setusername(data.getuserdetail.name);

        })
        .catch(error => {
          console.error("Error fetching doctors:", error);

        });
    }
    fetch(`${BASE_URL}/api/v1/review/allReviews/${id}`)
      .then(response => response.json())
      .then(data => {

        setReviews(data.review)
        // console.log("Review API Response:", data);

      })
      .catch(error => {
        console.error("Error fetching doctors:", error);

      });
  }, []);


  const submitReview = async (id, rating, comment, userid, token, name) => {
    try {

      console.log(token)
      const response = await fetch(`${BASE_URL}/api/v1/review/createReview/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },

        body: JSON.stringify({ rating, doctorid: id, comment, user: userid, name }),
      });
      const data = await response.json();
      console.log("Review API Response:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }
      alert("Review submitted successfully!");
      return data
    } catch (error) {

      return { success: false, message: "Something went wrong" };
    }
  };
  const handleSubmitReview = async () => {
    if (!userid) {
      alert("You need to login to submit a review!");
      return;
    }


    const result = await submitReview(id, rating, comment, userid, token, name);

    if (result.success) {
      setReviews([...reviews, { name: name, rating, comment }]);
      setRating(0);
      setComment("");
    } else {
      alert(result.message);
    }

  };
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Doctor Header */}
        <div className="flex flex-col md:flex-row items-start bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl p-8 rounded-2xl text-white">
          <div className="relative md:w-1/3">
            <img
              src={doctors?.image}
              alt={doctors.name}
              className="w-64 h-64 rounded-full border-8 border-white/20 object-cover shadow-2xl mx-auto"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-blue-900 px-6 py-2 rounded-full shadow-md font-semibold">
              $150/session
            </div>
          </div>

          <div className="md:ml-8 mt-8 md:mt-0 flex-1 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">{doctors.name}</h2>
            <p className="text-xl font-medium text-blue-100">{doctors.specialization}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center bg-white/10 p-3 rounded-lg">
                <BriefcaseMedical className="mr-2" />
                <span>{doctors.experience} Years Experience</span>
              </div>
              <div className="flex items-center bg-white/10 p-3 rounded-lg">
                <GraduationCap className="mr-2" />
                <span>{doctors.education}</span>
              </div>
              <div className="flex items-center bg-white/10 p-3 rounded-lg">
                <Phone className="mr-2" />
                <span>{doctors.contact?.phone}</span>
              </div>
            </div>

            <p className="text-lg leading-relaxed mt-4 opacity-90">{doctors.about}</p>

            <button
              className="mt-6 px-8 py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              onClick={() => navigate(`/appointment/${doctors._id}`)}
            >
              <CalendarCheck size={20} />
              Book Appointment
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white shadow-xl p-8 rounded-2xl">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Patient Experiences</h3>
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-800">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{review.name}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${i < review.rating ? "text-amber-400" : "text-gray-300"} ml-1`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 pl-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Feedback Section */}
        <div className="mt-12 bg-white shadow-xl p-8 rounded-2xl">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Share Your Experience</h3>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <label className="block text-lg font-medium text-gray-700 mb-3">Your Rating</label>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className={`cursor-pointer transition-transform ${i < rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300 hover:text-amber-300"
                      } hover:scale-125`}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">Your Feedback</label>
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Share details of your experience..."
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button
              className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all ${rating === 0 || !comment.trim()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
                }`}
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetail;