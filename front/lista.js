var login = sessionStorage.login;
const ip = sessionStorage.ip;
$("#header").load("menu.html");

function detalhes(id){
  axios.get(`http://${ip}/mostrar_vistoria/${id}`)
  .then(function (response) {
      Swal.fire({ 
        imageUrl: 'https://micks.com.br/wp-content/uploads/2021/01/Sem-Titulo-2.jpg', 
        imageWidth: 200, 
        imageHeight: 80, 
        imageAlt: 'Logo Micks', 
        html: `
        
        <h3>Detalhes</h3>
        <table class="table table-hover">
          <thead>
            <tr><th scope="col">Campo</th><th scope="col">Valor</th></tr>
          </thead>
          <tbody>
            <tr><td>Código</td><td>${response.data.resposta[0].cod}</td></tr>
            <tr><td>Condutor</td><td>${response.data.resposta[0].nome_condutor}</td></tr>
            <tr><td>Lataria</td><td>${response.data.resposta[0].lataria}</td></tr>
            <tr><td>Motor</td><td>${response.data.resposta[0].motor}</td></tr>
            <tr><td>Limpeza</td><td>${response.data.resposta[0].limpeza}</td></tr>
            <tr><td>Av. Externa</td><td>${response.data.resposta[0].avaria_externa}</td></tr>
            <tr><td>Av. Interna</td><td>${response.data.resposta[0].avaria_interna}</td></tr>
            <tr><td>OBS</td><td>${response.data.resposta[0].obs}</td></tr>
            <tr><td>Vistoriado em</td><td>${response.data.resposta[0].data_hora}</td></tr>
          </tbody>
        </table>

        `, 
        confirmButtonColor: '#3085d6' 
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

if(login != 'OK'){
    document.getElementById('msg').innerHTML = "Acesso não autorizado";
    setTimeout(function() {
      location.replace("index.html");
    }, 1500);
}else{
    const ip = sessionStorage.ip;

    axios.get(`http://${ip}/listar_vistorias`)
      .then(function (response) {
          var table = "";
        console.log(response);
        if(response.data.error == 'sim'){
          document.getElementById('msg').innerHTML = response.data.msg;
        }else{
          for (let index = 0; index < response.data.resposta.length; index++){
            table = table + `<tr>
            <td>${index}</td><td>${response.data.resposta[index].modelo}</td>
            <td>${response.data.resposta[index].cod}</td>
            <td>${response.data.resposta[index].nome_condutor}</td>
            <td>${response.data.resposta[index].data_hora}</td>
            <td><a href="editar.html?id=${response.data.resposta[index].id}" class="btn btn-info" role="button">Editar</a></td>
            <td><button class="btn btn-info" onclick="detalhes(${response.data.resposta[index].id})">Detalhes</button></td>
            </tr>`
          }
          document.getElementById('corpo').innerHTML = table;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}