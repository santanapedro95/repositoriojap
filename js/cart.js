var carritoInfo = {};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // Redirecciono al login
    login();

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultCart) {
        if (resultCart.status === "ok") {
            carritoInfo = resultCart.data.articles;
            let htmlCart = "";
            let costUnidad = 0;
            for (let i = 0; i < carritoInfo.length; i++) {
                let articuloCompra = carritoInfo[i];
                if (articuloCompra.currency === "USD") {
                    costUnidad = articuloCompra.unitCost * 42;
                }
                else {
                    costUnidad = articuloCompra.unitCost;
                }
                htmlCart += `
                <tr>
                    <td style="width:140px;"><img src="` + articuloCompra.src + `" alt="" width="40%;" hight="40%;"></td>
                    <td>` + articuloCompra.name + `</td>
                    <td><input cost="` + articuloCompra.unitCost + `" curr="` + articuloCompra.currency + `" class="inpute" size="4" id="input` + [i] + `" type="number" value="` + articuloCompra.count + `" min="1" class="btn"></td>
                    <td>` + articuloCompra.currency + `: ` + articuloCompra.unitCost + `</td>
                    <td class="spanito"><span class="spane">` + costUnidad * articuloCompra.count + `</span></td>
                </tr>
                `
            }
            document.getElementById("cantidadFilas").innerHTML = htmlCart;
        }
        total();
    })
});

$('table').on('change', 'input', function () {
    
    valor1 = $(this).val();
    valor2 = $(this).attr('cost');
    spanCambio = $(this).closest('tr').children('td.spanito').children('span');

    if ($(this).attr("curr") === "USD") {
        spanCambio.text((valor1 * valor2) * 42);
    } else {
        spanCambio.text(valor1 * valor2);
    }
    total();
});

function total(){
    var total = 0;
    arregloSpan = $('.spane');
    arregloSpan.each(function() {
        total += parseInt($(this).text());
    });
    $('#totalFinal').text("UYU: " + total);
    $('#precioFinal').text("UYU: " + total);
}


