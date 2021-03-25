const mongoose = require('mongoose');
const Login = require('./models/auth')
const express = require('express');
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const server = express();
const listenPort = "3000" //modificar y hacer el .env

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
//conect bd
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true }).
    catch(error => handleError(error));
//conect server
server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`)
);

// //POST petition 
server.post('/signup',  (req, res) => {

    let login = new Login();
    login.email = req.body.email
    login.password = req.body.password
    console.log(login.password)
    console.log(req.query.password)
    //search email in bd

    Login.countDocuments(({ email: login.email }), (err, count) => {
        if (err) return  res.status(500).send({ message: 'error acceso bd' });
        if (count == 0) {
            //hasheamos el password..antes de guardarlo en la bd
            login.password = bcrypt.hashSync(login.password, 10);
            //save new User in bd
            login.save(err, loginStored => {
                if (err) {
                    res.status(500).send({ message: 'error al salvar la bd' })
                }
                res.status(200).json({
                    Login: login.email,
                    message: "usuario creado "
                })
            })

        } else {
            res.status(400).json({
                message: 'Usuario ya existe',
                email: login.email
            });

        }
    })


})

function hashEqual(password, user) {
     console.log("user en hashequal"+ user)
    bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) throw err;
        console.log('comparación de password es :', isMatch);
        if (isMatch) {
            console.log("user en hashequal"+ user)
            return user;
        }else{
            res.status(400).send("Contraseña erronea")
        }
    });

}
// function createToken(user){
//     let token= jwt.sign({user}, "secretKey", (err,token)=>
//     console.log(token + " este es el token")
//    res.json({
   
//         ok: true,
//         user,
//         token
//     });
   

// });
// });
function userExist (user){
    
    if (!user) {
      res.status(404).send("no existe..");
    } else {
        res.status(200).send("existe.." + user);
        return user
    }
}
server.post('/singin', (req, res) => {
    let token;
    email = req.body.email
   password = req.body.password
   
    Login.findOne({ email })
        .then(user =>  {
            if (!user) {
                res.status(404).send("no existe..");
              } else {
                
                  return user
              }
        } )
        .then(user => hashEqual(password, user))
        //no funciona createToken
        .then (user=>{   token=jwt.sign({ user }, "secretKey", (err,token)=>{
            if(err) res.status(400).send("error al crear secret")
            console.log(token + " este es el token")
      
            return res.json({
       
                ok: true,
                user,
                token
            });

        });
       
        
         
        })
        .catch(err => {
            // hubo un error
            res.status(500).send({ err });
        })
       

})
    // //1) comprobar si email existe en la bd 
    // //si existe
    // /**1) coger el password-- hasearlo y comparar con el hass 
    //  * correspondiente a ese email de la bd
    //  * 2)si existe ---- crear un token con jwt
    //  * ---->añadir un response con codigo 200??
    //  *   ----> si no existe decir que el password esta mal( error enviar respuesta con codigo -- 404????)
    //  * 
    //  * //deberiamos añadir el secreto al localhost/sessionhost
    //  *  * /    
    
    server.post("/signout", (req,res)=>{

        //1)se desloguea al pedirlo
        //2)le echamos

        


    })
