const UserModel =require('../model/AuthModel');

exports.register=(req,res)=>{

   const {
       email,
       password,
       FirstName,
       LastName
   }=req.body;
  
   const auth=new UserModel({
       
        email,
        password,
        FirstName,
        LastName
   })

   console.log(auth)
   UserModel.find(
       {
           email,
           password
       }
   ).then((result)=>{

    if(result.length>0){

        res.status(400).json({
            message:"user already registered, please login to continue",
    
        })
    }
    else{
        auth.save().then((result)=>{

            res.status(200).json({
                message:"user registred successfully",
                UserModel:result
            })
        }).catch((err)=>{

            res.status(500).json({
                
                message:"data fetching failed",
                Error:err
            })
        })
    }
   })

}


exports.LogIn=(req,res)=>{

    const {
        email,
        password
    }=req.body;

     UserModel.find(
        {
            email,
            password
        }
        ).then((result)=>{

        if(result.length>0){

            res.status(200).json({
                
                message:"user Loggedin Successfully",
                isLoggedIn:true,
                userData:result
            })
        }
        else{

            res.status(400).json({
                
                message:"either Email or Password is wrong",
                isLoggedIn:false,

            })
        }
     }).catch((err)=>{
         
        res.status(500).json({

            message:"error in data base",
            Error:err
        })
     })
}