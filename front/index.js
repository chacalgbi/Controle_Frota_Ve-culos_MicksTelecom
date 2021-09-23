sessionStorage.ip = '172.17.1.187:8081';
$("#header").load("menu.html");

function login(){
  const ip = sessionStorage.ip;
  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;
  if(login == '' || senha == ''){
    document.getElementById('msg').innerHTML = 'Preencha os campos.';
    swal("Aviso!", "Preencha os campos!", "info");
  }else{
    axios.post(`http://${ip}/login`, {
      login: login,
      senha: senha
    })
    .then(function (response) {
      console.log(response);
      if(response.data.error == 'sim'){
        document.getElementById('msg').innerHTML = response.data.msg;
        sessionStorage.login = 'NOT';
        swal("Erro!", "Senha inválida!", "error");
      }else{
        sessionStorage.login = 'OK';       
        document.getElementById('msg').innerHTML = response.data.msg;
        setTimeout(function() { // delay de 1 segundo
          location.replace("lista.html");
        }, 1000);
      }
    })
    .catch(function (error) {
      console.log(error);
      document.getElementById('msg').innerHTML = response.data.msg;
    });
  }
}