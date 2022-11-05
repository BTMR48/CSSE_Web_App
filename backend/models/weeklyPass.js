const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const WeeklyPassSchema=new Schema({
    
    userId:{
        type: String,
        required:true
    },
    month:{
        type: String,
        required:true,
    },
    week:{
        type: String,
        required:true
    }

})

const weeklyPass = mongoose.model("weeklypasses",WeeklyPassSchema);
module.exports = weeklyPass;