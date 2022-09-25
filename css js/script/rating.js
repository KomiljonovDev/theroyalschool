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

    let list = document.querySelector('.list');
    request = new XMLHttpRequest();
        request.open('POST', `../api/v1/index.php?do=getAllQuiz`);
        request.addEventListener('load', () => {
        if(request.status === 200){
            data = request.response;
            obj = JSON.parse(data);
            if (obj.code === 200) {
            if (obj.ok === true) {
                obj.result.forEach(function (argument, index) {
                list.innerHTML += `
                    <div class="test">
                        <p>${index + 1} <b>${argument.name}</b></p>
                    </div>
                    <div class="desc">
                        <p>${argument.des}</p>
                        <a href="./result.html?quiz_id=${argument.id}" class="btn testStart">Natijalarni ko'rish</a>
                    </div>
                    `;
                })
                    
            }
            } else {
            window.location.href = "../login/";
            }
        }
    })
    request.send();