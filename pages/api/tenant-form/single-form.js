import db from "@/db/connect";
import TenantForm from "@/models/TenantForm";

const SingleForm = async (req, res) => {
    await db.connect();
    try{
        const data = await TenantForm.findById(req.body.id);
        return res.status(200).json(data);

    }catch(err){
        res.json(err);
    }
}

export default SingleForm;