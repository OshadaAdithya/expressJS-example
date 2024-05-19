const Models = require('./../models');
const User = Models.Users;
const checkDuplicates = async (req,res,next)=>{
    try {
        const existing_user= await User.findOne({
            where:{
                email: req.body.email
            }

        });

        if(existing_user){
            return res.status(400).send({
                message: "Failed! Username is already in use!"
              });
        }
        next();
        
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username!"
        });
        
    }

}

module.exports = checkDuplicates;