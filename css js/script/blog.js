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

newsList = document.querySelector('.newsList');
request = new XMLHttpRequest();
request.open('POST', '../api/v1/?do=getNews');
request.addEventListener('load', () => {
  if (request.status === 200) {
    data = JSON.parse(request.responseText);
    if (data.ok === true && data.code === 200) {
      i = 0;
      data.result.forEach((item) => {
        if (i === 0) {
            newsList.innerHTML += `
            <div class="cardA">
              <div class="cardL">
                <h2>${item.title}</h2>
                <p>${item.des}</p>
              </div>
              <div class="cardL cardImg">
                <img src="../uploads/${item.img}" alt="">
              </div>
            </div>
          `;
          i = 1;  
        }else{
            newsList.innerHTML += `
            <div class="cardA"> 
            <div class="cardL cardImg imgNone2">
              <img src="../uploads/${item.img}" alt="">
            </div>
            <div class="cardL">
              <h2>${item.title}</h2>
              <p>${item.des}</p>
            </div>
            <div class="cardL cardImg imgNone1">
              <img src="../uploads/${item.img}" alt="">
            </div>
          `;
          i = 0;
        }
      })
    }
  }
})
request.send();