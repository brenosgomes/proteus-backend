module.exports = app => {
    const get = app.get('/antropometria', (req,res)=>{
        mysqlConnection.query('select * from antropometria', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar antropometria
    const getu = app.get('/antropometria/:id', (req,res)=>{
        mysqlConnection.query('select * from antropometria where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar antropometria
    const del = app.delete('/antropometria/:id', (req,res)=>{
        mysqlConnection.query('delete from antropometria where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar antropometria
    const add = app.post('/antropometria', (req,res)=>{
        //console.log({...req.body})
        let ant = req.body;
        var sql = "SET @ant_id = ?; SET @ant_fk_ava = ? ;SET @ant_alt = ?;SET @ant_pes_usu = ?; SET @ant_pes_atu = ?;\
                   SET @ant_des_pes_atu = ?; SET @ant_des_pp = ?;SET @ant_din = ?;SET @ant_cir_pan = ?;\
                   SET @ant_ambc = ?; SET @ant_cabd = ?;SET @ant_pp = ?;SET @ant_imc = ?;\
                   CALL AntropometriaAddOrEdit(@ant_id, @ant_fk_ava,@ant_alt, @ant_pes_usu, @ant_pes_atu,\
                                               @ant_des_pes_atu,@ant_des_pp, @ant_din, @ant_cir_pan,\
                                               @ant_ambc, @ant_cabd, @ant_pp, @ant_imc);";
        mysqlConnection.query(sql, [ant.ant_id,  ant.ant_fk_ava,ant.ant_alt, ant.ant_pes_usu, ant.ant_pes_atu,
                                    ant.ant_des_pes_atu,ant.ant_des_pp, ant.ant_din, ant.ant_cir_pan,
                                    ant.ant_ambc, ant.ant_cabd, ant.ant_pp, ant.ant_imc] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Antropometria adicionada id : ' +element[0].ant_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar antropometria
    const att = app.put('/antropometria', (req,res)=>{
        let ant = req.body;
        var sql = "SET @ant_id = ?; SET @ant_fk_ava = ? ;SET @ant_alt = ?;SET @ant_pes_usu = ?; SET @ant_pes_atu = ?;\
                   SET @ant_des_pes_atu = ?; SET @ant_des_pp = ?;SET @ant_din = ?;SET @ant_cir_pan = ?;\
                   SET @ant_ambc = ?; SET @ant_cabd = ?;SET @ant_pp = ?;SET @ant_imc = ?;\
                   CALL AntropometriaAddOrEdit(@ant_id, @ant_fk_ava,@ant_alt, @ant_pes_usu, @ant_pes_atu,\
                                               @ant_des_pes_atu,@ant_des_pp, @ant_din, @ant_cir_pan,\
                                               @ant_ambc, @ant_cabd, @ant_pp, @ant_imc);";
        mysqlConnection.query(sql, [ant.ant_id,  ant.ant_fk_ava,ant.ant_alt, ant.ant_pes_usu, ant.ant_pes_atu,
                                    ant.ant_des_pes_atu,ant.ant_des_pp, ant.ant_din, ant.ant_cir_pan,
                                    ant.ant_ambc, ant.ant_cabd, ant.ant_pp, ant.ant_imc] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}