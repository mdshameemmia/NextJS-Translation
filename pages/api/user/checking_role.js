import Role from "@/models/Role";
import User from "@/models/User";

const CheckingUser = async (req,res)=>{
    try {
        const {_id, email} = req.body;
        const user = await User.findOne({email}).populate({path:"role_id",model:Role});
        return res.json(user);
    } catch (error) {
        throw new Error('Unauthorized person!')
    }
}

export default CheckingUser;