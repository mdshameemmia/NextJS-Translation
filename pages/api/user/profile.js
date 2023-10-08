import Member from "@/models/Member";
import { IncomingForm } from "formidable";
var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

const ProfileUpload = async (req, res) => {
  const form = new IncomingForm();
  let time = Date.now();
  form.parse(req, (err, fields, files) => {
    const oldPath = files.file.filepath;
    const _id = fields._id;
    const profile = "member_" + time + files.file.originalFilename;
    const newPath = `./public/images/${profile}`;
    mv(oldPath, newPath, function (err) {});

    Member.findOne({ user_id: _id })
      .updateOne({ profile })
      .then(
        (res) => console.log(`updated`),
        (err) => console.error(`Something went wrong: ${err}`)
      );

    res.json(profile);
  });
};
export default ProfileUpload;
