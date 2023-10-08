import db from "@/db/connect";
import Building from "@/models/Building";
import Flat from "@/models/Flat";
import Floor from "@/models/Floor";
import Member from "@/models/Member";

const getUserInfoWithBuildingDetails = async (req, res) => {
  await db.connect();
  try {
    const { id } = req.body;
    const flat = await Flat.findOne({ user_id: id });
    const floor = await Floor.findById(flat.floor_id);
    const building = await Building.findById(floor.building_id);
    const member = await Member.findOne({ user_id: id });

    const data = {};
    data.status = flat.status;
    data.flat_id = flat._id;
    data.floor_id = flat.floor_id;
    data.building_id = floor.building_id;
    data.building_name = building.building_name;
    data.floor = floor.floor;
    data.flat = flat.flat;
    data.first_name = member.first_name;
    data.last_name = member.last_name;

    return res.status(200).json(data);
  } catch (err) {
    return res.json(err);
  }
};

export default getUserInfoWithBuildingDetails;
