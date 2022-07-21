const express = require('express')
const router = express.Router()
const user = require('../model/user.js')


router.route('/usuarios')
    .get((req, res) => {    
                    
        let User = new user()         
        User.getUsers(req,res)        
            
        })

router.route('/login')
    .post((req, res) => {
        let User = new user()
        
        if(User.login(req, res)){

        }else{
            return res.status(401).send({message: "OK"})
        }
    })
 

router.route('/cadastrar/usuario')
    .post((req, res) => {
        
        let User = new user(req.body.email, req.body.password)
        User.insertUser(req, res)
    })
module.exports = router