import db from "@/db/connect";
import Role from "@/models/Role";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  await db.connect();

  switch (req.method) {
    case "GET": {
      await getUser(req, res);
      break;
    }
    case "PUT": {
      await updateUser(req, res);
      break;
    }
    case "DELETE": {
      await deleteUser(req, res);
      break;
    }
  }
};

export default handler;

const getUser = async (req, res) => {
  const { id } = req.query;
  const user = await User.findById(id).populate({
    path: "role_id",
    model: "Role",
  });
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  await User.findByIdAndDelete(id);
  return res.status(200).json({ message: "Successfully deleted" });
};

const updateUser = async (req, res) => {
  const { id } = req.query;

  const { admin_mail, email, username, role_name, mobile } = req.body;
  const adminMail = await User.findOne({ email: admin_mail });

  if (admin_mail && !adminMail) {
    return res.status(404).json({ message: "Admin not found" });
  }
  const userRole = await Role.findOne({ role: role_name });
  const role_id = userRole._id;

  const password = bcrypt.hashSync(req.body.password);

  const user = await User.findById(id);
  user.username = username;
  user.email = email;
  user.password = password;
  await user.save();

  return res.status(201).json({ message: "Successfully updated!" });
};
