import db from "@/db/connect";
import SendMessage from "@/helpers/SendMessage";
import User from "@/models/User";
const approveHandler = async (req, res) => {
  await db.connect();
  try {
    const user = await User.findById(req.body.id);
    user.is_verified = true;
    await user.save();
    SendMessage(user.mobile,`Your login credentials has been approved by authority. Now you can login your dashboard`);
    return res.status(200).json({ message: "Successfully approved" });
  } catch (err) {
    return res.json(err);
  }
};

export default approveHandler;
