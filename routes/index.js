var express = require('express');
var router = express.Router();
var register = require('../model/registermodel');
const storage = require('node-persist');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:5000', 
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

  if(localStorage.getItem('user_id')==null)
  {
      try {
      
        var email = req.body.email;
        var password = req.body.password;

          var data = await register.find({"email":email})

          if(data[0].password == password)
          {
            localStorage.setItem('user_id',data[0].id);
            if(email=="admin@gmail.com")
            {
              localStorage.setItem('status',"1");
            }
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
  }
  else
  {
    res.status(200).json({
      status:"First Logout Running Account",
      code:4
    })
  }
  
 
});

/* Logout */
router.get('/logout', async function(req, res, next) {
  
  try {

      localStorage.clear();

      res.status(200).json({
        status:"user Logout successfully",
        code:0
      })

  } catch (error) {

      res.status(200).json({
        status:"somthing went to wrong",
        error
      })
  }
});

module.exports = router;
