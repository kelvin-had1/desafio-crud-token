const {DataTypes} = require('sequelize')
const db = require('./db.js')
const jwt = require('./jwt.js')
const { json } = require('body-parser')
const config = require('./../config.json')




module.exports = class Book{

    constructor(name = '', author = ''){
        this.name = name
        this.author = author

        this.Book = db.define('livros', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })
    }


    async getBook(req, res){
        try {
            let token = req.headers['token']
            await db.sync()
            const books = await this.Book.findAll()


            jwt.verify(token, config.JWT_KEY, (err, userInfo) =>{
                if(err){
                    res.status(200).json({erro: "Unexpected error"});
                    return
                }
                if(userInfo.type == 'read'){
                    return res.status(200).send(JSON.stringify(books, null, 2))

                }else{
                    return res.status(200).json({message: "Not Authorized"})

                }
            })


        } catch (error) {
            console.log(error)
            return res.status(400).send({message: "Unexpected Error"})
            
        }
    }


    async insertBook(req, res){
        try {
            let token = req.body.token
            await db.sync()

            this.author = req.body.author
            this.name = req.body.name
            
            jwt.verify(token, config.JWT_KEY, (err, userInfo) => {
                if (err) {
                    res.status(200).json({erro: "Unexpected error"});
                    return
                }

                if(userInfo.type == 'write'){
                    this.saveBook(res)

                }else{
                    return res.status(200).json({message: "Not Authorized"})

                }
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({message: "Unexpected Error"})
        }

    }

    async saveBook(res){
        try {
            await db.sync()
            const book = this.Book.create({name: this.name, author: this.author})
            return res.send({message: "OK"})

        } catch (error) {
            console.log(error)
            return res.status(400).send({message: "Unexpected Error"})
        }
        
    }


}