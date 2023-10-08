import User from "@/models/User";

const UserInfo = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id).populate({ path: "role_id", model: "Role" });
    return res.json(user);
  } catch (error) {
    return res.json('User Not Found');
  }
};

export default UserInfo;