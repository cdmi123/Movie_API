var express = require('express');
var router = express.Router();
var movie = require('../model/moviemodel');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


/* Add movie */
router.post('/Add_movie', async function(req, res, next) {

  var user_id = localStorage.getItem('user_id');
  var status = localStorage.getItem('status');

  if(user_id!=null)
  {
      if(status==1)
      {
        try {

          var data = await movie.create(req.body);
    
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
      }
      else
      {
        res.status(401).json({
          status:"You Are not admin",
          code:3
        })
      }
  }
  else
  {
      res.status(401).json({
        status:"User Can't login",
        code:2
      })
  }


});

/* View Movie */
router.get('/view_movie', async function(req, res, next) {
  
  var user_id = localStorage.getItem('user_id');
  if(user_id!=null)
  {
    try {
          var data = await movie.find();
        
            res.status(200).json({
              status:"Movie Data",
              data
            })
    } catch (error) {
        res.status(200).json({
          status:"somthing went to wrong",
          error
        })
    }
  }
  else
  {
    res.status(401).json({
      status:"User Can't login",
      code:2
    })
  }

});

/* search Movie */
router.get('/search/:name', async function(req, res, next) {
  
  var user_id = localStorage.getItem('user_id');
  if(user_id!=null)
  {
    try {
      var name = req.params.name;
          var data = await movie.find({"name":name});
            res.status(200).json({
              status:"Movie Data",
              data
            })
    } catch (error) {
        res.status(200).json({
          status:"somthing went to wrong",
          error
        })
    }
  }
  else
  {
    res.status(401).json({
      status:"User Can't login",
      code:2
    })
  }
});

/* Single movie */
router.get('/single_movie/:id', async function(req, res, next) {

  var user_id = localStorage.getItem('user_id');
  if(user_id!=null)
  {
    try {
      var id = req.params.id;
          var data = await movie.findById(id);
            res.status(200).json({
              status:"Movie Data",
              data
            })
    } catch (error) {
        res.status(200).json({
          status:"somthing went to wrong",
          error
        })
    }
  }
  else
  {
    res.status(401).json({
      status:"User Can't login",
      code:2
    })
  }

});

/* edit movie */
router.post('/edit-movie/:id', async function(req, res, next) {

  var user_id = localStorage.getItem('user_id');
  if(user_id!=null)
  {
    try {
      var id = req.params.id;
      var data = await movie.findByIdAndUpdate(id,{name:req.body.name});
      var data = await movie.findByIdAndUpdate(id,{category:req.body.category});
      var data = await movie.findByIdAndUpdate(id,{language:req.body.language});
      var data = await movie.findByIdAndUpdate(id,{release_date:req.body.release_date});
      var data = await movie.findByIdAndUpdate(id,{summary:req.body.summary});
      var data = await movie.findByIdAndUpdate(id,{cast_name:req.body.cast_name});
      var data = await movie.findByIdAndUpdate(id,{crew_name:req.body.crew_name});

            res.status(200).json({
              status:"Update Data",
              data
            })
    } catch (error) {
        res.status(200).json({
          status:"somthing went to wrong",
          error
        })
    }
  }
  else
  {
    res.status(401).json({
      status:"User Can't login",
      code:2
    })
  }

});

/* Delete Movie */
router.get('/delete-movie/:id', async function(req, res, next) {
  var user_id = localStorage.getItem('user_id');
  if(user_id!=null)
  {
    try {
      var id = req.params.id;
          var data = await movie.findByIdAndRemove(id);
            res.status(200).json({
              status:"Moview Deleted",
              code:1,
            })
    } catch (error) {
        res.status(200).json({
          status:"somthing went to wrong",
          code:2,
          error
        })
    }
  }
  else
  {
    res.status(401).json({
      status:"User Can't login",
      code:2
    })
  }
});

module.exports = router;
