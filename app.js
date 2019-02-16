const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.send("API Funcionando")
})
//teste
app.listen(3000, function(){
    console.log("API rodando na porta 3000")
})