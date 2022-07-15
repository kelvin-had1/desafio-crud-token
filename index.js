const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const cors = require('cors')
const app = express()

const router = require('./routes/index.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use('/api', router)


app.listen(PORT, ()=>{
    console.log(`Servidor está rodando na porta ${PORT}`)
})