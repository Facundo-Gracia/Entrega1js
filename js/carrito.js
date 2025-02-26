// Cargar el carrito desde localStorage o inicializarlo como un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar el contador del carrito en la interfaz
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        // Sumar la cantidad total de productos en el carrito
        contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }
}

// Mostrar el carrito en el modal
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    // Verificar que los elementos existan en el DOM antes de manipularlos
    if (!listaCarrito || !totalCarrito) {
        console.error("❌ Elementos del carrito no encontrados en el DOM.");
        return;
    }

    // Limpiar el contenido previo del carrito antes de actualizarlo
    listaCarrito.innerHTML = "";
    let total = 0;

    // Recorrer el carrito y mostrar cada producto en la lista
    carrito.forEach((producto) => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${producto.nombre} - $${producto.precio} x${producto.cantidad}
            <button class="eliminar-item" data-id="${producto.id}">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    // Mostrar el total de la compra en el modal
    totalCarrito.innerText = total;

    // Agregar eventos a los botones de eliminar producto
    document.querySelectorAll(".eliminar-item").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            eliminarDelCarrito(e.target.dataset.id);
        });
    });

    // Actualizar el contador del carrito
    actualizarContadorCarrito(); 
    console.log("🔄 Carrito actualizado:", carrito);
}

// Agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productosCache.find((p) => p.id == id);
    if (!producto) return; // Si el producto no se encuentra, salir de la función

    const itemEnCarrito = carrito.find((p) => p.id == id);

    if (itemEnCarrito) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        itemEnCarrito.cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Guardar cambios en localStorage, actualizar contador y mostrar carrito
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();

    // Notificación de producto añadido con SweetAlert
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto añadido al carrito 🛒',
        showConfirmButton: false,
        timer: 500
    });
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter((producto) => producto.id != id);
    guardarCarrito();
    mostrarCarrito();
    actualizarContadorCarrito(); 
}

// Vaciar todo el carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = []; // Vaciar el array del carrito
    guardarCarrito();
    mostrarCarrito();
    actualizarContadorCarrito(); 
});

// Evento para finalizar la compra
document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrito.length === 0) {
        // Si el carrito está vacío, mostrar una alerta
        Swal.fire({
            title: "Carrito vacío",
            text: "Agrega productos antes de finalizar la compra",
            icon: "warning",
        });
        return;
    }

    // Mensaje de compra exitosa
    Swal.fire({
        title: "¡Compra realizada!",
        text: "Gracias por tu compra. Te enviaremos un email con los detalles.",
        icon: "success",
    });

    // Vaciar carrito después de la compra
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContadorCarrito(); 
});

// Al cargar la página, mostrar el carrito y actualizar el contador
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    actualizarContadorCarrito();
});
