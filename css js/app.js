let sendBtn = document.querySelector('.send'),
    f_name = document.querySelector('.firs_n'),
    email = document.querySelector('.email'),
    phone = document.querySelector('.phone_n'),
    comment = document.querySelector('.comment'),
    Newsbtn = document.querySelector('.Newsbtn'),
    emailNews = document.querySelector('.emailNews'),
    messageForm = document.querySelector('.messageForm'),
    form = document.querySelector('.form');
    
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  request = new XMLHttpRequest();
  request.open('POST', './api/v1/?do=sendMessage', true);
  formData = new FormData(messageForm);
  request.addEventListener('load', function (argument) {
    if (request.status === 200) {
      data = JSON.parse(request.response);
      if (data.ok === true) {
        alert('Yuborildi!');
      }else{
        alert('Yuborilmadi!');
      }
    }
  })
  request.send(formData);
});
Newsbtn.addEventListener('click', (e) => {
  e.preventDefault();
  request = new XMLHttpRequest();
  request.open('POST', './api/v1/?do=sendMail', true);
  formData = new FormData(form)
  request.addEventListener('load', function (argument) {
    if (request.status === 200) {
      data = JSON.parse(request.response);
      if (data.ok === true) {
        alert('Yuborildi!');
      }else{
        alert('Yuborilmadi!');
      }
    }
  });
  request.send(formData);
});


const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');
const headerMenuRight = document.querySelector('.btnMenu');
const highBtn = document.querySelector('.high')

menuBtn.onclick = () =>{
  menuBtn.classList.toggle('active');
  navigation.classList.toggle('active')
  headerMenuRight.classList.toggle('active')
}

filterSelection("all")
function filterSelection(c) { 
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = document.getElementsByClassName("btnKurs");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
};



// highBtn.addEventListener('click', () =>{
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// })

// let desc = document.querySelector('.desc');
// let testDiv = document.querySelectorAll('.test');

