const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcryptjs')

module.exports = app =>{
    const signIn = async (req, res) => {
        if(!req.body.login || !req.body.senha){
            return res.status(400).send('Insira login e senha')
        }

        const user =  mysqlConnection.query(`select * from administrador where login = ${req.body.login}`)

        if(!user) return res.status(400).send('Usuário não encontrado')

        const isMatch = bcrypt.compareSync(req.body.senha, user.senha)
        if(!isMatch) return res.status(401).send('Combinação de email e senha inválida!')

        const now = Date.now()

        payload = {
            id: user.id,
            login: user.login,
            senha: user.senha,
            iat: now,
            exp: now + (1000 * 60 * 60 * 24)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = (req, res) => {
        const userData = req.body || null

        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date() ){
                    return res.send(true)
                }
            }
            
        }catch(e){
            res.status(401)
        }
        res.send(false)
    }

    return {signIn, validateToken}
}