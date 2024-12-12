const filamentos = [
    {
        id: 1,
        nombre: 'PLA',
        precio: 25000,
        colores: ['Rojo', 'Azul', 'Negro']
    },
    {
        id: 2,
        nombre: 'ABS',
        precio: 30000,
        colores: ['Blanco', 'Verde', 'Gris']
    },
    {
        id: 3,
        nombre: 'PETG',
        precio: 27000,
        colores: ['Amarillo', 'Negro', 'Transparente']
    },
    {
        id: 4,
        nombre: 'Resina',
        precio: 40000,
        colores: ['Blanco', 'Negro', 'Azul']
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const generarCardsFilamentos = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    filamentos.forEach(filamento => {
        const card = document.createElement('div');
        card.classList.add('filamento-card');

        card.innerHTML = `
            <h3>${filamento.nombre}</h3>
            <p>Precio: $${filamento.precio.toFixed(2)}</p>
            <p>Colores disponibles:</p>
            <div class="color-options">
                ${filamento.colores.map(color => `<button class="color-btn">${color}</button>`).join('')}
            </div>
            <button class="btn add-to-cart" data-id="${filamento.id}">Añadir al carrito</button>
        `;

        cartItemsContainer.appendChild(card);
    });
};

window.onload = () => {
    generarCardsFilamentos();
    actualizarCarrito();
};

const agregarAlCarrito = (id) => {
    const filamento = filamentos.find(item => item.id === id);
    if (filamento) {
        cart.push(filamento);
        localStorage.setItem('cart', JSON.stringify(cart));
        actualizarCarrito();
    }
};

const actualizarCarrito = () => {
    const cartTotal = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartTotal.textContent = "$0.00";
        return;
    }

    const total = cart.reduce((acc, item) => acc + item.precio, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
};

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart');
    actualizarCarrito();
    generarCardsFilamentos();
});

document.getElementById('checkout').addEventListener('click', () => {
    alert("Gracias por tu compra. El total será procesado.");
    cart = [];
    localStorage.removeItem('cart');
    actualizarCarrito();
});

document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        agregarAlCarrito(id);
    }
});
