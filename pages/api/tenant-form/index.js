import db from "@/db/connect";
import Direction from "@/models/Direction";
import TenantForm from "@/models/TenantForm";

const handler = async (req, res) => {
  await db.connect();
  switch (req.method) {
    case "POST": {
      await addTenantForm(req, res);
      break;
    }
  }
};

export default handler;

const addTenantForm = async (req, res) => {
  const tenantform = await TenantForm.create(req.body);

  // UPDATE DIRECTION 
  await Direction.findOneAndUpdate({user_id:req.body.user_id},{tenantform_id:tenantform._id});

  return res.status(201).json({ message: "Successfully created" });
};
