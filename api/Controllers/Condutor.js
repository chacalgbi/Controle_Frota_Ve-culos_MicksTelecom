const con_api = require('../Configs/conexao_api');

class CondutorController{

    async listar(req, res){
        const texto = "Listar Condutores";
        console.log(`Acessou ${texto}`);
        let sql = "SELECT *  FROM condutor";
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
        const nome_condutor = req.body.nome_condutor;
        const texto = "Cadastrar Condutor";
        console.log(`Acessou ${texto}`);
        let sql = `INSERT INTO condutor (nome_condutor) values ("${nome_condutor}")`;
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
        const texto = "Deletar Condutor";
        console.log(`Acessou ${texto}`);
        let sql = `DELETE FROM condutor WHERE id=${id}`;
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

module.exports = new CondutorController();