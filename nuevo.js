const mongoose = require('mongoose');
const Login= require('./models/auth')
const express= require('express');
const bcrypt =require('bcryptjs')
const server =express();
const listenPort= "3000" //modificar y hacer el .env

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
//conect bd
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => handleError(error));
//conect server
  server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`)
  );

  //POST petition 
  server.post('/',async(req, res) =>{

    let login=new Login();
    login.email =req.query.email
    login.password=req.query.password
    //search email in bd

    Login.countDocuments(({email:login.email}),(err, count)=> {
    if (err) return handleError(err);
     console.log('numero de entradas con este email', count);
        if(count==0){
            //hasheamos el password..antes de guardarlo en la bd
              login.password=bcrypt.hashSync(login.password, 10);
            //save new User in bd
            login.save(err, loginStored =>{
                 if(err){
                    res.status(500).send({message: 'error al salvar la bd'})
                 }
                   //porque es null loginStored???????/ aún asi guarda todo ok
                res.status(200).json({ 
                                        
                                        Login:login.email,
                                       message: "usuario creado "
                                    })
             })
                                             
        }else {
            res.status(400).json({
                                    message: 'Usuario ya existe',
                                    email: login.email
                              });

        }
    })
   
       
})


    
server.post('/singin',(req,res)=>{
        console.log(Login)
        
    Login.find({email:req.query.email}) 
        .then (user => {
            if(user){
              //si el usuario existe
              return  res.status(200).send("existe en la bd") 
                       }
              })
        .cath(error =>{ return   res.status(400).send("ha habido un error"+error)
                            })

   })        
 // //1) comprobar si email existe en la bd 
// //si existe
// /**1) coger el password-- hasearlo y comparar con el hass 
//  * correspondiente a ese email de la bd
//  * 2)si existe ---- crear un token con jwt
//  * ---->añadir un response con codigo 200??
//  *   ----> si no existe decir que el password esta mal( error enviar respuesta con codigo -- 400????)
//  * 
//  * 
//  *  * /             
           
      
        
  
     


 

