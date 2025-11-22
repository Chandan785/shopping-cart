const API = "http://localhost:4000/api";
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
});

document.getElementById("cartPageBtn").addEventListener("click", () => {
    window.location.href = "cart.html";
});

async function loadItems() {
    try {
        const res = await fetch(`${API}/items`);
        const items = await res.json();

        const container = document.getElementById("itemsContainer");
        container.innerHTML = "";

        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "item-card";
            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>₹ ${item.price}</p>
                <button onclick="addToCart('${item._id}')">Add to Cart</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Load items error:", error);
    }
}

async function addToCart(itemId) {
    try {
        const res = await fetch(`${API}/cart/add`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ itemId })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert("Item added to cart");
    } catch (err) {
        console.error("Add to cart error:", err);
    }
}

loadItems();
