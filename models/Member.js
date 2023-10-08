const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;
const MemberSchema = new  mongoose.Schema({
   
    first_name:{
        type: String,
        required: [true, 'Must be provide first name'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    last_name:{
        type: String,
        required: [true, 'Must be provide last name'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    email:{
        type:String,
        required:[true,'Email must be provide'],
        index:true,
        unique:[true,'Email must be unique']

    },
    mobile:{
        type:Number,
        required:[true,'Must be provide mobile'],
        unique:[true,'Email must be unique']
    },
    nid:{
        type:Number,
        required:[true,'Must be provide NID'],
    },
    gender:{
        type:String,
        required:false,
    },
    blood_group:{
        type:String,
        required:false,
    },
    religion:{
        type:String,
        required:false,
    },
    marital_status:{
        type:String,
        required:false,
    },
    father_name:{
        type:String,
        required:false,
    },
    mother_name:{
        type:String,
        required:false,
    },
    guardian_name:{
        type:String,
        required:false,
    },
    village:{
        type:String,
        required:false,
    },
    post_office:{
        type:String,
        required:false,
    },
    post_code:{
        type:String,
        required:false,
    },
    police_station:{
        type:String,
        required:false,
    },
    district:{
        type:String,
        required:false,
    },
    division:{
        type:String,
        required:false,
    },
    profile:{
        type:String,
        required:false,
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    relations:[
        {
            type:Schema.Types.ObjectId,
            ref:"Member"
        }
    ]

},{
    timestamps:true
})



const Member = mongoose.models?.Member ||  mongoose.model('Member',MemberSchema);
export default Member;