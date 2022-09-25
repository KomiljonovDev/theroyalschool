let forms = document.querySelector('.form'),
    email = document.querySelector('.email'),
    password = document.querySelector('.pass'),
    errorText = document.querySelector('.errorText');

forms.addEventListener('submit', (e) => {
  e.preventDefault();
  let request = new XMLHttpRequest();
  request.open("POST", `../api/v1/index.php?do=login&mail=${email.value}&password=${password.value}`, true);

  const formData = new FormData(forms);
  request.send(formData);

  request.addEventListener('load', () => {
    if(request.status === 200){
      data = request.response;
      obj = JSON.parse(data);
      if (obj.code === 200) {
        if (obj.ok === true) {
          errorText.innerHTML = "<p style='color:green'>Login malumotlari tekshirilmoqda...</p>";
          setTimeout(function success(){
            errorText.innerHTML = "";
          }, 2000);
          localStorage.setItem("u_id", obj.result[0].unique_id);
          email.value = "";
          password.value = "";
          setTimeout(function plane(){
            window.location.href = "../test/"
          }, 2000);
        }else{
          errorText.innerHTML = `<p style='color:red'>${obj.message}</p>`;
          setTimeout(function error(){
            errorText.innerHTML = "";
          }, 2000);
          email.value = "";
          password.value = "";
        }
      }else{
          errorText.innerHTML = `<p style='color:red'>${obj.message}</p>`;
          setTimeout(function error(){
            errorText.innerHTML = "";
          }, 2000);
          email.value = "";
          password.value = "";
        }
    }
  })
})