document.addEventListener("DOMContentLoaded", function () {
    // DOM Load Event Start
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.52 },
        { id: 3, name: "Product 3", price: 55.5 },
        { id: 4, name: "Product 4", price: 99.99 },
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCart = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    products.forEach((product) => {
        const productItemDiv = document.createElement("div");
        productItemDiv.classList.add("product");
        productItemDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button id="add-to-cart" data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productItemDiv);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.id === "add-to-cart") {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(
                (product) => product.id === productId
            );
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";

        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCart.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((product, index) => {
                totalPrice += product.price;
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                cartItemDiv.innerHTML = `
                <span>${product.name} - $${product.price.toFixed(2)}</span>
                `;

                cartItems.appendChild(cartItemDiv);
                totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
            });
        } else {
            emptyCart.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
        }
    }

    checkoutBtn.addEventListener("click", () => {
        cart.length = 0;
        renderCart();
        alert("Thank you for your purchase!");
    });

    // DOM Load Event End
});
