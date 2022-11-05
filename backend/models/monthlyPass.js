const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const MonthlyPassSchema=new Schema({
    
    userId:{
        type: String,
        required:true
    },
    month:{
        type: String,
        required:true,
    }

})

const monthlyPass=mongoose.model("monthlypasses",MonthlyPassSchema);
module.exports = monthlyPass;