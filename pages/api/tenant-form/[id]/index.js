import db from "@/db/connect";
import TenantForm from "@/models/TenantForm";

const handler = async (req, res) => {
  await db.connect();

  switch (req.method) {
    case "GET": {
      await getTenantForm(req, res);
      break;
    }
    case "PUT": {
      await updateTenantForm(req, res);
      break;
    }
    case "DELETE": {
      await deleteTenantForm(req, res);
      break;
    }
  }
};

export default handler;

const updateTenantForm = async (req, res) => {
  const { id } = req.query;
  const data = req.body;
  await TenantForm.findByIdAndUpdate(id, data);
  return res.status(200).json({ message: "Successfully updated" });
};

const getTenantForm = async (req, res) => {
  const { id } = req.query;
  const tenantForm = await TenantForm.findById(id);
  return res.status(200).json(tenantForm);
};

const deleteTenantForm = async (req, res) => {
  const { id } = req.query;
  await TenantForm.findByIdAndDelete(id);
  return res.status(200).json({ message: "Successfully deleted" });
};
