// app.js

document.addEventListener('DOMContentLoaded', () => {
    // Se cargan los productos desde JSON
    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            window.productos = data;
            generarCards();
            actualizarVistaCarrito();
        })
        .catch(error => console.error("Error al cargar los productos:", error));
});

function agregarAlCarrito(idProducto, cantidad) {
    const producto = window.productos.find(prod => prod.id === idProducto);
    if (producto && producto.cantidad > 0) {
        window.miCarrito.agregarProducto(producto, cantidad);
        generarCards();
        actualizarVistaCarrito();
    } else {
        alert("Producto no disponible");
    }
}

function actualizarVistaCarrito() {
    const carritoContainer = document.getElementById('carritoContainer');
    carritoContainer.innerHTML = "";

    if (window.miCarrito.items.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    window.miCarrito.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'mb-2 p-2 border rounded';
        itemDiv.innerHTML = `
        <strong>${item.producto.nombre}</strong><br>
        Cantidad: ${item.cantidad}<br>
        Precio Unitario: $${item.producto.precio}<br>
        Subtotal: $${item.cantidad * item.producto.precio}<br>
        <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${item.producto.id})"><i class="fas fa-trash"></i></button>
        `;
        carritoContainer.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = "mt-3";
    totalDiv.innerHTML = `<h5>Total: $${window.miCarrito.calcularTotal()}</h5>`;
    carritoContainer.appendChild(totalDiv);

    // Botón de factura
    const btnFactura = document.createElement("button");
    btnFactura.className = "btn btn-success mt-3";
    btnFactura.innerHTML = '<i class="fas fa-file-pdf"></i> Generar Factura';
    btnFactura.onclick = generarFactura;
    carritoContainer.appendChild(btnFactura);
}

function eliminarDelCarrito(idProducto) {
    window.miCarrito.eliminarProducto(idProducto);
    generarCards();
    actualizarVistaCarrito();
}

// GENERAR PDF para la compra
function generarFactura() {

    //Validacion para la generacion del pdf
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("ERROR , PROBLEMAS PARA LA GENERACION DE PDF , Favor contactarse con los administradores");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Factura de Compra", 70, 20);
    doc.setFontSize(12);
    const fechaActual = new Date();
    //Damos formato correcto a la fecha
    const fechaFormateada = `${fechaActual.getDate().toString().padStart(2, '0')}/${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}/${fechaActual.getFullYear()}`;
    doc.text(`Fecha: ${fechaFormateada}`, 10, 50);
    doc.text("Detalles de la compra:", 10, 60);

    // Crear tabla con autoTable
    const tableData = window.miCarrito.items.map((item, index) => [
        index + 1,
        item.producto.nombre,
        item.producto.descripcion,
        item.cantidad,
        `$${item.producto.precio}`,
        `$${(item.cantidad * item.producto.precio)}`
    ]);

    //Informacion de la compra y estilos de la tabla
    if (doc.autoTable) {
        doc.autoTable({
            startY: 70,
            head: [["#", "Producto", "Detalle", "Cantidad", "Precio", "Subtotal"]],
            body: tableData,
            theme: "grid",
            headStyles: { fillColor: [0, 150, 136], textColor: [255, 255, 255], fontSize: 12 },
            bodyStyles: { fontSize: 10 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            margin: { top: 10 }
        });

        //Total de la compra 
        doc.setFontSize(14);
        doc.text(`Total: $${window.miCarrito.calcularTotal()}`, 10, doc.lastAutoTable.finalY + 10);

        //Ventana temporal para abrir pdf en navegador
        const pdfBlob = doc.output("bloburl");
        const nuevaVentana = window.open(pdfBlob, "_blank");
        //Al cargar, mostramos opcion de imprimir automaticamente
        if (nuevaVentana) {
            nuevaVentana.onload = function () {
                nuevaVentana.print();
            };
        }
    } else {
        console.error("AutoTable no está definido. Verifica que la librería esté bien importada.");
    }
}