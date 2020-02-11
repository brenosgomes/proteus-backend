const express = require('express');
const consign = require('consign');
var app = express();

consign()
    .include('./config/passport.js')
    .then('./config/middleware.js')
    .then('./api/validator.js')
    .then('./config/bd.js')
    .then('./api/auth.js')
    .then('./config')
    .then('./api')

    .into(app)

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('Conexão bem sucedida');
    else
        console.log('A conexão com o BD falhou \n Error : '+ JSON.stringify(err, undefined, 2))
})

app.listen(3000, () => console.log('Server express está rodando na porta 3000'));