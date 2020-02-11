module.exports = app => {
    const get = app.get('/CcliVmed', (req,res)=>{
        mysqlConnection.query('select * from CcliVmed', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar CcliVmed
    const getu = app.get('/CcliVmed/:id', (req,res)=>{
        mysqlConnection.query('select * from CcliVmed where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar CcliVmed
    const del = app.delete('/CcliVmed/:id', (req,res)=>{
        mysqlConnection.query('delete from CcliVmed where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar CcliVmed
    const add = app.post('/CcliVmed', (req,res)=>{
        //console.log({...req.body})
        let cclivmed = req.body;
        var sql = "SET @cclivmed_fk_vmed = ?; SET @cclivmed_fk_ccli  = ?;\
                   CALL CcliVmedAddOrEdit(@cclivmed_fk_vmed, @cclivmed_fk_ccli );";
        mysqlConnection.query(sql, [cclivmed.cclivmed_fk_vmed, cclivmed.cclivmed_fk_ccli ] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('CcliVmed adicionado id : ' +element[0].nut_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar CcliVmed
    const att = app.put('/CcliVmed', (req,res)=>{
        let cclivmed = req.body;
        var sql = "SET @cclivmed_fk_vmed = ?; SET @cclivmed_fk_ccli  = ?;\
                   CALL CcliVmedAddOrEdit(@cclivmed_fk_vmed, @cclivmed_fk_ccli );";
        mysqlConnection.query(sql, [cclivmed.cclivmed_fk_vmed, cclivmed.cclivmed_fk_ccli ] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}