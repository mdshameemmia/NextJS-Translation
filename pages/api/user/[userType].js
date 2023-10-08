import bcrypt from "bcryptjs";

import Role from "@/models/Role";
import User from "@/models/User";
import db from "@/db/connect";

const handler = async (req, res) => {
  const { userType } = req.query;
  await db.connect();

  switch (userType) {
    case "register": {
      const { admin_mail, email, username, role_name, mobile } = req.body;
      const adminMail = await User.findOne({ email: admin_mail });

      if (admin_mail && !adminMail) {
        return res.status(404).json({ message: "Admin not found" });
      }

      if (email) {
        const isRegistered = await User.findOne({email});
        if(isRegistered){
          return res.status(404).json({ message: "This person has been already registered" });
        }
      }


      const userRole = await Role.findOne({ role: role_name });
      const role_id = userRole._id;

      const password = bcrypt.hashSync(req.body.password);

      const otp = Math.floor(Math.random() * 10000);

      const user = new User({ username, password, email, role_id, admin_mail, mobile, otp });
      await user.save();
      return res.status(201).json(user);
    }

    
  }
};

export default handler;