// desc.style.display = 'none';
// testDiv.forEach(function (test) {
//   test.addEventListener('click', () => {
//     desc.style.display = 'block';
//   })
// })
  



  $(document).ready(function() {
    var lang = "uz-uz";
    $(".lgg").each(function(index, element) {
      $(this).text(arrLang[lang][$(this).attr("key")]);
    });
    });

  $(".translate").click(function() {
    var lang = $(this).attr("id");

    $(".lgg").each(function(index, element) {
      $(this).text(arrLang[lang][$(this).attr("key")]);
    });
  });
  var arrLang = {
    "uz-uz": {
      "Kurslar":"Kurslar",
      "Jamoa":"Jamoa",
      "Blog":"Blog",
      "Test yechish":"Test yechish",
      "Reyting":"Reyting",
      "oferta":"Oferta",
      "Shaxsiy kabinet":"Shaxsiy kabinet",
      "IELTS dan yuqori ballni":"IELTS dan yuqori ballni",
      " birinchi imtihonning o'zidayoq qo'lga kiriting.":" birinchi imtihonning o'zidayoq qo'lga kiriting.",
      "Birinchi darsga yozilish":"Birinchi darsga yozilish",
      "2 daqiqa ichida o'quv markazimiz haqida bilib oling":"2 daqiqa ichida o'quv markazimiz haqida bilib oling",
      "The Royal School o'quv markazining afzalliklari":"The Royal School o'quv markazining afzalliklari",
      "Kursga yozilish":"Kursga yozilish",
      "O'zingizga mos kursni toping":"O'zingizga mos kursni toping",
      "Hammasi":"Hammasi",
      "Til kurslari":"Til kurslari",
      "Aniq fanlar":"Aniq fanlar",
      "Matematika":"Matematika",
      "Bizning o'quvchilar":"Bizning o'quvchilar",
      "Qanday qilib biz bilan bog'lansa bo'ladi?":"Qanday qilib biz bilan bog'lansa bo'ladi?",
      "Manzil":"Manzil",
      "Qo'ng'iroq qiling":"Qo'ng'iroq qiling",
      "Telefon":"Telefon",
      "Yuborish":"Send",
      "Bizning xabarnomamizga obuna bo'ling":"Bizning xabarnomamizga obuna bo'ling",
      "Bu yerga elektron pochta xabarini yuboring":"Bu yerga elektron pochta xabarini yuboring",
      "Biz haqimizda":"Biz haqimizda",
      "Ijtimoiy tarmoqlarimiz:":"Ijtimoiy tarmoqlarimiz:",
      "Foydali havolalar:":"Foydali havolalar:",
      "Kurslar":"Kurslar",
      "Jamoa":"Jamoa",
      "Yangiliklar":"Yangiliklar",
      "Afzalliklar":"Afzalliklar",
      "Rahbar":"Rahbar",
      "Tadbirlar":"Tadbirlar",
      "O'quvchilar":"O'quvchilar",
      "Savollar":"Savollar",
      "Bizning maqsad - intiluvchan va qadriyatli o’zbek yoshlarini dunyoga yetakchi bo’ladigan darajaga olib chiqish":"Bizning maqsad - intiluvchan va qadriyatli o’zbek yoshlarini dunyoga yetakchi bo’ladigan darajaga olib chiqish",
      "Bizning jamoa":"Bizning jamoa",
      "Faxrli ustozlar":"Faxrli ustozlar",
      "Motivator va Biznesmen":"Motivator va Biznesmen",
      "20 yoshida o'quv markazi ochib, 7 yilda 40 000 dan ziyod insonlarni ingliz tili o'rganishiga yordam bergan":"20 yoshida o'quv markazi ochib, 7 yilda 40 000 dan ziyod insonlarni ingliz tili o'rganishiga yordam bergan",
      "O'zbekiston Yosh Tadbirkorlar Ambassadori":"O'zbekiston Yosh Tadbirkorlar Ambassadori",
      "Cambridge o'quv markazi asoschisi":"Cambridge o'quv markazi asoschisi",
      "IT maktabi asoschilaridan biri":"IT maktabi asoschilaridan biri",
      "O'quv markazimiz rahbari":"O'quv markazimiz rahbari",
      "RAHBAR":"RAHBAR",
      "O'quv markazimiz rahbari":"O'quv markazimiz rahbari",
      "Koreya, Xitoy, Qozog'iston va O'zbekiston davlat universitetlarida o'qiydigan talabalar motivatsion namoyishlari bilan sizni yanada tezroq bilim olishingiz uchun yordam beradi!":"Koreya, Xitoy, Qozog'iston va O'zbekiston davlat universitetlarida o'qiydigan talabalar motivatsion namoyishlari bilan sizni yanada tezroq bilim olishingiz uchun yordam beradi!",
      "O'quv markazimiz o'qituvchilari yuqori tajriba va bilimga ega.":"O'quv markazimiz o'qituvchilari yuqori tajriba va bilimga ega.",
      "Bizda kurslar qisqa vaqt ichida professional tarzda o'rgatiladi.":"Bizda kurslar qisqa vaqt ichida professional tarzda o'rgatiladi.",
      "O'quv markazimizda darslar faqat nazariy emas balki amaliy tarzda ham o'tiladi.":"O'quv markazimizda darslar faqat nazariy emas balki amaliy tarzda ham o'tiladi.",
      "Har yili ko'plab o'quvchilarimiz ajoyib natijalarga erishadi.":"Har yili ko'plab o'quvchilarimiz ajoyib natijalarga erishadi.",
      "Bizda IELTS kurslari ham mavjud.":"Bizda IELTS kurslari ham mavjud.",
      "O'quvchi birinchi 2ta darsda bepul o'qisa bo'ladi.Darslar yoqsa qoladi yoki chiqib ketishi ham mumkin.":"O'quvchi birinchi 2ta darsda bepul o'qisa bo'ladi.Darslar yoqsa qoladi yoki chiqib ketishi ham mumkin.",
      "Agarda bitta oiladan 2ta farzand keladigan bo'lsa har bir fandan 20ming so'mdan chegirma.":"Agarda bitta oiladan 2ta farzand keladigan bo'lsa har bir fandan 20ming so'mdan chegirma.",
      "Bizda vaqti-vaqti bilan musobaqalar o'tkaziladi va yutgan o'quvchiga har xil sovg'alar yoki chegirmalar beriladi!":"Bizda vaqti-vaqti bilan musobaqalar o'tkaziladi va yutgan o'quvchiga har xil sovg'alar yoki chegirmalar beriladi!",
      "O'quvchi kurslarni davom etishi uchun imtihonda 100 balldan maksimum 70 ball yoki undan yuqori ball to'plashi lozim!":"O'quvchi kurslarni davom etishi uchun imtihonda 100 balldan maksimum 70 ball yoki undan yuqori ball to'plashi lozim!",
      "-The Royal School o'quvchisi-":"-The Royal School-",
      "The Royal School o'quv markazining afzalliklari":"The Royal School o'quv markazining afzalliklari",
      "Birinchi imtixonni o'zidayoq baland ball qo'lga kiritasiz.":"Birinchi imtixonni o'zidayoq baland ball qo'lga kiritasiz.",
      "IELTS balini 7 dan yuqori olsangiz sizga kurs pulini hammasi  qaytarib beriladi.":"IELTS balini 7 dan yuqori olsangiz sizga kurs pulini hammasi  qaytarib beriladi.",
      "Sizga tajribali va 7 ball IELTS ni qo'lga kiritgan o'qituvchilar ta'lim beradi.":"Sizga tajribali va 7 ball IELTS ni qo'lga kiritgan o'qituvchilar ta'lim beradi.",
      "O'quv markazimiz shahar markazida joylashgan.":"O'quv markazimiz shahar markazida joylashgan.",
      "Har yakshanba kuni qo'shimcha dars mutlaqo bepul bo'ladi.":"Har yakshanba kuni qo'shimcha dars mutlaqo bepul bo'ladi.",
      "Har yili ko'plab o'quvchilarimiz ajoyib natijalarga erishadi.":"Har yili ko'plab o'quvchilarimiz ajoyib natijalarga erishadi.",
      "IELTS balini qo'lga kiritishingiz bilan sizni ish bilan ta'minlaydi.":"IELTS balini qo'lga kiritishingiz bilan sizni ish bilan ta'minlaydi.",
      "Bizda IELTS kurslari ham mavjud.":"Bizda IELTS kurslari ham mavjud.",
      "The Royal School o'quv markazini tanlang! Va yo'lingizdan adashmang.":"The Royal School o'quv markazini tanlang! Va yo'lingizdan adashmang.",
      "Ingliz tili":"Ingliz tili",
      "Rus tili":"Rus tili",
      "Gʻulomova Odinaxon 22 yoshda. 3 oydan beri o'z ish faoliyatini olib bormoqda.":"Gʻulomova Odinaxon 22 yoshda. 3 oydan beri o'z ish faoliyatini olib bormoqda.",
      "Òlmasboyev Sanjar 20 yosh. 1 yildan beri ishlaydi. IELTS darajasi 7.":"Òlmasboyev Sanjar 20 yosh. 1 yildan beri ishlaydi. IELTS darajasi 7.",
      "Elbek Dadajonov 1 yarim yildan beri ishlab kelmoqda. IELTS darajasi 6.5. 14 yoshi IELTS ballini qo'lga kiritgan.":"Elbek Dadajonov 1 yarim yildan beri ishlab kelmoqda. IELTS darajasi 6.5. 14 yoshi IELTS ballini qo'lga kiritgan.",
      "The Royal School o’quv markazi qayerda joylashgan?":"The Royal School o’quv markazi qayerda joylashgan?",
      "Namangan viloyati Pop tumani Barkamol-Avlod binosi ichida mo'ljal Xalq Banki yonida":"Namangan viloyati Pop tumani Barkamol-Avlod binosi ichida mo'ljal Xalq Banki yonida",
      "The Royal School o'quv markazi sizga nimalar bera oladi?":"The Royal School o'quv markazi sizga nimalar bera oladi?",
      "Siz kelajakdagi katta muvaffaqiyatlaringizga The Royal School ga qo'ygan kichk qadamlaringiz orqali erishishingiz mumkin!":"Siz kelajakdagi katta muvaffaqiyatlaringizga The Royal School ga qo'ygan kichk qadamlaringiz orqali erishishingiz mumkin!",
      "The Royal School o'quv markazi sizni shunchaki o'qitishdan tashqari: Kelajakdagi maqsadlaringizni qo'yishingizga; buyuk insonlardek fikrlashingizga; va eng asosiysi 100,000 so'm pulni bilimga tikib uni 1,000,000 yoki  100,000,000 qilib chiqarishni ham o'rgatadi.":"The Royal School o'quv markazi sizni shunchaki o'qitishdan tashqari: Kelajakdagi maqsadlaringizni qo'yishingizga; buyuk insonlardek fikrlashingizga; va eng asosiysi 100,000 so'm pulni bilimga tikib uni 1,000,000 yoki  100,000,000 qilib chiqarishni ham o'rgatadi.",
      "The Royal School tanlovda adashmang!":"The Royal School tanlovda adashmang!",
      "Matematika":"Matematika",
      "Rus tili":"Rus tili",
      "Ingliz tili":"Ingliz tili",
      "The Royal School o'quv markazining qoidalari":"The Royal School o'quv markazining qoidalari",
      "The Royal School o'quv markazi asoschisi":"The Royal School o'quv markazi asoschisi",
		"Dilnavoz Sharofidinova 5 oydan beri The Royal School o'quv markazida managerlik qilib kelmoqdalar.":"Dilnavoz Sharofidinova 5 oydan beri The Royal School o'quv markazida managerlik qilib kelmoqdalar."
    },
    "uz-en": {
      "Kurslar":"Courses",
      "Jamoa":"Team",
      "Blog":"Blog",
      "Test yechish":"Test solving",
      "Reyting":"Rating",
      "oferta":"Offerta",
      "Shaxsiy kabinet":"Personal Cabinet",
      "IELTS dan yuqori ballni":"Score above IELTS",
      " birinchi imtihonning o'zidayoq qo'lga kiriting.":" Take the first exam itself.",
      "Birinchi darsga yozilish":"Enroll in the first lesson",
      "2 daqiqa ichida o'quv markazimiz haqida bilib oling":"Learn about our learning center in 2 minutes",
      "The Royal School o'quv markazining afzalliklari":"Advantages of The Royal School Learning Center",
      "Kursga yozilish":"Sign up for the course",
      "O'zingizga mos kursni toping":"Find a course that suits you",
      "Hammasi":"All of it",
      "Til kurslari":"Language courses",
      "Aniq fanlar":"Clear Sciences",
      "Matematika":"Mathematics",
      "Bizning o'quvchilar":"Our readers",
      "Qanday qilib biz bilan bog'lansa bo'ladi?":"How to contact us?",
      "Manzil":"Address",
      "Qo'ng'iroq qiling":"Call",
      "Telefon":"Phone",
      "Yuborish":"Send",
      "Bizning xabarnomamizga obuna bo'ling":"Subscribe to our newsletter",
      "Bu yerga elektron pochta xabarini yuboring":"Send an email here",
      "Biz haqimizda":"About us",
      "Ijtimoiy tarmoqlarimiz:":"Our social networks:",
      "Foydali havolalar:":"Useful links:",
      "Kurslar":"Courses",
      "Jamoa":"Team",
      "Yangiliklar":"News",
      "Afzaliklar":"Advantages",
      "Rahbar":"Directory",
      "Tadbirlar":"Events",
      "O'quvchilar":"Readers",
      "Savollar":"Questions",
      "Bizning maqsad - intiluvchan va qadriyatli o’zbek yoshlarini dunyoga yetakchi bo’ladigan darajaga olib chiqish":"Our goal is to bring eager and valued Uzbek youth to a level that will lead the world",
      "Bizning jamoa":"Our Team",
      "Faxrli ustozlar":"Proud Teachers",
      "Motivator va Biznesmen":"Motivator and Businessman",
      "20 yoshida o'quv markazi ochib, 7 yilda 40 000 dan ziyod insonlarni ingliz tili o'rganishiga yordam bergan":"Opened a learning center at the age of 20 and helped more than 40,000 people learn English in seven years",
      "O'zbekiston Yosh Tadbirkorlar Ambassadori":"Ambassador of Young Entrepreneurs of Uzbekistan",
      "Cambridge o'quv markazi asoschisi":"Founder of Cambridge Learning Center",
      "IT maktabi asoschilaridan biri":"One of the founders of it school",
      "O'quv markazimiz rahbari":"Head of our training center",
      "RAHBAR":"DIRECTORY",
      "Koreya, Xitoy, Qozog'iston va O'zbekiston davlat universitetlarida o'qiydigan talabalar motivatsion namoyishlari bilan sizni yanada tezroq bilim olishingiz uchun yordam beradi!":"Students studying at state universities in Korea, China, Kazakhstan, and Uzbekistan will help you learn faster with their motivational demonstrations!",
      "O'quv markazimiz o'qituvchilari yuqori tajriba va bilimga ega.":"The teachers of our training center have a high level of experience and knowledge.",
      "Bizda kurslar qisqa vaqt ichida professional tarzda o'rgatiladi.":"We have courses taught professionally in a short time.",
      "O'quv markazimizda darslar faqat nazariy emas balki amaliy tarzda ham o'tiladi.":"At our training center, classes are taught not only in a theoretical way but also in a practical way.",
      "Har yili ko'plab o'quvchilarimiz ajoyib natijalarga erishadi.":"Many of our readers achieve amazing results every year.",
      "Bizda IELTS kurslari ham mavjud.":"We also have IELTS courses.",
      "O'quvchi birinchi 2ta darsda bepul o'qisa bo'ladi.Darslar yoqsa qoladi yoki chiqib ketishi ham mumkin.":"The student will be able to study for free in the first 2 lessons. Classes will remain on the go or may also leave.",
      "Agarda bitta oiladan 2ta farzand keladigan bo'lsa har bir fandan 20ming so'mdan chegirma.":"If there are 2 children from one family, a discount of 20,000 gallons [20,000 L] from each fan.",
      "Bizda vaqti-vaqti bilan musobaqalar o'tkaziladi va yutgan o'quvchiga har xil sovg'alar yoki chegirmalar beriladi!":"We have periodic competitions and the winning reader is given different gifts or discounts!",
      "O'quvchi kurslarni davom etishi uchun imtihonda 100 balldan maksimum 70 ball yoki undan yuqori ball to'plashi lozim!":"The student must collect a maximum of 70 points or more from 100 points in order to continue the courses!",
      "-The Royal School o'quvchisi-":"-The Royal School-",
      "The Royal School o'quv markazining afzaliklari":"Advantages of The Royal School Learning Center",
      "Birinchi imtixonni o'zidayoq baland ball qo'lga kiritasiz.":"You will take the first test with a high ball.",
      "IELTS balini 7 dan yuqori olsangiz sizga kurs pulini hammasi  qaytarib beriladi.":"If you get your IELTS score above 7, you will be refunded all the course money.",
      "Sizga tajribali va 7 ball IELTS ni qo'lga kiritgan o'qituvchilar ta'lim beradi.":"You will be taught by experienced and 7-point IELTS-winning teachers.",
      "O'quv markazimiz shahar markazida joylashgan.":"Our training center is located in the center of the city.",
      "Har yakshanba kuni qo'shimcha dars mutlaqo bepul bo'ladi.":"Every Sunday, the extra lesson will be completely free.",
      "Har yili ko'plab o'quvchilarimiz ajoyib natijalarga erishadi.":"Many of our readers achieve amazing results every year.",
      "IELTS balini qo'lga kiritishingiz bilan sizni ish bilan ta'minlaydi.":"THE fluffy, yellow hatchler will be used for grain, and the fluffy, yellow hatchler will be used for grain.",
      "Bizda IELTS kurslari ham mavjud.":"We also have IELTS courses.",
      "The Royal School o'quv markazini tanlang! Va yo'lingizdan adashmang.":"Choose The Royal School Learning Center! And do not stray from your path.",
      "Ingliz tili":"English",
      "Rus tili":"Russian",
      "Gʻulomova Odinaxon 22 yoshda. 3 oydan beri o'z ish faoliyatini olib bormoqda.":"Gulomova Odinaxon is 22 years old. He has been working for 3 months.",
      "Òlmasboyev Sanjar 20 yosh. 1 yildan beri ishlaydi. IELTS darajasi 7.":"Murod is 20 years old. Has been working for 1 year. IELTS Level 7.",
      "Elbek Dadajonov 1 yarim yildan beri ishlab kelmoqda. IELTS darajasi 6.5. 14 yoshi IELTS ballini qo'lga kiritgan.":"Elbek Dadaoev has been working for 1 and a half years. IELTS rate 6.5. He won the IELTS score at the age of 14.",
      "The Royal School o’quv markazi qayerda joylashgan?":"Where is The Royal School Learning Center located?",
      "Namangan viloyati Pop tumani Barkamol-Avlod binosi ichida mo'ljal Xalq Banki yonida":"Next to the People's Bank in the Barkamol-Avlod building in Pop County, In The Province of Badakhshan",
      "The Royal School o'quv markazi sizga nimalar bera oladi?":"What can The Royal School Learning Center give you?",
      "Siz kelajakdagi katta muvaffaqiyatlaringizga The Royal School ga qo'ygan kichk qadamlaringiz orqali erishishingiz mumkin!":"You can achieve your great future success through the little steps you've taken by The Royal School!",
      "The Royal School o'quv markazi sizni shunchaki o'qitishdan tashqari: Kelajakdagi maqsadlaringizni qo'yishingizga; buyuk insonlarday fikrlashingizga; va eng asosiysi 100,000 so'm pulni bilimga tikib uni 1,000,000 yoki  100,000,000 qilib chiqarishni ham o'rgatadi.":"The Royal School Learning Center will take you beyond just teaching: To set your future goals; to think like great people; And most importantly, it also teaches you how to sew 100,000 soums into knowledge and make it 1,000,000 or 100,000,000.",
      "The Royal School tanlovda adashmang!":"The Royal School does not go astray in selection!",
      "Matematika":"Mathematics",
      "Rus tili":"Russian",
      "Ingliz tili":"English",
      "The Royal School o'quv markazining qoidalari":"Rules of The Royal School",
      "The Royal School o'quv markazi asoschisi":"The Royal School founder of the training center",
		  "Dilnavoz Sharofidinova 5 oydan beri The Royal School o'quv markazida managerlik qilib kelmoqdalar.":"Dilnavoz Sharofidinova has been the manager of The Royal School training center for 5 months."
    }
  }; 
