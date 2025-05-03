import { useState } from "react";
import uplodecloudnery from '../util/uplodecloudnery.js';
import { BASE_URL } from '../../config.js';
import { useNavigate } from "react-router-dom";

const DoctorForm = ({ onSubmit }) => {
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [contact, setcontact] = useState('');
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate=useNavigate();
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "male",
        
        image:selectedFile,
        specialization: "",
        experience: "",
        qualifications: [],
        bio: "",
        
        contact: {
            phone: contact, 
            address:address,  
          },
        availability: {
            days: [],
            timeSlots: [],
        }
    });

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const timeSlots = ["09:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            availability: {
                ...prev.availability,
                [type]: prev.availability[type].includes(value)
                    ? prev.availability[type].filter((item) => item !== value)
                    : [...prev.availability[type], value],
            },
        }));
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
      
        if (file) {
          setImage(file);
          console.log("Uploading image...");
      
          try {
            const uploadedImageUrl = await uplodecloudnery(file);
            console.log("Image uploaded:", uploadedImageUrl);
      
            if (!uploadedImageUrl) {
              alert("Image upload failed. Try again.");
              return;
            }
      
            setSelectedFile(uploadedImageUrl);
            setFormData((prev) => ({ ...prev, image: uploadedImageUrl }));
          } catch (err) {
            console.error("Image upload error:", err);
            alert("Image upload failed.");
          }
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
       console.log(
        "Form data:",
        formData,name,address,contact,email,experience,qualifications,bio,password,specialization
       )
        if (!name ||!password||!email) {
            alert("Please fill all the fields");
        } else {
            const res = await fetch(`${BASE_URL}/api/v1/doctors/postdoctor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {
                    name: name,
                    email: email,
                    password: password,
                    gender: gender,
                    
                    image:selectedFile,
                    specialization:specialization,
                    experience: experience,
                    qualifications: qualifications,
                    bio: bio,
                    
                    contact: {
                        phone: contact, 
                        address:address,  
                      },
                    availability: {
                        days:formData.availability.days,
                        timeSlots: formData.availability.timeSlots,
                    }
                } ),


            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                alert("Registered successfully! Redirecting to login...");
                localStorage.setItem("userid",data.doctor._id)
                localStorage.setItem("token",data.token)
      localStorage.setItem("role", data.user.role);

                console.log(data.token)
                navigate("/otpchack/"+email); 

            } else {
                alert(data.message || "Registration failed.");
            }
        }
    };

    return (
        <div className="p-8 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Doctor Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Full Name"  value={name}
                onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
                <input type="email" name="email"  value={email}
                onChange={(e) => setEmail(e.target.value)}  placeholder="Email" className="w-full p-2 border rounded" required />
                <input type="password"  value={password}
                onChange={(e) => setPassword(e.target.value)}  name="password" placeholder="Password" className="w-full p-2 border rounded" required />
                <select name="gender"  value={gender}
                onChange={(e) => setGender(e.target.value)}  className="w-full p-2 border rounded">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <div>
              <label htmlFor="image" className="block text-xl font-medium text-gray-600">Profile Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full px-6 py-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-xl"
                required
              />
              {image && <div className="mt-4 text-center text-lg">Image Selected</div>}
            </div>
                <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)}  name="specialization" placeholder="Specialization"  className="w-full p-2 border rounded" required />
                <input type="number" name="experience" placeholder="Years of Experience"  onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full p-2 border rounded" required />
                <input type="text" name="qualifications" placeholder="Qualifications (comma separated)"  onChange={(e) => setQualifications(e.target.value)} value={qualifications}  className="w-full p-2 border rounded" required />
                <textarea name="bio" placeholder="Short Bio"  onChange={(e) => setBio(e.target.value)} value={bio} className="w-full p-2 border rounded"></textarea>
                <input type="text" name="phone" placeholder="Phone Number"  onChange={(e) => setcontact(e.target.value)} value={contact} className="w-full p-2 border rounded" required />
                <input type="text" name="address" placeholder="Address"  onChange={(e) => setAddress(e.target.value)} value={address} className="w-full p-2 border rounded" required />

                {/* Availability */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Availability</h3>
                    <div className="flex flex-wrap gap-3">
                        {daysOfWeek.map((day) => (
                            <label key={day} className="flex items-center space-x-2">
                                <input type="checkbox" onChange={() => handleCheckboxChange("days", day)} />
                                <span>{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Available Time Slots</h3>
                    <div className="flex flex-wrap gap-3">
                        {timeSlots.map((slot) => (
                            <label key={slot} className="flex items-center space-x-2">
                                <input type="checkbox" onChange={() => handleCheckboxChange("timeSlots", slot)} />
                                <span>{slot}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded font-bold">Register</button>
            </form>
        </div>
    );
};

export default DoctorForm;
