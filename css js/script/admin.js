function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";
  
    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();


  const sendBtn = document.getElementById('sendNews'),
  newsForm = document.getElementById('newsForm');
    
    sendBtn.onclick = () =>{
        formData = new FormData(newsForm);
        xhr = new XMLHttpRequest();
        xhr.open('POST', `../api/v1/?do=addNews&admin_unique_id=${admin_u_id}`, true);
        xhr.onload = () => {
            formData = new FormData(newsForm);
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (data.code === 200) {
                    if (data.ok === true) {
                        document.getElementsByClassName('resultText')[0].innerHTML = '<p>Yangilik muvaffaqiyatli joylandi!</p>';
                        setTimeout(function () {
                            window.location.href = './';
                        },2000);
                    }
                } else {
                    document.getElementsByClassName('resultText')[0].innerText = data.message;
                    setTimeout(function () {
                        window.location.href = './';
                    },2000);
                }
            }
        }
        xhr.send(formData);
    }

    let sendTest = document.querySelector(".sendTest"),
        testForm = document.querySelector(".testForm"),
        testName = document.querySelector(".testName"),
        testDesc = document.querySelector(".testDesc"),
        resultTexT = document.querySelector(".resultTexT"),
        hiddenInp = document.querySelector(".hiddenInp"),
        createQuestion = document.querySelector(".createQuestion"),
        createQuiz = document.querySelector(".createQuiz"),
        question = document.querySelector(".question"),
        v1 = document.querySelector(".v1"),
        v2 = document.querySelector(".v2"),
        v3 = document.querySelector(".v3"),
        answ = document.querySelector(".answ"),
        testSavol = document.querySelector(".testSavol"),
        closew = document.querySelector(".close"),
        formDataT = new FormData(testForm);
        createQuestion.style.display = 'none';
        closew.style.display = 'none';
        let i = 0;
        let count = 0;
        sendTest.addEventListener('click', () => {
            count++
            if (i === 0) {
                Request = new XMLHttpRequest();
                Request.open('POST', `../api/v1/index.php?do=createQuiz&admin_unique_id=${admin_u_id}&name=${testName.value}&desc=${testDesc.value}`, true);
                Request.addEventListener('load', () => {
                    formDataT = new FormData(testForm);
                    if (Request.status === 200) {
                        const dataT = JSON.parse(Request.responseText);
                        if (dataT.code === 200) {
                            if (dataT.ok === true) {
                                hiddenInp.value = dataT.result[0].id;
                                resultTexT.innerHTML = "<h4 class='text-success'>Test muvaffaqiyatli yaratildi</h4>";
                                setTimeout(function success(){
                                    resultTexT.innerHTML = "";
                                    createQuiz.style.display = "none";
                                    createQuestion.style.display = 'block';
                                    sendTest.innerText = "Qo'shish";
                                    closew.style.display = 'flex';
                                    sendTest.style.display = 'flex';
                                }, 1500);
                                testName.value = "";
                                testDesc.value = "";
                            } else {
                                resultTexT.innerHTML = `<h4 class='text-danger'>${obj.message}</h4>`;
                                setTimeout(function error(){
                                    resultTexT.innerHTML = "";
                                }, 3000);
                                testName.value = "";
                                testDesc.value = "";
                            }
                        }else{
                                resultTexT.innerHTML = `<h4 class='text-danger'>${obj.message}</h4>`;
                                setTimeout(function error(){
                                    resultTexT.innerHTML = "";
                                }, 3000);
                                testName.value = "";
                                testDesc.value = "";
                            }
                    }
                })
                Request.send(formDataT);
                i++;
            }else{
                closew.addEventListener('click', () => {
                    createQuiz.style.display = "block";
                    createQuestion.style.display = 'none';
                    closew.style.display = 'none';
                    window.location.href = './';
                })
                request = new XMLHttpRequest();
                request.open('POST', `../api/v1/index.php?do=addQuestion&admin_unique_id=${admin_u_id}&quiz_id=${hiddenInp.value}&question=${question.value}&v1=${v1.value}&v2=${v2.value}&v3=${v3.value}&t=${answ.value}`, true);
                request.addEventListener('load', () => {
                    testSavol.textContent = count+"-test uchun savol";
                    formDataT = new FormData(testForm);
                    if (request.status === 200) {
                        const dataT = JSON.parse(request.responseText);
                        if (dataT.code === 200) {
                            if (dataT.ok === true) {
                                resultTexT.innerHTML = "<h4 class='text-success'>Test muvaffaqiyatli yaratildi</h4>";
                                setTimeout(function success(){
                                    resultTexT.innerHTML = "";
                                }, 3000);
                                question.value = "";
                                v1.value = "";
                                v2.value = "";
                                v3.value = "";
                                answ.value = "";
                            } else {
                                resultTexT.innerHTML = `<h4 class='text-danger'>${obj.message}</h4>`;
                                setTimeout(function error(){
                                    resultTexT.innerHTML = "";
                                }, 3000);
                                question.value = "";
                                v1.value = "";
                                v2.value = "";
                                v3.value = "";
                                answ.value = "";
                            }
                        } else {
                                resultTexT.innerHTML = `<h4 class='text-danger'>${obj.message}</h4>`;
                                setTimeout(function error(){
                                    resultTexT.innerHTML = "";
                                }, 3000);
                                question.value = "";
                                v1.value = "";
                                v2.value = "";
                                v3.value = "";
                                answ.value = "";
                            }
                    }
                })
                request.send(formDataT);
            }			
        })

