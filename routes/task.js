const express= require('express');
const router = express.Router();

const taskController= require('../controllers/task.controller')
const { checkAdminRole } = require("../middlewares/authMiddleware");
/*router.get("/", (req, res) => {
    res.send({ message: "Welcome to bezkoder application." });
});*/

router.get("/", taskController.getAll);

router.post("/", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);


module.exports=router;