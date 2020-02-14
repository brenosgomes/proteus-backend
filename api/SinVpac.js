module.exports = app => {
    const get = app.get('/sinvpac', (req,res)=>{
        mysqlConnection.query('select * from sinvpac', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar SinVpac
    const getu = app.get('/sinvpac/:id', (req,res)=>{
        mysqlConnection.query('select * from sinvpac where sinvpac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar SinVpac
    const del = app.delete('/sinvpac/:id', (req,res)=>{
        mysqlConnection.query('delete from sinvpac where sinvpac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar SinVpac
    const add = app.post('/sinvpac', (req,res)=>{
        //console.log({...req.body})
        let sinvpac = req.body;
        if (sinvpac.sinvpac_id == null) sinvpac.sinvpac_id = 0
        var sql = "SET @sinvpac_id = ?;SET @sinvpac_fk_vpac = ?; SET @sinvpac_fk_sin = ?;\
                   CALL SinVpacAddOrEdit(@sinvpac_id, @sinvpac_fk_vpac, @sinvpac_fk_sin);";
        mysqlConnection.query(sql, [sinvpac.sinvpac_id, sinvpac.sinvpac_fk_vpac, sinvpac.sinvpac_fk_sin] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('SinVpac adicionado id : ' +element[0].sinvpac_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar SinVpac
    const att = app.put('/sinvpac', (req,res)=>{
        let sinvpac = req.body;
        var sql = "SET @sinvpac_id = ?;SET @sinvpac_fk_vpac = ?; SET @sinvpac_fk_sin = ?;\
                   CALL SinVpacAddOrEdit(@sinvpac_id, @sinvpac_fk_vpac , @sinvpac_fk_sin);";
        mysqlConnection.query(sql, [sinvpac.sinvpac_id, sinvpac.sinvpac_fk_vpac, sinvpac.sinvpac_fk_sin] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}