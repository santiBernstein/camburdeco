window.addEventListener("load", function(){

    let form = document.getElementById("form")
    let name = document.getElementById("name")
    let description = document.getElementById("description")
    let img = document.getElementById("img")


form.addEventListener("submit", function(e){

    e.preventDefault()

    if(description.value.length < 20){
        description.style.borderColor = "red"
    }else{
        description.style.borderColor = "white"

    }
  })

})