//const API = "http://localhost:4000/api";
const API = "https://backend-shopping-cart-c71k.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "items.html";
});

document.getElementById("checkoutBtn").addEventListener("click", checkoutOrder);

async function loadCart() {
    try {
        const res = await fetch(`${API}/cart/my`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const cart = await res.json();

        const container = document.getElementById("cartContainer");
        container.innerHTML = "";

        if (!cart.items || cart.items.length === 0) {
            container.innerHTML = "<h3>Your cart is empty</h3>";
            return;
        }

        cart.items.forEach(ci => {
            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <h3>${ci.item.name}</h3>
                <p>Price: ₹ ${ci.item.price}</p>
                <p>Qty: ${ci.quantity}</p>
                <button onclick="removeItem('${ci.item._id}')">Remove</button>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Load cart error:", err);
    }
}

async function removeItem(itemId) {
    try {
        const res = await fetch(`${API}/cart/remove/${itemId}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + token }
        });

        loadCart();
    } catch (err) {
        console.error("Remove item error:", err);
    }
}

async function checkoutOrder() {
    try {
        const res = await fetch(`${API}/order/checkout`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert("Order placed successfully!");
        window.location.href = "items.html";
    } catch (err) {
        console.error("Checkout error:", err);
    }
}

loadCart();
