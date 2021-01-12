window.addEventListener("load", () => {
            console.log("llegamos")
     let form = document.getElementById("form")
     let password = document.querySelector("input#password.ingreso")
    password.addEventListener("keyup", ()=> {

    })
    
    

     form.addEventListener("submit", (e)=> {
        
         e.preventDefault();
         console.log("llego")
         let password = document.getElementsByName("password")
         console.log(password.value)
         console.log(password)
         console.log(password.ingreso)
         if (password.value.length < 8 || password.value.length == 0) {
             password.style.border = "red"
         }


     })
    


})