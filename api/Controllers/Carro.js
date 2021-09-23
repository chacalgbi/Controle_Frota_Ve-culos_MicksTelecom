const con_api = require('../Configs/conexao_api');

class CarroController{

    async listar(req, res){
        const texto = "Listar Carros";
        console.log(`Acessou ${texto}`);
        let sql = "SELECT *, DATE_FORMAT(criado_em, '%d/%m/%Y %H:%i') as data_hora FROM carro";
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
        const cod = req.body.cod;
        const modelo = req.body.modelo;
        const placa = req.body.placa;
        const ano = req.body.ano;

        const texto = "Cadastrar Carro";
        console.log(`Acessou ${texto}`);
        let sql = `INSERT INTO carro (cod, modelo, placa, ano) values ("${cod}", "${modelo}", "${placa}", "${ano}")`;
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
        const texto = "Deletar Carro";
        console.log(`Acessou ${texto}`);
        let sql = `DELETE FROM carro WHERE id=${id}`;
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
        const texto = "Mostrar Carro";
        console.log(`Acessou ${texto}`);
        let sql = `SELECT *, DATE_FORMAT(criado_em, '%d/%m/%Y %H:%i') as data_hora FROM carro WHERE id=${id};`;
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
        const cod = req.body.cod;
        const modelo = req.body.modelo;
        const placa = req.body.placa;
        const ano = req.body.ano;

        const texto = "Atualizar Carro";
        console.log(`Acessou ${texto}`);
        let sql = `UPDATE carro SET cod='${cod}', modelo='${modelo}', placa="${placa}", ano="${ano}" WHERE id=${id}`;
        console.log(sql);
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

module.exports = new CarroController();