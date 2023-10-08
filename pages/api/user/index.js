import db from "@/db/connect";
import Role from "@/models/Role";
import User from "@/models/User";

const Index = async (req, res) => {
  await db.connect();

  try {
    const { user_id } = req.body;

    const user = await User.findById(user_id).populate({
      path: "role_id",
      ref: Role.modelName,
      required: true,
    });

    let users = null;

    if (user.role_id.role == "admin") {
      users = await User.find({ admin_mail: user.email }).populate({
        path: "role_id",
        ref: Role.modelName,
        required: true,
      });
    } else if(user.role_id.role == "superadmin") {
      users = await User.find({admin_mail:""}).populate({
        path: "role_id",
        ref: Role.modelName,
        required: true,
      });
    }

    return res.status(200).json(users);
  } catch (err) {
    res.json(err);
  }
};

export default Index;
