let forms = document.querySelector('.form'),
	login = document.querySelector('.login'),
	password = document.querySelector('.pass'),
	errorText = document.querySelector('.errorText');

const statusMsg = {
	loading: "Loading",
	success: "Successfully",
	failure: "Something went wrong."
}

forms.addEventListener('submit', (e) => {
	e.preventDefault();
	let request = new XMLHttpRequest();
	request.open("POST", `../api/v1/index.php?do=adminlogin&login=${login.value}&password=${password.value}`, true);
	const formData = new FormData(forms);
	request.send(formData);
	request.addEventListener('load', () => {
		if(request.status === 200){
			data = request.response;
			obj = JSON.parse(data);
			if (obj.code === 200) {
				if (obj.ok === true) {
					log = obj.result[0].login;
					pass = obj.result[0].admin_password;
					localStorage.setItem("admin_unique_id", obj.result[0].admin_unique_id);
					if(password.value == pass){;
						errorText.innerHTML = "<p style='color:green'>Login ma'lumotlari tekshirilimoqda...</p>";
						setTimeout(function success(){
							errorText.innerHTML = "";
							window.location.href = './';
						}, 3000);
						login.value = "";
						password.value = "";
						
					}else{
						errorText.innerHTML = "<p style='color:red'>Parol yoki login xato!</p>";
						setTimeout(function error(){
							errorText.innerHTML = "";
						}, 3000);
						login.value = "";
						password.value = "";
					}
				}else{
					errorText.innerHTML = "<p style='color:red'>Parol yoki login xato!</p>";
					setTimeout(function error(){
						errorText.innerHTML = "";
					}, 3000);
					login.value = "";
					password.value = "";
				}
			}else{
					errorText.innerHTML = `<p style='color:red'>${obj.message}</p>`;
					setTimeout(function error(){
						errorText.innerHTML = "";
					}, 3000);
					login.value = "";
					password.value = "";
				}
		}
	})
})