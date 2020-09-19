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
  var divUsr = document.createElement("div");
  divUsr.classList.add('dropdown');

  var buttonUser = document.createElement("button");
  buttonUser.classList.add('btn','btn-primary','dropdown-toggle');
  buttonUser.setAttribute("type","button");
  buttonUser.setAttribute("id","dropdownMenuButton");
  buttonUser.setAttribute("data-toggle","dropdown");
  buttonUser.setAttribute("aria-haspopup","true");
  buttonUser.setAttribute("aria-expanded","false");

  var contenido = document.createTextNode(contieneUsuario + ' ');
  buttonUser.appendChild(contenido);
  
  var divDesplegable = document.createElement("div");
  divDesplegable.classList.add('dropdown-menu');
  divDesplegable.setAttribute("aria-labelledby","dropdownMenuButton");

  var aMenu1 = document.createElement("a");
  aMenu1.classList.add('dropdown-item');
  aMenu1.setAttribute("href","cart.html");
  aMenu1.innerHTML = "Mi Carrito";

  var aMenu2 = document.createElement("a");
  aMenu2.classList.add('dropdown-item');
  aMenu2.setAttribute("href","my-profile.html");
  aMenu2.innerHTML = "Mi Perfil";

  var aMenu3 = document.createElement("a");
  aMenu3.classList.add('dropdown-item');
  aMenu3.setAttribute("href","login.html");
  aMenu3.setAttribute("id","resetearUser");
  aMenu3.innerHTML = "Cerrar Sesión";
  
  var insertar = document.getElementsByTagName("nav")[0].getElementsByTagName("div")[0];
  insertar.appendChild(divUsr);

  divUsr.appendChild(buttonUser);
  divDesplegable.appendChild(aMenu1);
  divDesplegable.appendChild(aMenu2);
  divDesplegable.appendChild(aMenu3);
  divUsr.appendChild(divDesplegable);

  document.getElementById("resetearUser").addEventListener("click",resetUser);
});

// Funcion para cerrar sesion
function resetUser(){
  localStorage.removeItem("usuario");
}

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
