var login = sessionStorage.login;
$("#header").load("menu.html");
const ip = sessionStorage.ip;

function salvar_alteracoes(){
    if(login != 'OK'){
        document.getElementById('msg').innerHTML = "Acesso não autorizado";
        swal("Aviso!", "Acesso não autorizado!", "error");
        setTimeout(function() { // delay de 1 segundo
            location.replace("index.html");
          }, 1000);
    }else{
        let nome = document.getElementById('condutor').value;
        if(nome == ''){
            swal("Aviso!", "Preencha todos os campos!", "info");
        }else{
            let values = {
                nome_condutor: nome
            }
            const enviar = JSON.stringify(values);
            console.log(enviar);
            axios.post(`http://${ip}/cadastrar_condutor`, enviar, {headers:{
                'Content-Type': 'application/json; charset=utf-8'
              },})
            .then((response) => {
                console.log("Sucesso!");
                console.log(response.data);
                document.getElementById('msg').innerHTML = response.data.msg;
                setTimeout(function() { // delay de 1 segundo
                    location.replace("listar_condutores.html");
                  }, 1500);
            }).catch((err) => {
                document.getElementById('msg').innerHTML = err;
                console.log(`Deu ruim: ${err}`);
            });
        }
    }
}

if(login != 'OK'){
    document.getElementById('msg').innerHTML = "Acesso não autorizado";
    swal("Aviso!", "Acesso não autorizado!", "error");
    setTimeout(function() { // delay de 1 segundo
        location.replace("index.html");
      }, 1000);
}else{

}