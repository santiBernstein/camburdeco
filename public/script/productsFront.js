window.addEventListener("load", function() {

    let form = document.getElementById("form");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let img = document.getElementById("img");

   
    let errors = {};

    form.addEventListener("submit", (e)=> {
        e.preventDefault(); 
        
    });

    
    function cleanErrors(errorsKey, element) {
        
        delete errors[errorsKey];
        
        element.classList.remove('is-error');
    }

    function setErrors(key, msg, element){
        errors[key] = msg;
        element.classList.add('is-error');
    }

    
    name.addEventListener("keyup", ()=> {
        cleanErrors('name', name);

        if(!validator.isAlpha(name.value) || !validator.isLength(name.value, {min:3, max:50})) {
            setErrors('name', 'El campo name debe tener al menos 3 caracteres', name);
        }
    });

    description.addEventListener("keyup", ()=> {
        cleanErrors('description', description);

        if(!validator.isLength(description.value, {min:20})) {
            setErrors('description', 'El campo description debe tener al menos 3 caracteres.', description);
            
        }
    });

    img.addEventListener("change", ()=> {
        let pathStringToArray = img.value.split('.');
        let ext = pathStringToArray[pathStringToArray.length-1];
    
        cleanErrors('img', img);

        if(!validator.contains(ext, ['jpg','jpeg','png','gif'])) {

            setErrors('img', 'El archivo no posee un formato valido.', img);

          
        }
    });

})