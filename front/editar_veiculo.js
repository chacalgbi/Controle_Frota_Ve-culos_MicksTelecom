var login = sessionStorage.login;
$("#header").load("menu.html");
const ip = sessionStorage.ip;
const urlParams = new URLSearchParams(window.location.search);
const id_get = urlParams.get('id');

function salvar_alteracoes(){
    if(login != 'OK'){
        document.getElementById('msg').innerHTML = "Acesso não autorizado";
        swal("Aviso!", "Acesso não autorizado!", "error");
        setTimeout(function() { // delay de 1 segundo
            location.replace("index.html");
          }, 1000);
    }else{
        let post_codigo = document.getElementById('codigo').value;
        let post_modelo = document.getElementById('modelo').value;
        let post_placa = document.getElementById('placa').value;
        let post_ano = document.getElementById('ano').value;
        if(post_codigo == '' || post_modelo == '' || post_placa == '' || post_ano == ''){
            document.getElementById('msg').innerHTML = "Preencha todos os campos";
            swal("Aviso!", "Preencha todos os campos!", "info");
        }else{
            let values = {
                id: id_get,
                cod: post_codigo,
                modelo: post_modelo,
                placa: post_placa,
                ano: post_ano
            }
            const enviar = JSON.stringify(values);
            console.log(enviar);
            axios.put(`http://${ip}/editar_carro`, enviar, {headers:{
                'Content-Type': 'application/json; charset=utf-8'
              },})
            .then((response) => {
                //console.log("Sucesso!");
                //console.log(response.data);
                document.getElementById('msg').innerHTML = response.data.msg;
                document.getElementById('codigo').value = '';
                document.getElementById('modelo').value = '';
                document.getElementById('placa').value = '';
                document.getElementById('ano').value = '';
                setTimeout(function() { // delay de 1 segundo
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

    axios.get(`http://${ip}/mostrar_carro/${id_get}`)
    .then((response) => {
        console.log("Sucesso!");
        console.log(response.data);
        document.getElementById('codigo').value = response.data.resposta[0].cod;
        document.getElementById('modelo').value = response.data.resposta[0].modelo;
        document.getElementById('placa').value = response.data.resposta[0].placa;
        document.getElementById('ano').value = response.data.resposta[0].ano;
        
    }).catch((err) => {
        document.getElementById('msg').innerHTML = err;
        console.log(`Deu ruim: ${err}`);
    });

}