const {Schema, model}= require('mongoose')
const LoginSchema = new Schema({
        email:{ 
                type: String

        },
        password:{

        }


})

  
const Login = model('login', LoginSchema); 
module.exports= Login;