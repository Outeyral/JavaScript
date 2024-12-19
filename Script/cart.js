
//Item cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const getProducts = async ()=> {
    const response = await fetch("../JSON/data.json");
    const data = await response.json();
    console.log(data)
};


// Actualizar la vista del carrito
function updateCartView() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var cartList = document.getElementById("cart-items");
    var count = document.getElementById("cart-count");

    cartList.innerHTML = "";
    for (var i = 0; i < cart.length; i++) {
        var product = cart[i];
        var list = document.createElement("li");
        list.textContent = product.name + " - $" + product.price;
        cartList.appendChild(list);
    }
        count.textContent = `(${cart.reduce((sum, item) => sum + item.quantity, 0)})`;

    // Mostrar total
    const totalElement = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Agregar al carrito
function addToCart(event) {
    var product = {
        id: event.target.getAttribute("data-id"),
        name: event.target.getAttribute("data-name"),
        price: event.target.getAttribute("data-price")
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product)

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartView();
}

// Eliminar del carrito
function removeFromCart(index) {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(function (product) {
        return product.id !== index;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartView();
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartView();

    // Agregar event listeners para botones de ejemplo
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(name, price);
        });
    });
});

 // Mostrar/ocultar carrito flotante
 function toggleCart() {
    const cartBody = document.querySelector('.cart-body');
    cartBody.style.display = cartBody.style.display === 'none' || cartBody.style.display === '' ? 'block' : 'none';
}