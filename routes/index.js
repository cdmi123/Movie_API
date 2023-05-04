var express = require('express');
var router = express.Router();
var register = require('../model/registermodel');
const storage = require('node-persist');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));

/* register */
router.post('/register', async function(req, res, next) {
  
  try {

    var data = await register.create(req.body);

      res.status(200).json({
        status:"success",
        data
      })

  } catch (error) {

      res.status(200).json({
        status:"somthing went to wrong",
        error
      })
  }


});

/* Login */
router.post('/login', async function(req, res, next) {
  
  try {
    
      var email = req.body.email;
      var password = req.body.password;

        var data = await register.find({"email":email})

          console.log(data[0]._id);

        if(data[0].password == password)
        {
          await storage.init();
          await storage.setItem('user_id',data[0].id);
          console.log(await storage.getItem('user_id')); // yourname
            res.status(200).json({
              status:"login successfully",
              data
            })
        }
        else
        {
          res.status(200).json({
            status:"Your Password incorrect",
          })
        }
  } catch (error) {

      res.status(200).json({
        status:"somthing went to wrong",
        error
      })
  }


});

module.exports = router;
