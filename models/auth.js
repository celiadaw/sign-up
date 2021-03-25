const {Schema, model}= require('mongoose')
const LoginSchema = new Schema({
        email:{ 
                type: String,
                required:true

        },
        password:{
                type: String,
                required:true


        }


})

  
const Login = model('login', LoginSchema); 
module.exports= Login;