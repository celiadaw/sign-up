const mongoose = require('mongoose');
const Login= require('./models/auth')
const express= require('express');
const bcrypt =require('bcrypt')
const BCRYPT_SALT_ROUNDS=10;
// const { find } = require('./models/auth');
const server =express();
const listenPort= "3000"
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => handleError(error));

  server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`)
  );

  
  server.post('/',async(req, res) =>{
    let login=new Login();
    login.email =req.query.email
    login.password=req.query.password

    //hasear password 
    
  
    Login.countDocuments(({email:login.email}),(err, count)=> {
    if (err) return handleError(err);
     console.log('numero de entradas con este email', count);
        if(count==0){
               
        bcrypt.hash(login.password,BCRYPT_SALT_ROUNDS)
            .then (function(hasedPassword){
                 return login.save({email:login.email, password:hasedPassword})
                })
            .then (function(){
                res.status(200).json({Login:loginStored,
                    message: "usuario creado "
        
                    })
                })  
            .catch (function(err){
                res.status(500).send({message: 'error al salvar la bd'})
            })     
                     
        }else {
            res.status(400).json({
                message: 'Usuario ya existe',
                email: login.email
            });

        }
      })
   
       
     })


    
           
              
           
      
        
  
     


 

