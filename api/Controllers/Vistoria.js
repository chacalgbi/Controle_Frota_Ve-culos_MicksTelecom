const con_api = require('../Configs/conexao_api');

class VistoriaController{

    async listar(req, res){
        const texto = "Listar Vistorias";
        console.log(`Acessou ${texto}`);
        let sql = "SELECT *, DATE_FORMAT(criado_em, '%d/%m/%Y %H:%i') as data_hora FROM vistoria";
        await con_api.query(sql, function (erro, resultado, parametros) {
            if (erro){
                console.log(`Erro ao ${texto}: ${erro}`);
                return res.status(200).json({
                    error: "sim",
                    code: 404,
                    msg: `Erro ao ${texto} - ${erro}`
                });
            }else{
                console.log(`Sucesso ao ${texto}`);
                var resposta = JSON.parse(JSON.stringify(resultado));
                return res.status(200).json({
                    error: "nao",
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resposta : resposta
                });
            }
        });
    }

    async cadastrar(req, res){
        const id_carro = req.body.id_carro;
        const cod = req.body.cod;
        const modelo = req.body.modelo;
        const nome_condutor = req.body.nome_condutor;
        const lataria = req.body.lataria;
        const motor = req.body.motor;
        const limpeza = req.body.limpeza;
        const avaria_externa = req.body.avaria_externa;
        const avaria_interna = req.body.avaria_interna;
        const obs = req.body.obs;

        const texto = "Cadastrar Vistoria";
        console.log(`Acessou ${texto}`);
        let sql = `INSERT INTO vistoria (id_carro, cod, modelo, nome_condutor, lataria, motor, limpeza, 
                   avaria_externa, avaria_interna, obs) values ("${id_carro}", "${cod}", "${modelo}", 
                   "${nome_condutor}", "${lataria}", "${motor}", "${limpeza}", "${avaria_externa}", "${avaria_interna}", "${obs}")`;
        await con_api.query(sql, function (erro, resultado, parametros) {
            if (erro){
                console.log(`Erro ao ${texto}: ${erro}`);
                return res.status(200).json({
                    error: "sim",
                    code: 404,
                    msg: `Erro ao ${texto} - ${erro}`
                });
            }else{
                console.log(`Sucesso ao ${texto}`);
                var resposta = JSON.parse(JSON.stringify(resultado));
                return res.status(200).json({
                    error: "nao",
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resposta : resposta
                });
            }
        });
    }

    async deletar(req, res){
        const id = req.params.id;
        const texto = "Deletar Vistoria";
        console.log(`Acessou ${texto}`);
        let sql = `DELETE FROM vistoria WHERE id=${id}`;
        await con_api.query(sql, function (erro, resultado, parametros) {
            if (erro){
                console.log(`Erro ao ${texto}: ${erro}`);
                return res.status(200).json({
                    error: "sim",
                    code: 404,
                    msg: `Erro ao ${texto} - ${erro}`
                });
            }else{
                console.log(`Sucesso ao ${texto}`);
                var resposta = JSON.parse(JSON.stringify(resultado));
                return res.status(200).json({
                    error: "nao",
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resposta : resposta
                });
            }
        });
    }

    async mostrar(req, res){
        const id = req.params.id;
        const texto = "Mostrar Vistoria";
        console.log(`Acessou ${texto}`);
        let sql = `SELECT *, DATE_FORMAT(criado_em, '%d/%m/%Y %H:%i') as data_hora FROM vistoria WHERE id=${id};`;
        await con_api.query(sql, function (erro, resultado, parametros) {
            if (erro){
                console.log(`Erro ao ${texto}: ${erro}`);
                return res.status(200).json({
                    error: "sim",
                    code: 404,
                    msg: `Erro ao ${texto} - ${erro}`
                });
            }else{
                console.log(`Sucesso ao ${texto}`);
                var resposta = JSON.parse(JSON.stringify(resultado));
                return res.status(200).json({
                    error: "nao",
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resposta : resposta
                });
            }
        });
    }

    async atualizar(req, res){
        const id = req.body.id;
        const id_carro = req.body.id_carro;
        const cod = req.body.cod;
        const modelo = req.body.modelo;
        const nome_condutor = req.body.nome_condutor;
        const lataria = req.body.lataria;
        const motor = req.body.motor;
        const limpeza = req.body.limpeza;
        const avaria_externa = req.body.avaria_externa;
        const avaria_interna = req.body.avaria_interna;
        const obs = req.body.obs;

        const texto = "Atualizar Carro";
        console.log(`Acessou ${texto}`);
        let sql = `UPDATE vistoria SET id_carro='${id_carro}', cod='${cod}', modelo="${modelo}", nome_condutor="${nome_condutor}", lataria="${lataria}", motor="${motor}", limpeza="${limpeza}", avaria_externa="${avaria_externa}", avaria_interna="${avaria_interna}", obs="${obs}" WHERE id=${id}`;
        await con_api.query(sql, function (erro, resultado, parametros) {
            if (erro){
                console.log(`Erro ao ${texto}: ${erro}`);
                return res.status(200).json({
                    error: "sim",
                    code: 404,
                    msg: `Erro ao ${texto} - ${erro}`
                });
            }else{
                console.log(`Sucesso ao ${texto}`);
                var resposta = JSON.parse(JSON.stringify(resultado));
                return res.status(200).json({
                    error: "nao",
                    code: 200,
                    msg: `Sucesso ao ${texto}`,
                    resposta : resposta
                });
            }
        });
    }

}

module.exports = new VistoriaController();