module.exports = app => {
    const get = app.get('/nutricionista', (req,res)=>{
        mysqlConnection.query('select * from nutricionista', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar nutricionista
    const getu = app.get('/nutricionista/:id', (req,res)=>{
        mysqlConnection.query('select * from nutricionista where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar nutricionista
    const del = app.delete('/nutricionista/:id', (req,res)=>{
        mysqlConnection.query('delete from nutricionista where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar nutricionista
    const add = app.post('/nutricionista', (req,res)=>{
        //console.log({...req.body})
        let nut = req.body;
        var sql = "SET @nut_id = ?; SET @nut_nome = ?;SET @nut_crn = ?;\
                   CALL NutricionistaAddOrEdit(@nut_id, @nut_nome, @nut_crn);";
        mysqlConnection.query(sql, [nut.nut_id, nut.nut_nome, nut.nut_crn] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Nutricionista adicionado id : ' +element[0].nut_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar nutricionista
    const att = app.put('/nutricionista', (req,res)=>{
        let nut = req.body;
        var sql = "SET @nut_id = ?; SET @nut_nome = ?;SET @nut_crn = ?;\
                   CALL NutricionistaAddOrEdit(@nut_id, @nut_nome, @nut_crn);";
        mysqlConnection.query(sql, [nut.nut_id, nut.nut_nome, nut.nut_crn] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}