import db from "@/db/connect";
import User from "@/models/User";
const OtpVerify = async (req, res) => {
  await db.connect();
  try {
    const { id, otp } = req.body;

    const user = await User.findOne({_id:id,otp});
    
    if(user){
        return res.status(200).json({ message: "success" });
    }else{
        return res.status(200).json({ message: "otp does not match" });  
    }

  } catch (err) {
    return res.json(err);
  }
};

export default OtpVerify;
