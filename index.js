

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const authMiddleware= require("./middlewares/authMiddleware");
const checkDuplicates= require("./middlewares/verifySignUp");
const { checkAdminRole } = require('./middlewares/authMiddleware');


const taskRouter= require('./routes/task');
const userRouter= require('./routes/users');
app.use(cors());           // should come before the rest of the code
app.use(express.json())    // should be added to convert request body to json format
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users/register",checkDuplicates);
app.use("/api/roles/admin-only",checkAdminRole);
app.use("/api/users", userRouter);

app.use("/api/tasks/:id", checkAdminRole);
app.use("/api/tasks", taskRouter);




//const user= require('./routes/users');

//app.use('/api/tasks',log, task);

//app.use('/api/users',user);

//console.log(app.get('env'));

/*function log(req, res, next){
  console.log('hello world, it is a middleware')
  next();

};*/


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



