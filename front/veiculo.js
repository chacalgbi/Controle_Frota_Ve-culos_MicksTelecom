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
        let codigo = document.getElementById('codigo').value;
        let modelo = document.getElementById('modelo').value;
        let placa = document.getElementById('placa').value;
        let ano = document.getElementById('ano').value;
        if(codigo == '' || modelo == '' || placa == '' || ano == ''){
            document.getElementById('msg').innerHTML = "Preencha todos os campos";
            swal("Aviso!", "Preencha todos os campos!", "info");
        }else{
            let values = {
                cod: codigo,
                modelo: modelo,
                placa: placa,
                ano: ano
            }
            const enviar = JSON.stringify(values);
            console.log(enviar);
            axios.post(`http://${ip}/cadastrar_carro`, enviar, {headers:{
                'Content-Type': 'application/json; charset=utf-8'
              },})
            .then((response) => {
                console.log("Sucesso!");
                console.log(response.data);
                document.getElementById('msg').innerHTML = response.data.msg;
                document.getElementById('codigo').value = '';
                document.getElementById('modelo').value = '';
                document.getElementById('placa').value = '';
                document.getElementById('ano').value = '';
                setTimeout(function() {
                    location.replace("listar_veiculos.html");
                  }, 1000);
                
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