module.exports = app => {
    const get = app.get('/condicaoclinica', (req,res)=>{
        mysqlConnection.query('select * from condicaoclinica', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar concicaoClinica
    const getu = app.get('/condicaoclinica/:id', (req,res)=>{
        mysqlConnection.query('select * from condicaoclinica where ccli_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar concicaoClinica
    const del = app.delete('/condicaoclinica/:id', (req,res)=>{
        mysqlConnection.query('delete from condicaoclinica where ccli_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar concicaoClinica
    const add = app.post('/condicaoclinica', (req,res)=>{
        //console.log({...req.body})
        let ccli = req.body;
        if (ccli.ccli_id == null) ccli.ccli_id = 0
        var sql = "SET @ccli_id = ?; SET @ccli_nome = ?;\
                   CALL CondicaoClinicaAddOrEdit(@ccli_id , @ccli_nome);";
        mysqlConnection.query(sql, [ccli.ccli_id, ccli.ccli_nome] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Sintoma adicionado id : ' +element[0].ccli_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar concicaoClinica
    const att = app.put('/condicaoclinica', (req,res)=>{
        let ccli = req.body;
        var sql = "SET @ccli_id = ?; SET @ccli_nome = ?;\
                   CALL CondicaoClinicaAddOrEdit(@ccli_id , @ccli_nome);";
        mysqlConnection.query(sql, [ccli.ccli_id, ccli.ccli_nome] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}