//const API = "http://localhost:4000/api";
const API = "https://shopping-cart-api.onrender.com/api";

document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Username & Password required");
        return;
    }

    try {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Login failed");
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);

        window.location.href = "items.html";
    } catch (error) {
        console.log("Login error:", error);
        alert("Something went wrong");
    }
});
