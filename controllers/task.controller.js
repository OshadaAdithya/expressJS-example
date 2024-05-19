

const {Task}  = require("../models");
//const {sequelize}= require("../models/index");
const { checkAdminRole } = require("../middlewares/authMiddleware");

let taskController = {};

taskController.getAll = async (req, res) => {
  try {
    console.log(Task);
    const tasks = await Task.findAll({
      attributes: ["id", "task", "status"],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

taskController.createTask = async (req, res) => {
try {

  const { name, status } = req.body; 
  const newProject = {
      
      task: name,
      status: status,
      //user_id: req.body.user_id
  };
  let data = await Task.create(newProject);
  return res.status(201).json({
      success: true,
      data: data
  })
} catch (error) {
  return res.status(500).json({
      success: false,
      error: error
  })
}
};

taskController.updateTask = async (req, res) => {
  try {
   const taskId  =  req.params.id

   const taskUpdated = req.body.name;
   const statusUpdated =  req.body.status;

   
   console.log(req.body);
   let data = await Task.update({task: taskUpdated, status: statusUpdated} , {
            where: {
                id: taskId,
            }
    });

     console.log(data);
    if (data[0] === 0) {
      
      return res.status(404).json({
      success: false,
      error: "Issue with updating task",
    })}
     
    return res.status(200).json({
      
        success: true,
        //data: data,
        message: 'Project updated successfully'
        
    });
    
  } catch (error) {
    return res.status(500).json({
        success: false,
        error: error
    })
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const taskId  =  req.params.id

    let data = await Task.destroy( {
      where: {
          id: taskId,
      }
  });

  if (data === 1) {
    return res.status(200).json({
    success: true,
    message: 'User with id=${id} deleted'
    })
    }
    
    return res.status(404).json({
    success: false,
    message: 'User with id=${id} is not present.'
    },
    
    )
      
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error
  })
  }

 
}




module.exports = taskController;
