const {DataTypes} = require('sequelize')
const db = require('./db.js')
const bcrypt = require('bcryptjs')
const { json } = require('body-parser');
const jwt = require('./jwt.js')
const config = require('./../config.json')
module.exports = class User{
    
    constructor(email = '', password = ''){
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)

        
        this.email = email
        this.password = hash
        

        this.User = db.define('usuarios',{
            email:{
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false

            },
            pwsd:{
                type: DataTypes.TEXT,
                allowNull: false
            }
        })
    }

    async login(req, res){
        try {
            await db.sync()
            const user = await this.User.findAll({where: {email: req.body.email}})
            const password = user[0].pwsd

            bcrypt.compare(req.body.password, password, (err, result)=>{
                if(err){
                    
                    return res.status(401).send({erro: "Unexpected error"})                                
                }
                
                if(result){
                    const readToken = jwt.sign({
                        email: user[0].email,                        
                        type: 'read'
                    }, config.JWT_KEY, {
                        expiresIn: "2 days"
                    })
                    
                    const writeToken = jwt.sign({
                        email: user[0].email,
                        type: 'write'
                    }, config.JWT_KEY, {
                        expiresIn: "30s"
                    })
                    return res.status(200).send({message: "ok", readToken: readToken, writeToken: writeToken})

                }else{
                    
                    return res.status(401).send({message: "Not authorized"})
                }                

            })
            


        } catch (error) {
            console.log(error)            
            return res.status(400).send({message: "Unexpected Error"})
        }
    }

    

    async insertUser(req, res){
        try {
            await db.sync()
            const user = this.User.create({ email: this.email, pwsd: this.password})        
            return res.send({message: "OK"})    
        } catch (error) {             
            console.log(error)
            return res.status(200).send({error: "Unexpected error"})                                
                                     
        }   
                 
    }

    async getUsers(req, res){
        try {
            await db.sync()
            let users = await this.User.findAll()
            
            const token = req.headers['token']

            jwt.verify(token, config.JWT_KEY, (err, userInfo) => {
                if (err) {
                    res.status(200).json({erro: "Unexpected error"});
                    return
                }
                if(userInfo.type == 'read'){
                    return res.send(JSON.stringify(users, null, 2))

                }else{
                    return res.status(200).send({message: "Not authorized"})

                }
            })

        } catch (error) {            
            return res.send({error: "erro inesperado!"})
        }
        
        
    }
 
    

}
