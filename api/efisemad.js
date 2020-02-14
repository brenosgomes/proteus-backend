module.exports = app => {
    const get = app.get('/efisemad', (req,res)=>{
        mysqlConnection.query('select * from efisemad', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar EfisVmed
    const getu = app.get('/efisemad/:id', (req,res)=>{
        mysqlConnection.query('select * from efisemad where efisemad_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar EfisVmed
    const del = app.delete('/efisemad/:id', (req,res)=>{
        mysqlConnection.query('delete from efisemad where efisemad_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar EfisVmed
    const add = app.post('/efisemad', (req,res)=>{
        //console.log({...req.body})
        let efisemad = req.body;
        if (efisemad.efisvmed_id == null) efisemad.efisvmed_id = 0
        var sql = "SET @efisvmed_id = ?; SET @efisvmed_fk_vmed = ?;SET @efisvmed_fk_efis = ?;SET @efisvmed_val = ?;\
                   CALL EfisVmedAddOrEdit(@efisvmed_id, @efisvmed_fk_vmed, @efisvmed_fk_efis , @efisvmed_val );";
        mysqlConnection.query(sql, [efisemad.efisvmed_id, efisemad.efisvmed_fk_vmed, efisemad.efisvmed_fk_efis, efisemad.efisvmed_val] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('EfisVmed adicionado id : ' +element[0].efisemad_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar EfisVmed
    const att = app.put('/efisemad', (req,res)=>{
        let efisemad = req.body;
        var sql = "SET @efisvmed_id = ?; SET @efisvmed_fk_vmed = ?;SET @efisvmed_fk_efis = ?;SET @efisvmed_val = ?;\
                   CALL EfisVmedAddOrEdit(@efisvmed_id, @efisvmed_fk_vmed, @efisvmed_fk_efis , @efisvmed_val );";
        mysqlConnection.query(sql, [efisemad.efisvmed_id, efisemad.efisvmed_fk_vmed, efisemad.efisvmed_fk_efis, efisemad.efisvmed_val] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}