const alertP = document.getElementById("divPassword");
const alertM = document.getElementById("divMail");
const correo = document.getElementById("ingresoMail");
const password = document.getElementById("ingresoPassword");
password.setAttribute("type", "password");
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    document.getElementById("botonSesion").addEventListener("click", function () {

        if (correo.value == "") {
            //Alerta borde rojo
            correo.classList.add("border_red");
            correo.addEventListener("click", function () {
                correo.classList.remove("border_red");
                alertM.innerHTML = "";
            })
            alertaTextoMail();
        }
        else if (password.value == "") {
            //Alerta borde rojo
            password.classList.add("border_red");
            password.addEventListener("click", function () {
                password.classList.remove("border_red");
                alertP.innerHTML = "";
            })
            alertaTextoPassword();
        } else if (ValidateEmail(correo)) {
            redirect();
            // Llamo función del usuario
            definoUsuario();
        }
    });
});


//-----------------Funciones-----------------------
function definoUsuario() {
    localStorage.setItem("usuario", correo.value);
};

function redirect() {
    location.replace("index.html");
};

function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail.value)) {
        return (true)
    }
    //Alerta borde rojo
    correo.classList.add("border_red");
    correo.addEventListener("click", function () {
        correo.classList.remove("border_red");
        alertM.innerText = "";
    })
    alertaTextoMail2();
    return (false)
}

function alertaTextoMail() {
    alertM.style.color = "red";
    alertM.style.textAlign = "left";
    alertM.style.fontSize = "11px";
    alertM.innerHTML = "Ingrese un correo.";
}

function alertaTextoPassword() {
    alertP.style.color = "red";
    alertP.style.textAlign = "left";
    alertP.style.fontSize = "11px";
    alertP.innerHTML = "Ingrese una contraseña.";
}

function alertaTextoMail2() {
    alertM.style.color = "red";
    alertM.style.textAlign = "left";
    alertM.style.fontSize = "11px";
    alertM.innerHTML = "Ingrese un correo válido.";
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
function signOut() {
    document.getElementById("signOutlink").addEventListener("click", function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    })

}