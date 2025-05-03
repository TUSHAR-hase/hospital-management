const uplode_url=import.meta.env.VITE_CLOUD_NAME;
const vita_uplode_preset=import.meta.env.VITE_UPLOAD_PRESET;

const uplodecloudnery=async (file)=>{
      if (!uplode_url || !vita_uplode_preset) {
            console.error("Cloudinary environment variables are missing.");
            return null;
          }
        
      const uplodedata=new FormData();
      uplodedata.append('file',file);
      uplodedata.append('upload_preset',"hospital_user");

      uplodedata.append('cloud_name',"dczul1z4n");
      const responce=await fetch(`https://api.cloudinary.com/v1_1/dczul1z4n/image/upload`,{
            method:'POST',
            body:uplodedata
      })

      const data= await responce.json();
      console.log(data);
      return data.secure_url || null;

}
export default uplodecloudnery;