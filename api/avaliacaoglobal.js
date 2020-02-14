module.exports = app => {
    const get = app.get('/avaliacaog', (req,res)=>{
        mysqlConnection.query('select * from avaliacaoglobal', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar avaliacao global
    const getu = app.get('/avaliacaog/:id', (req,res)=>{
        mysqlConnection.query('select * from avaliacaoglobal where avag_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar avaliacao global
    const del = app.delete('/avaliacaog/:id', (req,res)=>{
        mysqlConnection.query('delete from avaliacaoglobal where avag_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar avaliacao global
    const add = app.post('/avaliacaog', (req,res)=>{
        //console.log({...req.body})
        let avag = req.body;
        if (avag.avag_id == null) avag.avag_id = 0
        var sql = "SET @avag_id = ?; SET @avag_fk_vmed  = ?; SET @avag_pes = ?; SET @avag_nut = ?; SET @avag_imp_nut = ?; SET @avag_fun = ?;  SET @avag_exa_fis = ?;\
                   CALL AvaliacaoGlobalAddOrEdit(@avag_id, @avag_fk_vmed, @avag_pes, @avag_nut, @avag_imp_nut, @avag_fun, @avag_exa_fis);";
        mysqlConnection.query(sql, [avag.avag_id, avag.avag_fk_vmed ,avag.avag_pes, avag.avag_nut, avag.avag_imp_nut, avag.avag_fun, avag.avag_exa_fis] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Avaliação global adicionada id : ' +element[0].avag_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar avaliacao global
    const att = app.put('/vmeavaliacaogdico', (req,res)=>{
        let avag = req.body;
        var sql = "SET @avag_id = ?; SET @avag_fk_vmed  = ?; SET @avag_pes = ?; SET @avag_nut = ?; SET @avag_imp_nut = ?; SET @avag_fun = ?;  SET @avag_exa_fis = ?;\
                   CALL AvaliacaoGlobalAddOrEdit(@avag_id, @avag_fk_vmed, @avag_pes, @avag_nut, @avag_imp_nut, @avag_fun, @avag_exa_fis);";
        mysqlConnection.query(sql, [avag.avag_id, avag.avag_fk_vmed ,avag.avag_pes, avag.avag_nut, avag.avag_imp_nut, avag.avag_fun, avag.avag_exa_fis] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}