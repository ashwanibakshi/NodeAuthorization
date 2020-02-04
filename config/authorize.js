var userModel = require('../models/user');

var authorize = (role)=>{
    return (req,res,next)=>{
        if(req.session.uid){
            userModel.find({$and:[{'_id':req.session.uid},{'role':role}]},(err,data)=>{
                if(err){
                    res.json({error:err});
                }else{
                    if(data!=''){
                        req.user= data;
                        next();
                    }else{
                        res.json({msg:'you dont have access to it'});
                    }
                }
            });
        }else{
            req.json({msg:'user is not logged in'});
        }
    }
}

module.exports = authorize;