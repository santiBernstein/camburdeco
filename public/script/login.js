window.addEventListener("load", () => {
        
    let form = document.getElementById("form")
    let email = form.email
    let password = form.password
    let errors = {}
    
        form.addEventListener("submit", (e)=> {
            console.log(errors)
            if(Object.keys(errors).length > 0){
                e.preventDefault(); 
            }
        });
        email.addEventListener("keyup", ()=> {
            console.log(email)
            if (!validator.isEmail(email.value,)) {
                email.style.border = "2px solid red"
                errors[email]="email"
            } else {
                email.style.border = "0px solid white"
                delete errors[email]
            }
        });
        password.addEventListener("keyup", ()=> {
            if (password.value.length < 8 || password.value.length == 0) {
                password.style.border = "2px solid red"
                errors[password]="password"
            } else {
                password.style.border = "0px solid white"
                delete errors[password]
            }
        });
        
        
        
    })