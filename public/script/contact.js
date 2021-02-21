window.addEventListener("load", () => {
        
    let form = document.getElementById("form")
    let nombre = form.nombre
    let email = form.email
    let mensaje = form.mensaje
    let errors = {}
    
        form.addEventListener("submit", (e)=> {
            if(Object.keys(errors).length > 0){
                e.preventDefault(); 
            }
        });
        nombre.addEventListener("keyup", ()=> {
            if (nombre.value.length < 2 || nombre.value.length == 0) {
                nombre.style.border = "2px solid red"
                errors[nombre]="nombre"
            } else {
                nombre.style.border = "2px solid #ffdb00"
                delete errors[nombre]
            }
        });
        email.addEventListener("keyup", ()=> {
            if (!validator.isEmail(email.value,)) {
                email.style.border = "2px solid red"
                errors[email]="email"
            } else {
                email.style.border = "2px solid #ffdb00"
                delete errors[email]
            }
        });
        mensaje.addEventListener("keyup", ()=> {
            if (mensaje.value.length < 8 || mensaje.value.length == 0) {
                mensaje.style.border = "2px solid red"
                errors[mensaje]="mensaje"
            } else {
                mensaje.style.border = "2px solid #ffdb00"
                delete errors[mensaje]
            }
        });
        
        
        
    })