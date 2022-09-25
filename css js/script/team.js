let kabinet = document.querySelectorAll('.kabinet');
    u_id = localStorage.getItem("u_id");


kabinet.forEach((item) => {
  item.addEventListener('click', () => {
    request = new XMLHttpRequest();
    request.open('POST', `../api/v1/index.php?do=checkUser&unique_id=${u_id}`);
    request.addEventListener('load', () => {
      if(request.status === 200){
        data = request.response;
        obj = JSON.parse(data);
        if (obj.code === 200) {
          if (obj.ok === true) {
            window.location.href = "../test/";
          } else {
          window.location.href = "../login/"
          }
        } else {
          window.location.href = "../login/"
        }
      } 
    })
    request.send();
  })
});