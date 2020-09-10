const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
// Variable que toma el usuario
var user1 = localStorage.getItem("usuario");
var contieneUsuario = "";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  // Quito @... del usuario para imprimir

  limpioUser();
  
  // Creación de elmento div donde va el usuario
  var usr = document.createElement("a");
  var contenido = document.createTextNode(contieneUsuario + ' ');
  usr.appendChild(contenido);
  var insertar = document.getElementsByTagName("nav")[0].getElementsByTagName("div")[0];
  insertar.appendChild(usr);

  // Añado las clases y estilos al nuevo div
  usr.classList.add('btn', 'btn-primary');
  usr.setAttribute("href", "my-profile.html");
  usr.setAttribute("role", "button");

  // Creo nodo script para cargar el icono de FontAwesome
  var nuevoScript = document.createElement("script");
  nuevoScript.setAttribute("src", "https://kit.fontawesome.com/ef7b22a168.js");
  nuevoScript.setAttribute("crossorigin", "anonymous");
  document.head.appendChild(nuevoScript);

  // Creo nodo dentro del "a" donde va la imagen
  var nuevoLogo = document.createElement("i");
  nuevoLogo.setAttribute("class", "fas fa-user-circle");
  var insertarLogo = document.getElementsByTagName("nav")[0].getElementsByTagName("div")[0].getElementsByTagName("a")[5];
  insertarLogo.appendChild(nuevoLogo);
});

// Funcion para redirigir hasta que se loge correctamente
function login() {
  if (user1 == null) {
    location.replace("login.html");
  }
}

function limpioUser(){
  
  for (i = 0; i < user1.indexOf("@"); i++) {
    contieneUsuario += user1[i];
  }
  contieneUsuario = contieneUsuario.toUpperCase();
}
