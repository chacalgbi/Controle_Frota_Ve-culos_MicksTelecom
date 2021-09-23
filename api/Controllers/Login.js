const con_api = require('../Configs/conexao_api');

class LoginController{

    async login(req, res){
        const login = req.body.login;
        const senha = req.body.senha;
        const texto = "Fazer Login";

        console.log(`Acessou ${texto}`);
        let sql = `SELECT * FROM login WHERE login='${login}'`;
        await con_api.query(sql, function (erro, resultado, parametros) {
            if (erro){
                console.log(`Erro ao ${texto}: ${erro}`);
                return res.status(200).json({
                    error: "sim",
                    code: 404,
                    msg: `Erro ao ${texto} - ${erro}`
                });
            }else{
                var resposta = JSON.parse(JSON.stringify(resultado));
                if(resposta[0]){
                    if(senha != resposta[0].senha){
                        console.log("Senha incorreta");
                        return res.status(200).json({
                            error: "sim",
                            code: 404,
                            msg: `Senha incorreta`
                        });
                    }else{
                        console.log(`Sucesso ao ${texto}`);
                        return res.status(200).json({
                            error: "nao",
                            code: 200,
                            msg: `Sucesso ao ${texto}`,
                            resposta : resposta
                        });
                    }
                }else{
                    return res.status(200).json({
                        error: "sim",
                        code: 410,
                        msg: "Usuário Não Encontrado"
                    });
                }
           }
        });
    }

}

module.exports = new LoginController();