newsList = document.querySelector('.newsList');
request = new XMLHttpRequest();
request.open('POST', '../api/v1/?do=getNews');
request.addEventListener('load', (e) => {
    e.preventDefault();
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
                <a class="deleteBtn btn btn-danger text-white" href="?news_id=${item.id}">Delete</a>
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
              <a class="deleteBtn btn btn-danger text-white" href="?news_id=${item.id}">Delete</a>
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

del = document.querySelectorAll('.deleteBtn');

del.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
    })
})

let href = window.location.href,
    newsId = href.split("news_id=")
delNews = new XMLHttpRequest();
delNews.open('POST', `../api/v1/?do=deleteNews&news_id=${newsId[1]}&admin_unique_id=${admin_u_id}`);

delNews.addEventListener('load', (e) => {
    e.preventDefault();
    if (delNews.status === 200) {
        delData = JSON.parse(delNews.response);
        if(delData.ok === true && delData.code === 200) {
            msg = document.querySelector('.msg');
            msg.innerHTML = "<h3 class='text-success'>Yangilik o'chirildi!</h3>"
        }
    }
});

delNews.send()


const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const bttn = accordion.querySelector(".accordion__button");
  const panel = accordion.querySelector(".accordion__panel");
  const activeClassBtn = "accordion__button-active";
  const activeClassPanel = "accordion__panel-active";

  bttn.addEventListener("click", (event) => {
    event.preventDefault();

    const active__bttn = document.querySelectorAll(
      ".accordion .accordion__button-active"
    );
    active__bttn.forEach((el) =>
      el !== bttn ? el.classList.remove(activeClassBtn) : null
    );
    bttn.classList.toggle(activeClassBtn);

    const active__panel = document.querySelectorAll(
      ".accordion .accordion__panel-active"
    );
    active__panel.forEach((el) =>
      el !== panel ? el.classList.remove(activeClassPanel) : null
    );
    panel.classList.toggle(activeClassPanel);

    panel.style.setProperty("--height", `${panel.scrollHeight}px`);
  });
});


let list = document.querySelector('.accordions');
	testReq = new XMLHttpRequest();
		testReq.open('POST', `../api/v1/index.php?do=getAllQuiz`);
		testReq.addEventListener('load', () => {
	    if(testReq.status === 200){
	      datatest = testReq.response;
	      obbjTets = JSON.parse(datatest);
	      if (obbjTets.code === 200) {
	        if (obbjTets.ok === true) {
	          obbjTets.result.forEach(function (argument, index) {
	          	list.innerHTML += `
		          <div class="accordion">
                  <div class="accordion__slot">
                    <button class="accordion__button">${argument.name}</button>
                  </div>
                  <div class="accordion__slot">
                    <div class="accordion__panel">
                      <p class="accordion-panel__content">${argument.des}</p>
                    </div>
                  </div>
                </div>
		          `;
	          })
		          
	        }
	      } else {
	        // window.location.href = "../login/";
	      }
	    }
	})
	testReq.send();