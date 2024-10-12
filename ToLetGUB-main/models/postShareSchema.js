const mongoose = require('mongoose');

const postShareSchema = mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    seat:{
        type: String,
        require: true,
    },
    entryMonth:{
        type: String,
        require: true,
    },
    rent:{
        type: Number,
        require: true,
    },
    distance:{
        type: String,
        require: true,
    },
    timeRequire:{
        type: String,
        require: true,
    },
    locationVillage:{
        type: String,
        require: true,
    },
    locationDistick:{
        type: String,
        require: true,
    },
    gender:{
        type: String,
        require: true,
    },
    facilities:[{
        type: String,
        default: "not set this moment",
    }],
    description:{
        type: String,
    },
    contactNumber:{
        type: String,
        require: true,
    },
    roomImage:{
        type: String,
        default: "not set this moment"
    },
    available:{
        type: String,
        enum: ["yes","no"],
        default: "yes",
    },
    studentPostedId:{
        type: mongoose.Types.ObjectId,
        ref: "StudentInformation",
    }
})

const postModel = mongoose.model("PostShareInformation",postShareSchema);

module.exports = postModel;