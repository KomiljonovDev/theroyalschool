let href = window.location.href,
      quizId = href.split("quiz_id="),
      testConteiner = document.querySelector('.testConteiner'),
      nextTest = document.querySelector('.nextTest'),
      quizForm = document.querySelector('#quizForm'),
      count = document.querySelector('.count'),
      ques = document.querySelector('.ques'),
      v1 = document.querySelectorAll('.v1'),
      v2 = document.querySelectorAll('.v2'),
      v3 = document.querySelectorAll('.v3'),
      t = document.querySelector('.v4'),
      v4L = document.querySelector('.v4L'),
      v = document.querySelectorAll('.v'),
      allInp = document.querySelectorAll('.answer'),
      finishText = document.querySelector('.finishText'),
  		u_id = localStorage.getItem('u_id');

  nextTest.style.width = "100%"

  checkSolve = new XMLHttpRequest();
  checkSolve.open('POST', `../api/v1/?do=checkSolved&quiz_id=${quizId[1]}&unique_id=${u_id}`);
  checkSolve.addEventListener('load', () => {
    if (checkSolve.status === 200) {
      checkData = JSON.parse(checkSolve.response);
      if (checkData.ok === true && checkData.code === 200) {
        testConteiner.style.display = 'none';
        nextTest.style.display = 'none';
          finishText.innerHTML = `<center><h2 class='title finishText' style='margin-bottom:300px;'>Siz testni muvaffaqiyatli tugatdingiz!<br> Sizning natijalaringiz:</br><span style='color:green; font-size:23px;'>To'gri javoblar: ${checkData.result.correctAnswers}ta</span></br><span style='color:red; font-size:23px;'>Noto'gri javoblar: ${checkData.result.inCorrectAnswers}ta</span></h2></center>`; 
      }else{
    request = new XMLHttpRequest();
    request.open('POST', `../api/v1/?do=getQuestions&unique_id=${u_id}&quiz_id=${quizId[1]}`);
    request.addEventListener('load', () => {
      if (request.status === 200) {
        resul = request.response;
        data = JSON.parse(resul);
        if (data.code === 200) {
          if (data.ok === true) {
            let i = 0;
            let counT = 0;
            function func() {
              count.innerText = i + 1 + ". ";
                ques.innerText = data.result[i].question; 
                v1.forEach((item) => {
                  item.innerText = data.result[i].v1;
                  item.value = data.result[i].v1;
                });
                v2.forEach((item) => {
                  item.innerText = data.result[i].v2;
                  item.value = data.result[i].v2;
                });
                v3.forEach((item) => {
                  item.innerText = data.result[i].v3;
                  item.value = data.result[i].v3;
                });

                t.value = data.result[i].t;
                v4L.innerText = data.result[i].t;
                // t.forEach((item) => {
                //   item.innerText = data.result[i].t;
                //   item.value = data.result[i].t;
                // });
              
            }
            func();
            let ans = "";
            allInp.forEach((item) => {
              item.addEventListener('click', () => {
                ans = item.value;
              })
            })
            nextTest.addEventListener('click', () => {  
              arr = [v[0], v[1], v[2], v[3]];
              arr[Math.floor(Math.random() * arr.length)]; 

              function getRandom(arr, n) {
                var result = new Array(n),
                    len = arr.length,
                    taken = new Array(len);
                if (n > len)
                    throw new RangeError("getRandom: more elements taken than available");
                while (n--) {
                    var x = Math.floor(Math.random() * len);
                    result[n] = arr[x in taken ? taken[x] : x];
                    taken[x] = --len in taken ? taken[len] : len;
                }
                return result;
              }

              let arrBtn = getRandom(arr, 4)
              arrBtn.forEach((item) => {
                quizForm.append(item)
              })

              request = new XMLHttpRequest();
              request.open('POST', `../api/v1/?do=answerQuery&unique_id=${u_id}&quiz_id=${quizId[1]}&question_id=${data.result[i].id}&answer=${ans}`);
              request.addEventListener('load', () => {
                if(request.status === 200) {
                  obj = JSON.parse(request.response);
                  if(obj.ok === true && obj.code === 200) {
                    allInp.forEach((item) => {
                      item.checked = false;
                    });
                    if(obj.result[0].answer == 1) {
                      const colors = [
                        '#a864fd',
                        '#29cdff',
                        '#78ff44',
                        '#ff718d',
                        '#fdff6a',
                        '#dd42f5',
                        '#dd42f5',
                        '#42e3f5'
                      ];

                      function createElements(root, elementCount) {
                        return Array
                          .from({ length: elementCount })
                          .map((_, index) => {
                            const element = document.createElement('div');
                            element.classList = ['fetti'];
                            const color = colors[index % colors.length];
                            element.style['background-color']= color; // eslint-disable-line space-infix-ops
                            element.style.width = '11px';
                            element.style.height = '11px';
                            element.style.position = 'absolute';
                            root.appendChild(element);
                            return element;
                          });
                      }

                      function randomPhysics(angle, spread, startVelocity) {
                        const radAngle = angle * (Math.PI / 180);
                        const radSpread = spread * (Math.PI / 180);
                        return {
                          x: 0,
                          y: 0,
                          wobble: Math.random() * 10,
                          velocity: (startVelocity * 0.5) + (Math.random() * startVelocity),
                          angle2D: -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread)),
                          angle3D: -(Math.PI / 4) + (Math.random() * (Math.PI / 2)),
                          tiltAngle: Math.random() * Math.PI
                        };
                      }

                      function updateFetti(fetti, progress, decay) {
                        /* eslint-disable no-param-reassign */
                        fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity;
                        fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity;
                        fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity;
                        fetti.physics.wobble += 0.1;
                        fetti.physics.velocity *= decay;
                        fetti.physics.y += 3;
                        fetti.physics.tiltAngle += 0.1;

                        const { x, y, tiltAngle, wobble } = fetti.physics;
                        const wobbleX = x + (10 * Math.cos(wobble));
                        const wobbleY = y + (10 * Math.sin(wobble));
                        const transform = `translate3d(${wobbleX}px, ${wobbleY}px, 0) rotate3d(1, 1, 1, ${tiltAngle}rad)`;

                        fetti.element.style.transform = transform;
                        fetti.element.style.opacity = 1 - progress;

                        /* eslint-enable */
                      }

                      function animate(root, fettis, decay) {
                        const totalTicks = 200;
                        let tick = 0;

                        function update() {
                          fettis.forEach((fetti) => updateFetti(fetti, tick / totalTicks, decay));

                          tick += 1;
                          if (tick < totalTicks) {
                            requestAnimationFrame(update);
                          } else {
                            fettis.forEach((fetti) => root.removeChild(fetti.element));
                          }
                        }

                        requestAnimationFrame(update);
                      }

                      function confetti(root, {
                          angle = 90,
                          decay = 0.9,
                          spread = 45,
                          startVelocity = 45,
                          elementCount = 50
                        } = {}) {
                        const elements = createElements(root, elementCount);
                        const fettis = elements.map((element) => ({
                          element,
                          physics: randomPhysics(angle, spread, startVelocity)
                        }));

                        animate(root, fettis, decay);
                      }

                      // Custom code
                      const mount = document.querySelector('.mount')
                      const trigger = document.querySelector('.trigger');
                      // trigger.addEventListener('click', (event) => {
                        confetti(mount)
                      // })
                    }else{
                      // $(document).on('click', '#error', function(e) {
                        swal(
                          'Xato!',
                          'Afsus siz bu savolga xato javob berdingiz!',
                          'error'
                        );
                        document.querySelector('.swal2-container').style.top = "-320px";
                        document.querySelector('.swal2-confirm').style.display = 'none';
                        setTimeout(function () {
                          document.querySelector('.swal2-container').style.display = 'none';
                        }, 2000);
                      // });
                    }
                  }
                }
              })
              request.send();
              setTimeout(function (){
                counT++;
                counT + 1;
                if(counT == data.result.length) {
                  setTimeout(function(){
                    testConteiner.style.display = 'none';
                    nextTest.style.display = 'none';
                    window.location.href = `./answer.html?quiz_id=${quizId[1]}`
                    // if (checkData.result.noAnswers == 0) {
                    //   finishText.innerHTML = `<center><h2 class='title finishText' style='margin-bottom:300px;'>Siz testni muvaffaqiyatli tugatdingiz!<br> Sizning natijalaringiz:</br><span style='color:green; font-size:25px;'>To'gri javoblar: ${checkData.result.correctAnswers}</span></br><span style='color:red; font-size:25px;'>Noto'gri javoblar: ${checkData.result.inCorrectAnswers}</span></h2></center>`; 
                    // }else{
                    //   finishText.innerHTML = `<center><h2 class='title finishText' style='margin-bottom:300px;'>Siz testni muvaffaqiyatli tugatdingiz!<br> Sizning natijalaringiz:</br><span style='color:green; font-size:25px;'>To'gri javoblar: ${checkData.result.correctAnswers}</span></br><span style='color:red; font-size:25px;'>Noto'gri javoblar: ${checkData.result.inCorrectAnswers}</span></br><span style='color:orange; font-size:25px;'>Beligilanmagan javoblar: ${checkData.result.noAnswers}</span></h2></center>`;
                    // }
                  }, 1200);
                }else{
                  i++;
                }
                func();
              }, 500);
            })
          }
        }
      }
    })
    request.send();
      }
    }
  });
  checkSolve.send();
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
          window.location.href = "../login/";
          }
        } else {
          window.location.href = "../login/";
        }
      } 
    })
    request.send();
  })
});