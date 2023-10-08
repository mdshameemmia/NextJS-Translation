import Member from "@/models/Member";

const UserInfo = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await Member.findOne({ user_id: _id });
    return res.json(user);
  } catch (error) {
    throw new Error("Unauthorized person!");
  }
};

export default UserInfo;
