window.addEventListener("load", () => {
        
    let form = document.getElementById("form")
    let name = form.name
    let apellido = form.apellido
    let dni = form.dni
    let domicilio = form.domicilio
    let localidad = form.localidad
    let pais = form.pais
    let errors = {}

    form.addEventListener("submit", (e)=> {
        console.log(errors)
        if(Object.keys(errors).length > 0){
            e.preventDefault(); 
        }
    });
    name.addEventListener("keyup", ()=> {
        if (name.value.length < 4 || name.value.length == 0) {
            name.style.border = "2px solid red"
            errors[name]="name"
        } else {
            name.style.border = "0px solid white"
            delete errors[name]
        }
    });
    apellido.addEventListener("keyup", ()=> {
        if (apellido.value.length < 8 || apellido.value.length == 0) {
            apellido.style.border = "2px solid red"
            errors[apellido]="apellido"
        } else {
            apellido.style.border = "0px solid white"
            delete errors[apellido]
        }
    });
    dni.addEventListener("keyup", ()=> {
        if (dni.value.length < 8 || dni.value.length == 0) {
            dni.style.border = "2px solid red"
            errors[dni]="dni"
        } else {
            dni.style.border = "0px solid white"
            delete errors[dni]
        }
    });
    domicilio.addEventListener("keyup", ()=> {
        if (domicilio.value.length < 8 || domicilio.value.length == 0) {
            domicilio.style.border = "2px solid red"
            errors[domicilio]="domicilio"
        } else {
            domicilio.style.border = "0px solid white"
            delete errors[domicilio]
        }
    });
    localidad.addEventListener("keyup", ()=> {
        if (localidad.value.length < 8 || localidad.value.length == 0) {
            localidad.style.border = "2px solid red"
            errors[localidad]="localidad"
        } else {
            localidad.style.border = "0px solid white"
            delete errors[localidad]
        }
    });
    pais.addEventListener("keyup", ()=> {
        if (pais.value.length < 8 || pais.value.length == 0) {
            pais.style.border = "2px solid red"
            errors[pais]="pais"
        } else {
            pais.style.border = "0px solid white"
            delete errors[pais]
        }
    });
    
     

})