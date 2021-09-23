var login = sessionStorage.login;
$("#header").load("menu.html");
const ip = sessionStorage.ip;
const urlParams = new URLSearchParams(window.location.search);
const id_get = urlParams.get('id');
var modelo = '';
var cod = '';
var condutor = '';
var id_carro = '';

function buscar_veiculo(id_veiculo){
    axios.get(`http://${ip}/listar_carros`)
    .then(function (response) {
        console.log("Veículos");
        console.log(response);
        if(response.data.error == 'sim'){
        document.getElementById('msg').innerHTML = response.data.msg;
        }else{
            response.data.resposta.map((item, index)=>{
                modelo = modelo + `<option>${item.modelo}</option>`
                cod = cod + `<option>${item.cod}</option>`
            });
            document.getElementById('modelo').innerHTML = modelo;
            document.getElementById('cod').innerHTML = cod;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function buscar_condutor(){
    axios.get(`http://${ip}/listar_condutores`)
    .then(function (response) {
        console.log("Condutores");
        console.log(response);
        if(response.data.error == 'sim'){
        document.getElementById('msg').innerHTML = response.data.msg;
        }else{
            response.data.resposta.map((item, index)=>{
                condutor = condutor + `<option>${item.nome_condutor}</option>`;
            });
            document.getElementById('condutor').innerHTML = condutor;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function salvar_alteracoes(){
    let post_modelo = document.getElementById('modelo').value
    let post_cod = document.getElementById('cod').value
    let post_condutor = document.getElementById('condutor').value
    let post_lataria = document.getElementById('lataria').value
    let post_motor = document.getElementById('motor').value
    let post_limpeza = document.getElementById('limpeza').value
    let post_av_ext = document.getElementById('av_ext').value
    let post_av_int = document.getElementById('av_int').value
    let post_obs = document.getElementById('obs').value

    if(post_modelo == '' || post_cod == '' || post_condutor == '' || post_lataria == '' || post_motor == '' || post_limpeza == '' || post_av_ext == '' || post_av_int == ''){
        document.getElementById('msg').innerHTML = "Preencha todos os campos!";
        swal("Aviso!", "Preencha todos os campos!", "info");
    }else{

        let values = {
            id: parseInt(id_get),
            id_carro: parseInt(id_carro),
            cod: post_cod,
            modelo: post_modelo,
            nome_condutor: post_condutor,
            lataria: parseInt(post_lataria),
            motor: parseInt(post_motor),
            limpeza: parseInt(post_limpeza),
            avaria_externa: parseInt(post_av_ext),
            avaria_interna: parseInt(post_av_int),
            obs: post_obs
        }
        const enviar = JSON.stringify(values);
        console.log(enviar);
        axios.put(`http://${ip}/editar_vistoria`, enviar, {headers:{
            'Content-Type': 'application/json; charset=utf-8'
          },})
        .then((response) => {
            console.log("Sucesso!");
            console.log(response.data);
            document.getElementById('msg').innerHTML = response.data.msg;
            document.getElementById('msg1').innerHTML = response.data.msg;
            setTimeout(function() { // delay de 1 segundo
                location.replace("lista.html");
              }, 1500);
        }).catch((err) => {
            console.log(`Deu ruim: ${err}`);
        });

    }
}

if(login != 'OK'){
    document.getElementById('msg').innerHTML = "Acesso não autorizado";
    swal("Aviso!", "Acesso não autorizado!", "error");
}else{
    axios.get(`http://${ip}/mostrar_vistoria/${id_get}`)
    .then(function (response) {
      console.log("Vistoria");
      console.log(response);
      if(response.data.error == 'sim'){
        document.getElementById('msg').innerHTML = response.data.msg;
      }else{
        modelo = `<option>${response.data.resposta[0].modelo}</option>`;
        cod = `<option>${response.data.resposta[0].cod}</option>`;
        condutor = `<option>${response.data.resposta[0].nome_condutor}</option>`;
        id_carro = response.data.resposta[0].id_carro;
        buscar_veiculo(response.data.resposta[0].id_carro);
        buscar_condutor();
        
        document.getElementById('obs').value = response.data.resposta[0].obs;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}