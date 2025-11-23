# 🛒 Shopping Cart Web Application                                            
A full-stack Shopping Cart system built using Node.js, Express, MongoDB (Mongoose) for the backend and HTML, CSS, JavaScript for the frontend.
Users can browse items, add/remove products to their cart, and place orders using secure JWT-based authentication.

## 🚀 Live Demo
**Frontend:**                                           
https://shopping-cart-1-ol2v.onrender.com

**Backend:**                                      
https://backend-shopping-cart-c71k.onrender.com                                             

### 📌 Features
● User Signup & Login (JWT Authentication)                                               
● Products Listing                                                           
● Add to Cart / Remove from Cart                                                               
● View User Cart                                                              
● Order Checkout                                                                                                              
● Secure REST APIs                                                                     
● MongoDB Atlas Integration                                                              
● Fully deployed frontend & backend on Render                                              

### Tech Stack                                 
**Frontend**

● HTML5                                                                          
● CSS3                                                              
● JavaScript                                                                           
● Fetch API                                                                         

**Backend**

● Node.js                                                                 
● Express.js                                                                     
● MongoDB (Mongoose)                                                                            
● JWT Authentication                                                                          
● Render Deployment                                                                           

### 📂 Project Structure

shopping-cart/                                                                                     
│                                                                                     
├── backend/                                                                                                         
│   ├── server.js                                                                                         
│   ├── .env                                                                                                  
│   ├── package.json                                                                                             
│   │   └── db.js                                                                   
│   ├── models/                                                           
│   │   ├── User.js                                                                
│   │   ├── Item.js                                               
│   │   └── Cart.js                                                                                                                                                                   
|   |   └── Order.js                                                                                          
│   ├── routes/                                                         
│   │   ├── auth.js                                                                                      
│   │   ├── item.js                                                                                             
│   │   ├── cart.js                                                                                                                                                           
│   │   └── order.js                                                                        
│   └── middleware/                                                           
│       └── auth.js                                                                            
│
├── frontend/                                                                                                
|   ├── public/                                                                                                      
│   |   ├── index.html                                                                                                        
│   |   ├── login.html                                                                                             
│   |   ├── signup.html                                                                                                                                   
│   |   ├── cart.html                                                                                                 
|   |   ├── Items.html                                                                                               
│   |   ├── css/                                                                                                 
│   |   ├── js/                                                                                                                        
│   |   └── assets/

### 🔗 API Endpoints

**Auth Routes**

| Method | Endpoint           | Description           | Auth |
| ------ | ------------------ | --------------------- | ---- |
| POST   | `/api/auth/signup` | Register a new user   | ❌    |
| POST   | `/api/auth/login`  | Login and receive JWT | ❌    |

**Item Routes**

| Method | Endpoint     | Description     | Auth |
| ------ | ------------ | --------------- | ---- |
| GET    | `/api/items` | Fetch all items | ✅    |

**Cart Routes**

| Method | Endpoint               | Description                 | Auth |
| ------ | ---------------------- | --------------------------- | ---- |
| GET    | `/api/cart/my`         | Get user cart               | ✅    |
| POST   | `/api/cart/add`        | Add item to cart            | ✅    |
| DELETE | `/api/cart/remove/:id` | Remove item from cart by ID | ✅    |

**Order Routes**

| Method | Endpoint              | Description        | Auth |
| ------ | --------------------- | ------------------ | ---- |
| POST   | `/api/order/checkout` | Finalize the order | ✅    |

### ⚙️ Environment Variables                    
```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=4000
```

### 🏃‍♂️ Installation & Run Locally

**Backend Setup**

```
cd backend
npm install
npm start
```
**Frontend Setup**

Just open index.html in the browser (or host with any static server).

### 📦 Deployment

● Backend deployed using Render Node Server.                                                                        
● Frontend deployed using Render Static Hosting.
 
 ## 📸 Screenshots

### 🏠 Home Page
<img src="https://raw.githubusercontent.com/Chandan785/shopping-cart/3306e2769b6ceea0a1d34f0181d20328f40d2d74/home%20page.png" width="800">

---

### 📝 Signup Page
<img src="https://raw.githubusercontent.com/Chandan785/shopping-cart/3306e2769b6ceea0a1d34f0181d20328f40d2d74/signup.png" width="800">

---

### 🔐 Login Page
<img src="https://raw.githubusercontent.com/Chandan785/shopping-cart/3306e2769b6ceea0a1d34f0181d20328f40d2d74/login.png" width="800">

---

### 📦 Items Page
<img src="https://raw.githubusercontent.com/Chandan785/shopping-cart/3306e2769b6ceea0a1d34f0181d20328f40d2d74/items.png" width="800">

---

### 🛒 Cart Page
<img src="https://raw.githubusercontent.com/Chandan785/shopping-cart/3306e2769b6ceea0a1d34f0181d20328f40d2d74/card.png" width="800">

---

### 💳 Checkout Popup
<img src="https://raw.githubusercontent.com/Chandan785/shopping-cart/3306e2769b6ceea0a1d34f0181d20328f40d2d74/cheackout.png" width="800">
