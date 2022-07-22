const express = require('express')
const router = express.Router()
const user = require('../model/user.js')
const jwt = 'a'

router.route('/usuarios')
    .get((req, res) => {    
                    
        let User = new user()         
        User.getUsers(req,res)        
            
        })

router.route('/login')
    .post((req, res) => {
        let User = new user()
        
        User.login(req, res)
        
    })
 

router.route('/cadastrar/usuario')
    .post((req, res) => {
        
        let User = new user(req.body.email, req.body.password)
        User.insertUser(req, res)
    })
module.exports = router, jwt