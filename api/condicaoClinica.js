module.exports = app => {
    const get = app.get('/condicaoClinica', (req,res)=>{
        mysqlConnection.query('select * from concicaoClinica', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar concicaoClinica
    const getu = app.get('/condicaoClinica/:id', (req,res)=>{
        mysqlConnection.query('select * from concicaoClinica where ccli_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar concicaoClinica
    const del = app.delete('/condicaoClinica/:id', (req,res)=>{
        mysqlConnection.query('delete from concicaoClinica where ccli_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar concicaoClinica
    const add = app.post('/condicaoClinica', (req,res)=>{
        //console.log({...req.body})
        let ccli = req.body;
        if (ccli.ccli_id == null) ccli.ccli_id = 0
        var sql = "SET @ccli_id = ?; SET @ccli_nome = ?;\
                   CALL ConcicaoClinicaAddOrEdit(@ccli_id , @ccli_nome);";
        mysqlConnection.query(sql, [ccli.ccli_id, ccli.ccli_nome] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Sintoma adicionado id : ' +element[0].nut_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar concicaoClinica
    const att = app.put('/condicaoClinica', (req,res)=>{
        let ccli = req.body;
        var sql = "SET @ccli_id = ?; SET @ccli_nome = ?;\
                   CALL ConcicaoClinicaAddOrEdit(@ccli_id , @ccli_nome);";
        mysqlConnection.query(sql, [ccli.ccli_id, ccli.ccli_nome] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}