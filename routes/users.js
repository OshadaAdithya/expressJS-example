/*const express= require('express');

const router= express.Router();


router.get('/', (req, res)=>{
    res.send({ message: "user of application" });
});


module.exports= router;*/
const express = require('express');
const router = express.Router();
const Models = require('./../models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const checkDuplicates = require('../middlewares/verifySignUp');
const User = Models.Users;
const Role= Models.Role;

dotenv.config();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

const secretKey = 'string'; 
router.post('/register', async(req, res)=>{
    try {
         
        const salt = await bcrypt.genSaltSync(10);
        const user = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            password : await bcrypt.hashSync(req.body.password, salt),
            roleId: req.body.role

        };
        created_user = await User.create(user);
        if (!created_user) {
            throw new Error('User creation failed.');
        }
        //res.status(201).json(created_user);
        //console.log(created_user);

        // Create and assign a token (you can also use other token types like JWT)
        //const token = jwt.sign({ id: created_user.id }, process.env.TOKEN_SECRET);
        /*const token='string'
        console.log(token);*/
        
        //res.header('auth-token', token).send(created_user);
      
          res.status(201).json({
            success: true,
            message: 'User Registered successfully',
            user: created_user
            //token: token
          });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to register user' });
  
    }
  
});


router.post('/login', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      // Check if the user exists in the database
      const user = await User.findOne({
         where: { email } 
      });
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      // Check if the password is correct
      const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );
      console.log('password :',passwordIsValid)
      if (!passwordIsValid) {
        return res.status(400).json({ 
          success: false, message: 'Invalid credentials' 
        });
      };

      // Fetch the user's role from the database
      const userRole = await Role.findOne({
        where: { id: user.roleId } 
      });

      if (!userRole) {
          return res.status(500).json({ 
              success: false, message: 'User role not found.' 
          });
      }

      const payload = { 
        id: user.id,
        role:userRole.name    //'admin'
      };

      
  
      // Create and assign a token upon successful login

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

      res.status(200).json({ 
        //token,
        payload,
        message:'Login Successfull'
       });
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ 
        success: false, message: 'Login failed. Please try again later.' 
      });
    }
});

/*router.get('/test', async (req, res) => {
  try {

    

    res.json(req.body.role);
    
  } catch (error) {
    console.log(error)

    
  }

});*/



module.exports = router;