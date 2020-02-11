module.exports = app => {
    const get = app.get('/exameFisico', (req,res)=>{
        mysqlConnection.query('select * from exameFisico', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar exameFisico
    const getu = app.get('/exameFisico/:id', (req,res)=>{
        mysqlConnection.query('select * from exameFisico where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar exameFisico
    const del = app.delete('/exameFisico/:id', (req,res)=>{
        mysqlConnection.query('delete from exameFisico where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar exameFisico
    const add = app.post('/exameFisico', (req,res)=>{
        //console.log({...req.body})
        let efis = req.body;
        var sql = "SET @efis_id  = ?; SET @efis_nome  = ?;\
                   CALL ExameFisicoAddOrEdit(@efis_id  , @efis_nome );";
        mysqlConnection.query(sql, [efis.efis_id , efis.efis_nome ] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Exame fisico adicionado id : ' +element[0].nut_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar exameFisico
    const att = app.put('/exameFisico', (req,res)=>{
        let efis = req.body;
        var sql = "SET @efis_id  = ?; SET @efis_nome  = ?;\
                   CALL ExameFisicoAddOrEdit(@efis_id  , @efis_nome );";
        mysqlConnection.query(sql, [efis.efis_id , efis.efis_nome ] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}