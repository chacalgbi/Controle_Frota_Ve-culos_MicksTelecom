var login = sessionStorage.login;
$("#header").load("menu.html");
const ip = sessionStorage.ip;
var modelo = '';
var cod = '';
var condutor = '';
var id_carro = '';

function buscar_veiculo(){
    axios.get(`http://${ip}/listar_carros`)
    .then(function (response) {
        console.log("Veículos");
        console.log(response);
        if(response.data.error == 'sim'){
        document.getElementById('msg').innerHTML = response.data.msg;
        }else{
            response.data.resposta.map((item, index)=>{
                modelo = modelo + `<option value="${item.id}">${item.modelo}</option>`
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
    id_carro = document.getElementById('modelo').value
    let post_modelo = $('#modelo :selected').text();
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
        swal("Aviso!", "Preencha os campos!", "info");
    }else{

        let values = {
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
        //console.log(values);
        const enviar = JSON.stringify(values);
        //console.log(enviar);
        
        axios.post(`http://${ip}/cadastrar_vistoria`, enviar, {headers:{
            'Content-Type': 'application/json; charset=utf-8'
          },})
        .then((response) => {
            //console.log("Sucesso!");
            //console.log(response.data);
            document.getElementById('msg').innerHTML = response.data.msg;
            document.getElementById('msg1').innerHTML = response.data.msg;
            setTimeout(function() { // delay de 1 segundo
                location.replace("lista.html");
              }, 1000);
        }).catch((err) => {
            console.log(`Deu ruim: ${err}`);
        });
    }
}

if(login != 'OK'){
    document.getElementById('msg').innerHTML = "Acesso não autorizado";
    swal("Aviso!", "Acesso não autorizado!", "error");
    setTimeout(function() {
        location.replace("index.html");
      }, 1000);
}else{
    buscar_veiculo();
    buscar_condutor();
}