module.exports = app => {
    const get = app.get('/sintomas', (req,res)=>{
        mysqlConnection.query('select * from sintomas', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar sintomas
    const getu = app.get('/sintomas/:id', (req,res)=>{
        mysqlConnection.query('select * from sintomas where sin_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar sintomas
    const del = app.delete('/sintomas/:id', (req,res)=>{
        mysqlConnection.query('delete from sintomas where sin_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar sintomas
    const add = app.post('/sintomas', (req,res)=>{
        //console.log({...req.body})
        let sin = req.body;
        if (sin.sin_id == null) sin.sin_id = 0
        var sql = "SET @sin_id = ?; SET @sin_nome = ?;\
                   CALL SintomasAddOrEdit(@sin_id , @sin_nome);";
        mysqlConnection.query(sql, [sin.sin_id, sin.sin_nome] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Sintoma adicionado id : ' +element[0].sin_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar sintomas
    const att = app.put('/sintomas', (req,res)=>{
        let sin = req.body;
        var sql = "SET @sin_id  = ?; SET @sin_nome = ?;\
                   CALL SintomasAddOrEdit(@sin_id , @sin_nome);";
        mysqlConnection.query(sql, [sin.sin_id, sin.sin_nome] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}