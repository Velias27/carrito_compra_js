// js/factura.js
document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carritoContainer');
    
    // Crear botón de generar factura si el carrito no está vacío
    if (window.miCarrito.items.length > 0) {
        const btnFactura = document.createElement("button");
        btnFactura.className = "btn btn-success mt-3";
        btnFactura.innerHTML = '<i class="fas fa-file-pdf"></i> Generar Factura';
        btnFactura.onclick = generarFactura;
        carritoContainer.appendChild(btnFactura);
    }
});

function generarFactura() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Factura de Compra", 70, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 20);
    doc.text("Detalles de la compra:", 10, 30);

    let y = 40; // Posición inicial en el PDF

    window.miCarrito.items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.producto.nombre}`, 10, y);
        doc.text(`Cantidad: ${item.cantidad}`, 60, y);
        doc.text(`Precio: $${item.producto.precio}`, 100, y);
        y += 10;
    });

    doc.text(`Total: $${window.miCarrito.calcularTotal()}`, 10, y + 10);
    
    doc.save("factura.pdf");
}