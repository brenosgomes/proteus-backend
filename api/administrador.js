const bcrypt = require ('bcryptjs')

module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const get = app.get('/administrador', (req,res)=>{
        mysqlConnection.query('select * from administrador', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })

    //pegar administrador
    const getu = app.get('/administrador/:id', (req,res)=>{
        mysqlConnection.query('select * from administrador where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar administrador
    const del = app.delete('/administrador/:id', (req,res)=>{
        mysqlConnection.query('delete from administrador where adm_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })
      
    //atualizar administrador
    const att = app.put('/administrador', (req,res)=>{
        //console.log({...req.body})
        let adm = req.body;
        var sql = "SET @adm_id = ?; SET @adm_login = ?;SET @adm_senha = ?;\
                   CALL AdministradorAddOrEdit(@adm_id, @adm_login, @adm_senha);";
        mysqlConnection.query(sql, [adm.adm_id, adm.adm_login, adm.adm_senha] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })
        
    //adicionar administrador
    const add =app.post ('/administrador', async (req,res)=>{
        //console.log({...req.body})
        const adm = req.body;
        const sql = "SET @adm_id = ?; SET @adm_login = ?;SET @adm_senha = ?;\
                     CALL AdministradorAddOrEdit(@adm_id, @adm_login, @adm_senha);";
        try{
            existsOrError(adm.adm_login, 'Login não informado')
            existsOrError(adm.adm_senha, 'Senha não informada')
            existsOrError(adm.confirmarsenha, 'Confirmação de senha invalida')
            equalsOrError(adm.adm_senha, adm.confirmarsenha, 'Senhas não conferem')

            const admFromDB = await app.config.bd ('administrador')
                .where({ adm_login: adm.adm_login}).first()
            if(!adm_id)
                notExistsOrError(admFromDB, 'Usuario já cadastrado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        adm.adm_senha = encryptPassword(adm.adm_senha)
        delete adm.confirmarsenha

        mysqlConnection.query(sql, [adm.adm_id, adm.adm_login, adm.adm_senha],(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                        res.send('Administrador adicionado id : ' +element[0].adm_id);
                });
            else
                console.log(err)
        })
        
                
        
    })
    return {get, getu, del, add, att}

}
