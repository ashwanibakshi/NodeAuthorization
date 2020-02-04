var express     = require('express');
var userModel   = require('../models/user');
var auth        = require('../config/authorize');

var router = express.Router();

router.post('/register',(req,res)=>{
        var user = new userModel({
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        });
        user.save((err,data)=>{
            if(err){
                res.json({error:err});
            }else{
                if(data!=''){
                   res.json({userdata:data,msg:'user registered'});
                }else{
                    res.json({msg:'user not registered.try again'});
                }
            }
        });
});

router.post('/login',(req,res)=>{
      userModel.find({$and:[{'email':req.body.email},{'password':req.body.password}]},(err,data)=>{
           if(err){
               res.json({error:err});
           }else{
               if(data!=''){
                   //saving users id in session
                   req.session.uid=data[0]._id;
                   res.json({msg:'user is logged in'});
               }else{
                   res.json({msg:'user is not regisered'});
               }
           }
      });
});

//here in auth we specify the role 
router.get('/adminprofile',auth('admin'),(req,res)=>{
      res.json({data:req.user});
});

module.exports = router;