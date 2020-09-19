ORDER_ASC_SCORE = "ASC";
ORDER_DESC_SCORE = "DES";
ORDER_BY_FECHA = "Fecha";
var productInfo = {};
var comentariosArray = [];
var currentSortCriteriaComentario = undefined;
var productosRelacionados = [];
var productos = {};
var objetoComentarios = {};
var scoreNew = 0;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // Redirecciono al login
    login();
    // Información del producto
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;

            let productNameHTML = document.getElementById("titulo");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostoHTML = document.getElementById("productCosto");
            let productCantidadHTML = document.getElementById("cantidadVendidos");
            let productCategory = document.getElementById("productoCategoria");
            let productRelation = document.getElementById("relacionados");

            productNameHTML.innerHTML = productInfo.name;
            productDescriptionHTML.innerHTML = productInfo.description;
            productCostoHTML.innerHTML = productInfo.currency + ' ' + productInfo.cost;
            productCantidadHTML.innerHTML = productInfo.soldCount;
            productCategory.innerHTML = productInfo.category;
            productosRelacionados = productInfo.relatedProducts;
            //Muestro las imagenes en forma de galería
            showImagesGalleryProduct(productInfo.images);
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            let htmlRelacion = "";
            productos = resultado.data;

            for (let j = 0; j < productosRelacionados.length; j++) {
                let producto = productos[productosRelacionados[j]];
                htmlRelacion += `
                <div class="col">
                    <h4 class="mb-1 text-center">`+ producto.name + `</h4>
                    <h6 class="mb-1 text-center">`+ producto.currency + ` ` + producto.cost + `</h6>
                    <a href="product-info.html"><img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail"></a>
                </div>
                `
            }
            document.getElementById("relacionados").innerHTML = htmlRelacion;
        }
    });

    // Comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultComentarios) {
        if (resultComentarios.status === "ok") {

            sortAndShowComentarios(ORDER_DESC_SCORE, resultComentarios.data);
            objetoComentarios = resultComentarios.data;
            console.log(objetoComentarios);
        };
    });
    //Ordenar comentarios ascendente
    document.getElementById("minScore").addEventListener("click", function () {
        sortAndShowComentarios(ORDER_ASC_SCORE);
    });
    //Ordenar comentarios descendente
    document.getElementById("maxScore").addEventListener("click", function () {
        sortAndShowComentarios(ORDER_DESC_SCORE);
    });
    //Ordenar comentarios descendente
    document.getElementById("fecha").addEventListener("click", function () {
        sortAndShowComentarios(ORDER_BY_FECHA);
    });
    // Enviar comentario
    document.getElementById("enviarComentario").addEventListener("click", enviarComentario);
    // Obtengo el valor del score para el nuevo comentario
    document.getElementById("radio1").addEventListener("click", function () {
        scoreNew = document.getElementById("radio1").value;
    });
    document.getElementById("radio2").addEventListener("click", function () {
        scoreNew = document.getElementById("radio2").value;
    });
    document.getElementById("radio3").addEventListener("click", function () {
        scoreNew = document.getElementById("radio3").value;
    });
    document.getElementById("radio4").addEventListener("click", function () {
        scoreNew = document.getElementById("radio4").value;
    });
    document.getElementById("radio5").addEventListener("click", function () {
        scoreNew = document.getElementById("radio5").value;
    });
});


// Funciones
function ordenarComentarios(criteria, array) {
    let resultProduct = [];
    if (criteria === ORDER_ASC_SCORE) {
        resultProduct = array.sort(function (a, b) {
            if (a.score < b.score) { return -1; }
            if (a.score > b.score) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_SCORE) {
        resultProduct = array.sort(function (a, b) {
            if (a.score > b.score) { return -1; }
            if (a.score < b.score) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_FECHA) {
        resultProduct = array.sort(function (a, b) {
            let aRelev = a.dateTime;
            let bRelev = b.dateTime;

            if (aRelev > bRelev) { return -1; }
            if (aRelev < bRelev) { return 1; }
            return 0;
        });
    }
    return resultProduct;
};

function contenidoComentarios() {
    let htmlProductContent = "";
    for (let i = 0; i < comentariosArray.length; i++) {
        let comentario = comentariosArray[i];
        let score = comentario.score;
        var star = '<span class="fa fa-star checked"></span>';
        var nostar = '<span class="fa fa-star"></span>';

        htmlProductContent += `    
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">`+ comentario.user + `</h5>
                    <small class="text-muted">Fecha de publicación: ` + comentario.dateTime + `</small>
                </div>
                <div>
                    <em>
                    `+ star.repeat(comentario.score) + nostar.repeat(5-comentario.score) +`
                    </em>
                </div>
                <p class="mb-1">` + comentario.description + `</p>
            </div>
        </div>
        <hr>
    `
        document.getElementById("cat-list-container").innerHTML = htmlProductContent;
    };
};

function sortAndShowComentarios(sortCriteria, arrayGral) {
    currentSortCriteriaComentario = sortCriteria;
    if (arrayGral != undefined) {
        comentariosArray = arrayGral;
    }
    comentariosArray = ordenarComentarios(currentSortCriteriaComentario, comentariosArray);
    contenidoComentarios();
};

function showImagesGalleryProduct(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="` + imageSrc + `" class="d-block w-100">
        </div>
        `
        document.getElementById("productImagesGalleryInfo").innerHTML = htmlContentToAppend;
    }
    let activo = document.getElementById("productImagesGalleryInfo").getElementsByTagName("div")[0];
    activo.classList.add('active');
};

function enviarComentario() {
    var comentarioNew = document.getElementById("subject").value; // Comentario nuevo
    var usuarioNew = contieneUsuario;
    var fechaNew = hoyFecha();

    objetoComentarios.push({
        score: scoreNew,
        user: usuarioNew,
        description: comentarioNew,
        dateTime: fechaNew,
    });
    sortAndShowComentarios(ORDER_DESC_SCORE, objetoComentarios);
};

// Definir fecha del comentario
function hoyFecha() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    var hour = hoy.getHours();
    var min = hoy.getMinutes();
    var sec = hoy.getSeconds();

    dd = addZero(dd);
    mm = addZero(mm);

    return yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + min + ':' + sec;
};

// Definir fecha del comentario
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
};
