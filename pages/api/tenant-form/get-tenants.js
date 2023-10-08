import db from "@/db/connect";
import TenantForm from "@/models/TenantForm";

const GetTenant = async(req, res) =>{
    await db.connect();
 try{
    const data = await TenantForm.find({user_id:req.body.user_id});
    return res.status(200).json(data);

 }catch(err){
    res.json(err);
 }
}

export default GetTenant;