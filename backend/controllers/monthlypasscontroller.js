const Pass = require('../models/monthlyPass');

//add pass
exports.addPass = async(req,res) => {
    const {userId,month} = req.body;

    try {
        //checking product already exists
        const checkPass = await Pass.findOne({userId,month})
        if(checkPass)
            return res.status(409).json({message: "Pass already exists"})

        //creating a new  pass
        await Pass.create({userId,month});
        //success message
        res.status(200).json({success: true,message:"Pass added"})

    } catch (error) {
        //error message
        res.status(500).json({message: "Failed", error: error.message})
    }
}
