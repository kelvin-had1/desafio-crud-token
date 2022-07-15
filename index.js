const express = require('express')
const app = express()

app.use('/', (req, res) => {
    return res.json({Message: "OK"})
})



app.listen(8080, ()=>{
    console.log('server rodando na porta 8080')
})