var login = sessionStorage.login;
$("#header").load("menu.html");
const ip = sessionStorage.ip;

function excluir(id){
    swal({
        title: "Deseja apagar o registro?",
        text: "Os dados apagados não podem ser recuperados!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            axios.delete(`http://${ip}/deletar_condutor/${id}`)
            .then((response) => {
                document.getElementById('msg').innerHTML = "Condutor Excluído com Sucesso!";
                swal("Registro excluído com sucesso!", { icon: "success"});
                setTimeout(function() { // delay de 1 segundo
                    location.replace("listar_condutores.html");
                  }, 1000);
            }).catch((err) => {
                document.getElementById('msg').innerHTML = err;
                swal("Erro ao excluir registro!", { icon: "error"});
            });
        } else {
          swal("Exclusão cancelada!", { icon: "info"});
        }
      });
}

if(login != 'OK'){
    document.getElementById('msg').innerHTML = "Acesso não autorizado";
    setTimeout(function() { // delay de 1 segundo
        location.replace("index.html");
      }, 1500);
}else{
    axios.get(`http://${ip}/listar_condutores`)
    .then((response) => {
        var table = "";       
        response.data.resposta.map((item, index)=>{
            table = table + `<tr>
            <td>${item.id}</td>
            <td>${item.nome_condutor}</td>
            <td><button class="btn btn-danger" onClick="excluir(${item.id})">Excluir</button></td>
            </tr>`
        });
        document.getElementById('corpo').innerHTML = table;
        
    }).catch((err) => {
        document.getElementById('msg').innerHTML = err;
        console.log(`Deu ruim: ${err}`);
    });
}