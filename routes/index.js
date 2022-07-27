const express = require('express')
const router = express.Router()
const user = require('../model/user.js')
const book = require('../model/book.js')
const jwt = 'a'


router.route('/livros')
    .post((req, res)=>{
        let Book = new book()
        Book.insertBook(req, res)
    })
    .get((req, res) =>{
        let Book = new book()
        Book.getBook(req, res)
    })

router.route('/usuarios')
    .get((req, res) => {                          
        let User = new user()                         
        User.getUsers(req,res)        
            
        })

    .post((req, res) => {
        
        let User = new user(req.body.email, req.body.password)
        User.insertUser(req, res)
    })

router.route('/login')
    .post((req, res) => {
        let User = new user()
        
        User.login(req, res)
        
    })
 


    
module.exports = router, jwt