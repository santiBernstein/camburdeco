window.addEventListener("load", () => {
        
    let form = document.getElementById("form")
    let name = form.name
    let email = form.email
    let password = form.password  
    let errors = {}  

    form.addEventListener("submit", (e)=> {
        if(Object.keys(errors).length > 0){
            e.preventDefault(); 
        }
         
        if (name.value.length < 6 || name.value.length == 0) {
             name.style.border = "2px solid red"
             errors[name]="name"
        } else {
            name.style.border = "0px solid white"
            delete errors[name] 
        }
        if (email.value.length < 4 || email.value.length == 0) {
            email.style.border = "2px solid red"
            errors[email]="email"
        } else {
            email.style.border = "0px solid white"
            delete errors[email]
        }
        if (password.value.length < 8 || password.value.length == 0) {
            password.style.border = "2px solid red"
            errors[password]="password"
        } else {
            password.style.border = "0px solid white"
            delete errors[password]
        }
    })
})