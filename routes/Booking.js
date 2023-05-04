var express = require('express');
var router = express.Router();
var register = require('../model/registermodel');
var login = require('../model/loginmodel');

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

        if(data[0].password == password)
        {
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

0
