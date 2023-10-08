import db from "@/db/connect";
import Direction from "@/models/Direction";
import Flat from "@/models/Flat";
import Member from "@/models/Member";
import Role from "@/models/Role";
import User from "@/models/User";

const handler = async (req, res) => {
  await db.connect();
  const { memberType } = req.query;

  switch (memberType[0]) {
    case "store":
      await addMember(req, res);
      break;
    case "get":
      await getMember(req, res);
      break;
    case "edit":
      await editMember(req, res);
      break;
    case "update":
      await updateMember(req, res);
      break;
    case "delete":
      await deleteMember(req, res);
      break;
    case "getUserByMember":
      await getUserByMember(req, res);
      break;

    default:
      break;
  }
};
export default handler;

async function addMember(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "You aren't a user" });
  }
  const member = req.body;
  member.user_id = user._id;
  const new_member = await Member.create(req.body);
  
  // update direction 
  await Direction.findOneAndUpdate({user_id:user._id},{member_id:new_member._id});

  return res.status(201).json({ message: "Sucessfully added a member!" });
}

async function editMember(req, res) {
  {
    const { memberType } = req.query;
    const member = await Member.findById(memberType[1]);
    return res.status(200).json(member);
  }
}

async function updateMember(req, res) {
  {
    const data = req.body;
    await Member.findByIdAndUpdate(data._id, data);
    return res.status(200).json({ message: "Sucessfully update a member!" });
  }
}

async function getMember(req, res) {
  {
    const members = await Member.find({});
    return res.status(200).json(members);
  }
}
async function deleteMember(req, res) {
  {
    const { id } = req.body;
    await Member.findByIdAndDelete(id);
    return res.status(200).json({message:'success'});
  }
}

async function getUserByMember(req, res) {
  {
    const { memberType } = req.query;
    const user = await User.findById(memberType[1]).populate({
      path: "role_id",
      ref: Role.modelName,
      required:true
    });
 
    if (user.role_id.role == "admin") {
      const users = await User.find({ admin_mail: user.email }).select('email -_id');
      let user_emails =  [];

      users.forEach(user => {
        user_emails.push(user.email);
      })
      const members = await Member.find({"email" : { $in : user_emails }})
    
      return res.status(200).json(members);

    } else if(user.role_id.role == "user"){
      const member = await Member.find({ user_id: memberType[1] });
      return res.status(200).json(member);
    }else{
      const member = await Member.find({  });
      return res.status(200).json(member);
    }
  }
}
