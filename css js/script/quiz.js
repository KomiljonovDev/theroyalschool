u_id = localStorage.getItem("u_id");
chekU_id = new XMLHttpRequest();
  chekU_id.open('POST', `../api/v1/index.php?do=checkUser&unique_id=${u_id}`);
  chekU_id.addEventListener('load', () => {
    if(chekU_id.status === 200){
      chekData = chekU_id.response;
      obj = JSON.parse(chekData);
      if (obj.code === 200) {
        if (obj.ok === true) {
          // window.location.href = "../test/";
        } else {
        window.location.href = "../login/"
        }
      } else {
        window.location.href = "../login/"
      }
    } 
  })
  chekU_id.send();
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
                         <a href="./answer.html?quiz_id=${argument.id}" class="btn testStart">Testni boshlash</a>
                     </div>
                `;
            })
                
          }
        } else {
          list.style.background = 'none';
          list.innerHTML = '<center> <h2>Bu yerda testlar yechishingiz mumkin!</h2><br/><h4>Bu yerda siz The Royal School tomonidan tuzilgan testlarni yechish orqali o`z bilimingizni sinashingiz mumkin!</h4></center>'
        }
      }
  })
  request.send();

let kabinet = document.querySelectorAll('.kabinet');


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