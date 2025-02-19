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
        Swal.fire({
            icon: 'error',
            title: 'TechZone',
            text: 'Producto no disponible.',
        });
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
        <div class="d-flex align-items-center my-4 gap-2">
        <button class="btn btn-sm btnDecrementar ms-1" onclick="decrementarProducto(${item.producto.id})">
        <i class="fas fa-minus"></i>
        </button>
        <span>${item.cantidad}</span>
        <button class="btn btn-sm btnIncrementar ms-1" onclick="incrementarProducto(${item.producto.id})">
        <i class="fas fa-plus"></i>
        </button>
        <button class="btn btn-sm btnEliminar ms-2" onclick="eliminarDelCarrito(${item.producto.id})">
        <i class="fas fa-trash"></i>
        </button>
        </div>
        <strong><small>Precio Unitario: </strong>$${item.producto.precio}</small><br>
        <strong><small>Subtotal: </strong>$${(item.cantidad * item.producto.precio).toFixed(2)}</small>
        `;
        carritoContainer.appendChild(itemDiv);
    });

    // Agregar el total
    const totalDiv = document.createElement('div');
    totalDiv.className = "mt-3";
    totalDiv.innerHTML = `<h5>Total: $${window.miCarrito.calcularTotal().toFixed(2)}</h5>`;
    carritoContainer.appendChild(totalDiv);

    // Asegurar que el botón de generar factura solo aparece si hay productos
    if (window.miCarrito.items.length > 0) {
        const btnFactura = document.createElement("button");
        btnFactura.className = "btn btn-success mt-3";
        btnFactura.innerHTML = '<i class="fas fa-file-pdf"></i> Generar Factura';
        btnFactura.onclick = generarFactura;
        carritoContainer.appendChild(btnFactura);
    }
}

function eliminarDelCarrito(idProducto) {
    window.miCarrito.eliminarProducto(idProducto);
    generarCards();
    actualizarVistaCarrito();
}

function incrementarProducto(productoId) {
    //Se busca el producto
    const producto = window.productos.find(prod => prod.id === productoId);

    //Se verifica si hay stock disponible
    if (producto && producto.cantidad > 0) {
        window.miCarrito.agregarProducto(producto, 1);

        //Se actualiza la vista
        generarCards();
        actualizarVistaCarrito();
    }
    else {
        alert("No hay suficiente stock disponible");
    }
}

function decrementarProducto(productoId) {
    //Se busca el producto
    const item = window.miCarrito.items.find(item => item.producto.id === productoId);
    if (item) {
        if (item.cantidad > 1) {
            item.cantidad--;
            item.producto.cantidad++;
        }
        else {
            //Si hay 1, se remueve del carrito
            window.miCarrito.eliminarProducto(productoId);
        }

        generarCards();
        actualizarVistaCarrito();
    }
}
