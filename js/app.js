//app.js

document.addEventListener('DOMContentLoaded', () => {
    //Se cargan los productos desde JSON
    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            window.productos = data;
            generarCards();
            actualizarVistaCarrito();
        })
        .catch(error => console.error("Error al cargar los productos:", error));
})

function agregarAlCarrito(idProducto) {
    const producto = window.productos.find(prod => prod.id === idProducto);
    if (producto && producto.cantidad > 0) {
        window.miCarrito.agregarProducto(producto, 1);
        generarCards();
        actualizarVistaCarrito();
    }
    else {
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
        Precio Unitario: $${item.producto.precio}
        <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${item.producto.id})">Eliminar</button>
        `;
        carritoContainer.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = "mt-3";
    totalDiv.innerHTML = `<h5>Total: $${window.miCarrito.calcularTotal()}</h5>`;
    carritoContainer.appendChild(totalDiv);
}

function eliminarDelCarrito(idProducto) {
    window.miCarrito.eliminarProducto(idProducto);
    generarCards();
    actualizarVistaCarrito();
}