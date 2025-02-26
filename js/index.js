let productosCache = [];

document.addEventListener("DOMContentLoaded", async () => {
    await cargarProductos();
    mostrarCarrito();
});

function cargarProductos() {
    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            productosCache = data;
            renderizarProductos(productosCache);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
}

function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
    `;
        contenedor.appendChild(card);
    });

    agregarEventosCarrito();
}

function agregarEventosCarrito() {
    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (e) => {
            agregarAlCarrito(e.target.getAttribute('data-id'));
        });
    });
}

// Modal del carrito
document.addEventListener("DOMContentLoaded", () => {
    const carritoBtn = document.getElementById("btn-carrito");
    const modal = document.getElementById("carrito-modal");
    const closeModal = document.querySelector(".close");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

    carritoBtn.addEventListener("click", () => {
        mostrarCarrito();
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    });
});
document.getElementById("ver-productos").addEventListener("click", () => {
    document.getElementById("contenedor-productos").scrollIntoView({ behavior: "smooth" });
});
