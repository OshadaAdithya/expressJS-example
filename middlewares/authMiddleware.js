const jwt = require('jsonwebtoken');
const models = require('../models');
const { getPermissionsForRole } = require('../utils/roles');

const User = models.Users;


/*const authMiddleware=(req,res,next)=>{

    try {

        
        const secretKey = 'string'; 
        
        const [authType, token] = req.headers.authorization.split(' ');
        
        const decoded=jwt.verify(token, secretKey);
        
        req.body['role']= decoded.role;
        
        next();
        
      } catch (error) {
        console.log(error)
         res.status(401).json({
            message:"Invalid User",
            error: error
         })
    
        
      }
}

module.exports= authMiddleware;*/

const checkAdminRole = async (req, res, next) => {
   try {

    const email= req.body.email;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    const user = await User.findOne({
      where: { email } 
   });
     const userId = req.user.id; // Assuming you store the user information in the request object during authentication
     const userrole = await User.findByPk(userId, { include: 'role' });
 
     /*if (!user || user.role.name !== 'test') {
       return res.status(403).json({ success: false, message: 'Access forbidden. Admin role required.' });
     }*/

     if (!userrole || user.role.name!=='admin') {
      return res.status(403).json({ success: false, message: 'Access forbidden. Need admin role' });
    }

    //const userRole = user.role.name;
    
 

    next(); // Proceed to the next middleware or route handler
   } catch (error) {
     console.error('Error checking admin role:', error);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
 };
 
 module.exports = { checkAdminRole };