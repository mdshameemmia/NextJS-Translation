const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role:{
        type: String
    },
},
{
    timestamps:true
})

const Role = mongoose.models.Role || mongoose.model('Role',RoleSchema);
export default Role;