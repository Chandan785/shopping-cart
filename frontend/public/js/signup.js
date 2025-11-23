//const API = "http://localhost:4000/api";
const API = "https://backend-shopping-cart-c71k.onrender.com/api";

document.getElementById("signupBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Username & Password required");
        return;
    }

    try {
        const res = await fetch(`${API}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Signup failed");
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);

        window.location.href = "items.html";
    } catch (error) {
        console.log("Signup error:", error);
        alert("Something went wrong");
    }
});
