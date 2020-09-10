ORDER_ASC_BY_COST = "Min-Max";
ORDER_DESC_BY_COST = "Max-Min";
ORDER_BY_PROD_RELEVANCIA = "Relevancia";
var currentProductsArray = [];
var currentSortCriteriaProduct = undefined;
var minProducto = undefined;
var maxProducto = undefined;
var busquedaFiltro = document.getElementById("busqueda");
var contenidoFiltro = "";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // Redirecciono al login
    login();

    getJSONData(PRODUCTS_URL).then(function (resultProd) {
        if (resultProd.status === "ok") {
            sortAndShowProductos(ORDER_ASC_BY_COST, resultProd.data);
        }
    })

    //Ordenar por relevancia (cantidad de vendidos)
    document.getElementById("relevancia").addEventListener("click", function () {
        sortAndShowProductos(ORDER_BY_PROD_RELEVANCIA);
    });
    //Ordenar precio ascendente
    document.getElementById("precioAsc").addEventListener("click", function () {
        sortAndShowProductos(ORDER_ASC_BY_COST);
    });
    //Ordenar precio descendente
    document.getElementById("precioDesc").addEventListener("click", function () {
        sortAndShowProductos(ORDER_DESC_BY_COST);
    });

    //Limpiar filtros click-->Limpiar
    document.getElementById("rangoFiltroLimpiar").addEventListener("click", function () {
        document.getElementById("rangoFiltroProductoMin").value = "";
        document.getElementById("rangoFiltroProductoMax").value = "";

        minProducto = undefined;
        maxProducto = undefined;

        showListaProductos();
    });

    //Aplicar filtros click-->Filtrar
    document.getElementById("rangoFiltroProducto").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minProducto = document.getElementById("rangoFiltroProductoMin").value;
        maxProducto = document.getElementById("rangoFiltroProductoMax").value;

        if ((minProducto != undefined) && (minProducto != "") && (parseInt(minProducto)) >= 0) {
            minProducto = parseInt(minProducto);
        }
        else {
            minProducto = undefined;
        }

        if ((maxProducto != undefined) && (maxProducto != "") && (parseInt(maxProducto)) >= 0) {
            maxProducto = parseInt(maxProducto);
        }
        else {
            maxProducto = undefined;
        }

        showListaProductos();
    });

    // Filtro por busqueda
    busquedaFiltro.addEventListener("keyup", showListaProductos);

});

function ordenarProductos(criteria, array) {
    let resultProduct = [];
    if (criteria === ORDER_ASC_BY_COST) {
        resultProduct = array.sort(function (a, b) {

            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        resultProduct = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_RELEVANCIA) {
        resultProduct = array.sort(function (a, b) {
            let aRelev = parseInt(a.soldCount);
            let bRelev = parseInt(b.soldCount);

            if (aRelev > bRelev) { return -1; }
            if (aRelev < bRelev) { return 1; }
            return 0;
        });
    }

    return resultProduct;
};

function sortAndShowProductos(sortCriteria, categoriesArray) {
    currentSortCriteriaProduct = sortCriteria;

    if (categoriesArray != undefined) {
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = ordenarProductos(currentSortCriteriaProduct, currentProductsArray);

    //Muestro las categorías ordenadas
    showListaProductos();
};


function showListaProductos() {
    let htmlContenido = "";
    valorBusqueda = busquedaFiltro.value.toLowerCase();

    for (let i = 0; i < currentProductsArray.length; i++) {
        let producto = currentProductsArray[i];
        let productoNombre = producto.name.toLowerCase().indexOf(valorBusqueda);
        let productoDescription = producto.description.toLowerCase().indexOf(valorBusqueda);
        variableBusqueda = document.getElementById("busqueda").value.toLowerCase();
        console.log(variableBusqueda);

        if (((minProducto == undefined) || (minProducto != undefined && parseInt(producto.cost) >= minProducto)) &&
            ((maxProducto == undefined) || (maxProducto != undefined && parseInt(producto.cost) <= maxProducto)) &&
            (valorBusqueda == undefined || productoNombre > -1 || productoDescription > -1)) {

            // Acá iría el filtro de busqueda

            htmlContenido += `    
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name + `</h4>
                            <small class="text-muted">` + producto.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + producto.currency + `: ` + producto.cost + `</p>
                        <p class="mb-1">` + producto.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContenido;
    }

};
