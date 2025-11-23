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

document.getElementById("signupBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    document.getElementById("loader").style.display = "flex";

    try {
        const res = await fetch(`${API}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        document.getElementById("loader").style.display = "none";

        if (!res.ok) {
            alert(data.message || "Signup failed");
            return;
        }

        alert("Account Created!");
        window.location.href = "login.html";

    } catch (err) {
        document.getElementById("loader").style.display = "none";
        alert("Something went wrong");
    }
});
