// js/carrito.js

class Carrito {
    constructor() {
        this.items = [];
    }

    agregarProducto(producto, cantidad) {
        const itemExistente = this.items.find(item => item.producto.id === producto.id);
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.items.push({ producto, cantidad });
        }
        // Descontar del stock la cantidad agregada
        producto.cantidad -= cantidad;
    }

    eliminarProducto(productoId) {
        const itemAEliminar = this.items.find(item => item.producto.id === productoId);
        if (itemAEliminar) {
            // Restaurar el stock al eliminar del carrito
            itemAEliminar.producto.cantidad += itemAEliminar.cantidad;
        }
        this.items = this.items.filter(item => item.producto.id !== productoId);
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }
}

window.miCarrito = new Carrito();