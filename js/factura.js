// js/factura.js
document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carritoContainer');

});

function generarFactura() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ruta del logo actualizado
    const logoPath = "assets/images/logo1.png"; 

    const img = new Image();
    img.src = logoPath;
    img.onload = function () {
        // Agregar el logo alineado a la izquierda
        doc.addImage(img, "JPEG", 10, 10, 40, 40);

        // Título de la factura
        doc.setFontSize(22);
        doc.setTextColor(0, 0, 128);
        doc.text("FACTURA", 150, 20);

        // Información de la empresa
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("TechZone", 10, 55);
        doc.text("Calle Principal - ESCALON", 10, 62);
        doc.text("San Salvador , El salvador", 10, 69);
        doc.text("(503) ", 10, 76);
        doc.text("contacto@techzone.com", 10, 83);

        // Datos de la factura
        doc.setFillColor(0, 150, 136);
        doc.setTextColor(255, 255, 255);
        doc.rect(140, 30, 50, 8, "F");
        doc.text("N° FACTURA", 145, 35);
        doc.setTextColor(0, 0, 0);
        doc.text("100001", 150, 42);

        doc.setFillColor(0, 150, 136);
        doc.setTextColor(255, 255, 255);
        doc.rect(140, 48, 50, 8, "F");
        doc.text("FECHA", 155, 53);
        doc.setTextColor(0, 0, 0);
        doc.text(`${new Date().toLocaleDateString()}`, 150, 60);

        // Espaciado antes de la tabla
        let yPosition = 90;

        // Crear la tabla de productos con la nueva columna "Total"
        const tableData = window.miCarrito.items.map((item, index) => [
            index + 1,
            item.producto.nombre,
            item.cantidad,
            `$${item.producto.precio}`,
            `$${(item.cantidad * item.producto.precio).toFixed(2)}` // Cálculo del total por producto
        ]);

        if (doc.autoTable) {
            doc.autoTable({
                startY: yPosition,
                head: [["Ítem", "Descripción", "Cantidad", "Precio Unitario", "Total"]],
                body: tableData,
                theme: "grid",
                headStyles: { fillColor: [0, 150, 136], textColor: [255, 255, 255], fontSize: 12 },
                bodyStyles: { fontSize: 10 },
                alternateRowStyles: { fillColor: [245, 245, 245] },
                margin: { top: 10 }
            });

            // Obtener la posición después de la tabla
            const finalY = doc.lastAutoTable.finalY + 15;

            // Calcular la posición final de la página (cerca del pie de página)
            const pageHeight = doc.internal.pageSize.height;
            const footerY = pageHeight - 20; // 20px desde el borde inferior

            // Total de la compra alineado a la derecha
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text(`TOTAL: $${window.miCarrito.calcularTotal()}`, 140, finalY);

            // Mensaje de garantía **colocado hasta abajo de la factura**
            doc.setFontSize(10);
            doc.setTextColor(200, 0, 0);
            doc.setFont("helvetica", "italic");
            doc.text("Este producto tiene una garantía de 45 días por cualquier desperfecto.", 10, footerY);

            // Guardar el PDF
            doc.save("factura.pdf");

            // Vaciar el carrito después de la compra
            window.miCarrito.items = [];
            actualizarVistaCarrito();

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: 'La factura ha sido generada exitosamente.',
                confirmButtonText: 'Aceptar'
            });
        } else {
            console.error("autoTable no está definido. Verifica que la librería esté bien importada.");
        }
    };
}