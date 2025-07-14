// Array inicial de productos con más variedad
const productos = [
    {
        nombre: "Laptop Gamer",
        precio: 1400.99,
        descripcion: "Equipo de alto rendimiento con RTX 3080 y pantalla 144Hz."
    },
    {
        nombre: "Smartphone Samsung Galaxy S21",
        precio: 899.99,
        descripcion: "Cámara profesional de 108MP y batería de larga duración."
    },
    {
        nombre: "Auriculares Pioneer",
        precio: 249.99,
        descripcion: "Cancelación de ruido activa y sonido surround 7.1."
    },
    {
        nombre: "Smartwatch Xiomi",
        precio: 299.99,
        descripcion: "Monitoreo avanzado de salud y resistencia al agua."
    }
];

// Función para formatear precio
function formatearPrecio(precio) {
    return precio.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
}

// Función para renderizar productos
function renderizarProductos() {
    const listaProductos = document.getElementById('product-list');
    listaProductos.innerHTML = '';
    
    productos.forEach((producto, index) => {
        const itemProducto = document.createElement('li');
        itemProducto.className = 'product-item';
        itemProducto.innerHTML = `
            <div class="product-name">${producto.nombre}</div>
            <div class="product-price">${formatearPrecio(producto.precio)}</div>
            <div class="product-description">${producto.descripcion}</div>
        `;
        listaProductos.appendChild(itemProducto);
    });
}

// Función para generar producto aleatorio
function generarProductoAleatorio() {
    const nombres = ["Tablet", "Drone", "Consola", "Teclado", "Monitor", "Altavoz", "Cámara"];
    const adjetivos = ["Pro", "Elite", "Gamer", "4K", "Inalámbrico", "Inteligente", "Premium"];
    const descripciones = [
        "Tecnología de última generación.",
        "Diseño ergonómico y elegante.",
        "Alto rendimiento para uso profesional.",
        "Ideal para entusiastas de la tecnología.",
        "Garantía de 2 años incluida."
    ];
    
    return {
        nombre: `${nombres[Math.floor(Math.random() * nombres.length)]} ${adjetivos[Math.floor(Math.random() * adjetivos.length)]}`,
        precio: Math.floor(Math.random() * 2000) + 100,
        descripcion: descripciones[Math.floor(Math.random() * descripciones.length)]
    };
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    
    document.getElementById('add-product-btn').addEventListener('click', () => {
        productos.push(generarProductoAleatorio());
        renderizarProductos();
        
        // Efecto visual al agregar
        const productList = document.getElementById('product-list');
        productList.lastChild.style.animation = 'fadeIn 0.5s ease';
    });
});