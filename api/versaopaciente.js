module.exports = app => {
    const get = app.get('/vpaciente', (req,res)=>{
        mysqlConnection.query('select * from versaopaciente', (err, rows, fields)=>{
            if(!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
    
    //pegar versão paciente
    const getu = app.get('/vpaciente/:id', (req,res)=>{
        mysqlConnection.query('select * from versaopaciente where vpac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send(rows);
            else
                console.log(err)
        })
    })
    
    //deletar versão paciente
    const del = app.delete('/vpaciente/:id', (req,res)=>{
        mysqlConnection.query('delete from versaopaciente where vpac_id = ?', [req.params.id],(err, rows, fields)=>{
            if(!err)
                res.send('delete bem sucedido');
            else
                console.log(err)
        })
    })

    //adicionar versão paciente
    const add = app.post('/vpaciente', (req,res)=>{
        //console.log({...req.body})
        let vpac = req.body;
        if (vpac.vpac_id == null) vpac.vpac_id = 0
        var sql = "SET @vpac_id = ?; SET @vpac_fk_ava = ?; SET @vpac_q1_pes_atu = ?; SET @vpac_q1_tam = ?; SET @vpac_q1_pes_mes = ?; SET @vpac_q1_pes_smst = ?;\
                   SET @vpac_q2_qtd = ?; SET @vpac_q2_tip = ?;SET @vpac_q3_dor = ?; SET @vpac_q3_out = ?; SET @vpac_quad1 = ?;\
                   SET @vpac_quad2 = ?; SET @vpac_quad3 = ?;SET @vpac_quad4 = ?;\
                   CALL VersaoPacienteAddOrEdit(@vpac_id, @vpac_fk_ava,@vpac_q1_pes_atu, @vpac_q1_tam, @vpac_q1_pes_mes, @vpac_q1_pes_smst,\
                                           @vpac_q2_qtd, @vpac_q2_tip, @vpac_q3_dor, @vpac_q3_out, @vpac_quad1,\
                                           @vpac_quad2, @vpac_quad3, @vpac_quad4);";
        mysqlConnection.query(sql, [vpac.vpac_id, vpac.vpac_fk_ava,vpac.vpac_q1_pes_atu, vpac.vpac_q1_tam, vpac.vpac_q1_pes_mes, vpac.vpac_q1_pes_smst,
                                    vpac.vpac_q2_qtd, vpac.vpac_q2_tip, vpac.vpac_q3_dor, vpac.vpac_q3_out, vpac.vpac_quad1,
                                    vpac.vpac_quad2, vpac.vpac_quad3, vpac.vpac_quad4] ,(err, rows, fields)=>{
            if(!err)
                rows.forEach(element => {
                    if(element.constructor == Array)
                    res.send('Versão paciente adicionada id : ' +element[0].vpac_id);
                });
            else
                console.log(err)
        })
    })

    
    //atualizar versão paciente
    const att = app.put('/vpaciente', (req,res)=>{
        let vpac = req.body;
        var sql = "SET @vpac_id = ?; SET @vpac_fk_ava = ?; SET @vpac_q1_pes_atu = ?; SET @vpac_q1_tam = ?; SET @vpac_q1_pes_mes = ?; SET @vpac_q1_pes_smst = ?;\
                   SET @vpac_q2_qtd = ?; SET @vpac_q2_tip = ?;SET @vpac_q3_dor = ?; SET @vpac_q3_out = ?; SET @vpac_quad1 = ?;\
                   SET @vpac_quad2 = ?; SET @vpac_quad3 = ?;SET @vpac_quad4 = ?;\
                   CALL VersaoPacienteAddOrEdit(@vpac_id, @vpac_fk_ava,@vpac_q1_pes_atu, @vpac_q1_tam, @vpac_q1_pes_mes, @vpac_q1_pes_smst,\
                                           @vpac_q2_qtd, @vpac_q2_tip, @vpac_q3_dor, @vpac_q3_out, @vpac_quad1,\
                                           @vpac_quad2, @vpac_quad3, @vpac_quad4);";
        mysqlConnection.query(sql, [vpac.vpac_id, vpac.vpac_fk_ava,vpac.vpac_q1_pes_atu, vpac.vpac_q1_tam, vpac.vpac_q1_pes_mes, vpac.vpac_q1_pes_smst,
                                    vpac.vpac_q2_qtd, vpac.vpac_q2_tip, vpac.vpac_q3_dor, vpac.vpac_q3_out, vpac.vpac_quad1,
                                    vpac.vpac_quad2, vpac.vpac_quad3, vpac.vpac_quad4] ,(err, rows, fields)=>{
            if(!err)
                res.send('Atualização bem sucedida')
            else
                console.log(err)
        })
    })

    return {get, getu, del, add, att}
}