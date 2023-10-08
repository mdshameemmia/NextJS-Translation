const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TenantFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
  },
  driver_address: {
    type: String,
  },
  driver_mobile: {
    type: String,
  },
  driver_name: {
    type: String,
  },
  driver_nid: {
    type: String,
  },
  e_address: {
    type: String,
  },
  e_mobile: {
    type: String,
  },
  e_name: {
    type: String,
  },
  e_relation: {
    type: String,
  },
  educational_qualification: {
    type: String,
  },
  email: {
    type: String,
  },
  father_name: {
    type: String,
  },
  housewife_address: {
    type: String,
  },
  housewife_mobile: {
    type: String,
  },
  housewife_name: {
    type: String,
  },
  housewife_nid: {
    type: String,
  },
  is_married: {
    type: String,
  },
  m_age1: {
    type: String,
  },
  m_age2: {
    type: String,
  },
  m_age3: {
    type: String,
  },
  m_age4: {
    type: String,
  },
  m_mobile1: {
    type: String,
  },
  m_mobile2: {
    type: String,
  },
  m_mobile3: {
    type: String,
  },
  m_mobile4: {
    type: String,
  },
  m_name1: {
    type: String,
  },
  m_name2: {
    type: String,
  },
  m_name3: {
    type: String,
  },
  m_name4: {
    type: String,
  },
  m_profession1: {
    type: String,
  },
  m_profession2: {
    type: String,
  },
  m_profession3: {
    type: String,
  },
  m_profession4: {
    type: String,
  },
  marital_status: {
    type: String,
  },
  mobile: {
    type: String,
  },

  nid: {
    type: String,
  },
  passport: {
    type: String,
  },
  permanent_address: {
    type: String,
  },
  present_house_owner_address: {
    type: String,
  },
  present_house_owner_mobile: {
    type: String,
  },
  present_house_owner_name: {
    type: String,
  },
  previous_house_owner_address: {
    type: String,
  },
  previous_house_owner_mobile: {
    type: String,
  },
  previous_house_owner_name: {
    type: String,
  },
  profession_and_institution: {
    type: String,
  },
  reason_of_previous_house_leave: {
    type: String,
  },
  religion: {
    type: String,
  },
  starting_date: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const TenantForm =
  mongoose.models?.TenantForm || mongoose.model("TenantForm", TenantFormSchema);
export default TenantForm;
