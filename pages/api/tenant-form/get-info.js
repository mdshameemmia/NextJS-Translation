import db from "@/db/connect";
import Member from "@/models/Member";
import User from "@/models/User";
const GetInfo = async (req, res) => {
    await db.connect();
    try{
        const user = await Member.findOne({user_id:req.body.user_id}).populate({path:"user_id",model:"User"});
        return res.status(200).json(user);

    }catch(err){
        res.json(err);
    }
}

export default GetInfo;