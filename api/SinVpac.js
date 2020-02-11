module.exports = app => {
    const get = app.get('/SinVpac', (req,res)=>{
        mysqlConnection.query('select * from SinVpac', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar SinVpac
    const getu = app.get('/SinVpac/:id', (req,res)=>{
        mysqlConnection.query('select * from SinVpac where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar SinVpac
    const del = app.delete('/SinVpac/:id', (req,res)=>{
        mysqlConnection.query('delete from SinVpac where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar SinVpac
    const add = app.post('/SinVpac', (req,res)=>{
        //console.log({...req.body})
        let sinvpac = req.body;
        var sql = "SET @sinvpac_fk_vpac  = ?; SET @sinvpac_fk_sin   = ?;\
                   CALL SinVpacAddOrEdit(@sinvpac_fk_vpac , @sinvpac_fk_sin  );";
        mysqlConnection.query(sql, [sinvpac.sinvpac_fk_vpac, sinvpac.sinvpac_fk_sin  ] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('SinVpac adicionado id : ' +element[0].nut_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar SinVpac
    const att = app.put('/SinVpac', (req,res)=>{
        let sinvpac = req.body;
        var sql = "SET @sinvpac_fk_vpac  = ?; SET @sinvpac_fk_sin   = ?;\
                   CALL SinVpacAddOrEdit(@sinvpac_fk_vpac , @sinvpac_fk_sin  );";
        mysqlConnection.query(sql, [sinvpac.sinvpac_fk_vpac, sinvpac.sinvpac_fk_sin  ] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}