module.exports = app => {
    const get = app.get('/vmedico', (req,res)=>{
        mysqlConnection.query('select * from versaomedico', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar versão medico
    const getu = app.get('/vmedico/:id', (req,res)=>{
        mysqlConnection.query('select * from versaomedico where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar versão medico
    const del = app.delete('/vmedico/:id', (req,res)=>{
        mysqlConnection.query('delete from versaomedico where pac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar versão medico
    const add = app.post('/vmedico', (req,res)=>{
        //console.log({...req.body})
        let vmed = req.body;
        var sql = "SET @vmed_id = ?; SET @vmed_fk_ava = ?; SET @vmed_ava_glo = ?;SET @vmed_pt_tot = ?; SET @vmed_q1_per_pes = ?; SET @vmed_q2_diag_rel = ?;\
                   SET @vmed_q2_estad = ?; SET @vmed_q2_out = ?;SET @vmed_q3_feb = ?; SET @vmed_q3_dur_feb = ?; SET @vmed_q3_crtc = ?;\
                   SET @vmed_quad1 = ?; SET @vmed_quad2 = ?;SET @vmed_quad3 = ?;SET @vmed_quad4 = ?;SET @vmed_quad5 = ?;\
                   CALL VersaoMedicoAddOrEdit(@vmed_id, @vmed_fk_ava, @vmed_ava_glo, @vmed_pt_tot, @vmed_q1_per_pes, @vmed_q2_diag_rel,\
                                         @vmed_q2_estad, @vmed_q2_out, @vmed_q3_feb, @vmed_q3_dur_feb, @vmed_q3_crtc,\
                                         @vmed_quad1, @vmed_quad2, @vmed_quad3, @vmed_quad4, @vmed_quad5);";
        mysqlConnection.query(sql, [vmed.vmed_id, vmed.vmed_fk_ava, vmed.vmed_ava_glo, vmed.vmed_pt_tot, vmed.vmed_q1_per_pes, vmed.vmed_q2_diag_rel,
                                    vmed.vmed_q2_estad, vmed.vmed_q2_out, vmed.vmed_q3_feb, vmed.vmed_q3_dur_feb, vmed.vmed_q3_crtc,
                                    vmed.vmed_quad1, vmed.vmed_quad2, vmed.vmed_quad3, vmed.vmed_quad4, vmed.vmed_quad5] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Versão medico adicionada id : ' +element[0].vmed_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar versão medico
    const att = app.put('/vmedico', (req,res)=>{
        let vmed = req.body;
        var sql = "SET @vmed_id = ?; SET @vmed_fk_ava = ?; SET @vmed_ava_glo = ?;SET @vmed_pt_tot = ?; SET @vmed_q1_per_pes = ?; SET @vmed_q2_diag_rel = ?;\
                   SET @vmed_q2_estad = ?; SET @vmed_q2_out = ?;SET @vmed_q3_feb = ?; SET @vmed_q3_dur_feb = ?; SET @vmed_q3_crtc = ?;\
                   SET @vmed_quad1 = ?; SET @vmed_quad2 = ?;SET @vmed_quad3 = ?;SET @vmed_quad4 = ?;SET @vmed_quad5 = ?;\
                   CALL VersaoMedicoAddOrEdit(@vmed_id, @vmed_fk_ava, @vmed_ava_glo, @vmed_pt_tot, @vmed_q1_per_pes, @vmed_q2_diag_rel,\
                                         @vmed_q2_estad, @vmed_q2_out, @vmed_q3_feb, @vmed_q3_dur_feb, @vmed_q3_crtc,\
                                         @vmed_quad1, @vmed_quad2, @vmed_quad3, @vmed_quad4, @vmed_quad5);";
        mysqlConnection.query(sql, [vmed.vmed_id, vmed.vmed_fk_ava, vmed.vmed_ava_glo, vmed.vmed_pt_tot, vmed.vmed_q1_per_pes, vmed.vmed_q2_diag_rel,
                                    vmed.vmed_q2_estad, vmed.vmed_q2_out, vmed.vmed_q3_feb, vmed.vmed_q3_dur_feb, vmed.vmed_q3_crtc,
                                    vmed.vmed_quad1, vmed.vmed_quad2, vmed.vmed_quad3, vmed.vmed_quad4, vmed.vmed_quad5] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}