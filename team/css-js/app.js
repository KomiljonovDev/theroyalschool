const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');
const headerMenuRight = document.querySelector('.btnMenu');

menuBtn.onclick = () =>{
  menuBtn.classList.toggle('active');
  navigation.classList.toggle('active')
  headerMenuRight.classList.toggle('active')
}

highBtn.addEventListener('click', () =>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})