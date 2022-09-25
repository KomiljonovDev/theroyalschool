let kabinet = document.querySelectorAll('.kabinet');
    u_id = localStorage.getItem("u_id");


kabinet.forEach((item) => {
  item.addEventListener('click', () => {
    request = new XMLHttpRequest();
    request.open('POST', `../api/v1/index.php?do=checkUser&unique_id=${u_id}`);
    request.addEventListener('load', () => {
      if(request.status === 200){
        obj = JSON.parse(request.response);
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

let href = window.location.href,
    quizId = href.split("quiz_id="),
    list = document.querySelector('.list'),
    msg = document.querySelector('.msg');

xhr = new XMLHttpRequest();
xhr.open('POST', `../api/v1/?do=getSolvedRating&quiz_id=${quizId[1]}`);

xhr.addEventListener('load', () => {
  if (xhr.status === 200) {
    data = JSON.parse(xhr.response);
    if (data.ok === true && data.code === 200) {
      data.result.forEach((item, index) => {
        item.user.forEach((user) => {
          if(item.inCorrectAnswers == false){
            list.innerHTML += `
            <div class="test">
              <p style="font-size: 20px;"><b>${index + 1}. ${user.name}</b></p>
              <p><span style="color: black; font-size:18px;">Jami testlar soni: ${item.quizCount} ta</span></br><span style="color: green;">To'g'ri javoblar: ${item.correctAnswers} ta</span></br><span style="color: red;">Noto'g'ri javoblar: Mavjud emas!</span></p>
            </div>
          ` 
          }else{
            list.innerHTML += `
            <div class="test">
              <p style="font-size: 20px;"><b>${index + 1}. ${user.name}</b></p>
              <p><span style="color: black; font-size:18px;">Jami testlar soni: ${item.quizCount} ta</span></br><span style="color: green;">To'g'ri javoblar: ${item.correctAnswers} ta</span></br><span style="color: red;">Noto'g'ri javoblar: ${item.inCorrectAnswers} ta</span></p>
            </div>
          ` 
          }
        })
      })
    }else{
      msg.innerHTML = `<center><h2 class='title' style='height:400px'>Bu testni xali hech kim yechmadi!</h2></center>`
    }
  }
})
xhr.send();