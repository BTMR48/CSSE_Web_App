const Pass = require('../models/weeklyPass');

//add pass
exports.addPass = async(req,res) => {
    const {userId,month,week} = req.body;

    try {
        //checking product already exists
        const checkPass = await Pass.findOne({userId,month,week})
        if(checkPass)
            return res.status(409).json({message: "Pass already exists"})

        //creating a new  pass
        await Pass.create({userId,month,week});
        //success message
        res.status(200).json({success: true,message:"Pass added"})

    } catch (error) {
        //error message
        res.status(500).json({message: "Failed", error: error.message})
    }
}
