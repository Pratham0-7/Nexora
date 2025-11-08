## Nexora – Full-Stack Shopping Cart App

### Overview

A complete full-stack shopping cart application built as part of the **Vibe Commerce screening test**.
It demonstrates a full e-commerce flow: products grid, cart management, and mock checkout — fully integrated between frontend, backend, and database.

### Tech Stack

**Frontend:** React (Vite) + Tailwind CSS
**Backend:** Node.js + Express
**Database:** MongoDB Atlas
**APIs:** REST (Express routes)
**Deployment:** Local (run backend + frontend separately)

---

###  Setup & Run Instructions

#### Backend

```bash
cd backend
npm install
npm run dev
```

- Runs on: **[http://localhost:4000](http://localhost:4000)**
- Make sure `.env` contains your MongoDB Atlas connection string:

  ```
  MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/<dbname>
  PORT=4000
  ```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Runs on: **[http://localhost:5173](http://localhost:5173)**
- Backend URL is already set to `http://localhost:4000`

---

### API Endpoints

| Method | Endpoint        | Description                      |
| ------ | --------------- | -------------------------------- |
| GET    | `/products`     | Get list of mock products        |
| POST   | `/cart`         | Add `{ productId, qty }` to cart |
| GET    | `/cart`         | Retrieve cart + total            |
| POST   | `/cart/:id/qty` | Update item quantity             |
| DELETE | `/cart/:id`     | Remove item                      |
| POST   | `/checkout`     | Mock checkout → returns receipt  |

---

### Features

 5 Mock Products (with Unsplash images)
 Add / Remove / Update items in Cart
 Live total calculation
 Checkout form (name + email)
 Receipt modal with total & timestamp
 Responsive grid (Flipkart-style layout)
 Clean dark UI (Tailwind)

---

### Screenshots

- Product Grid
- Cart Drawer
- Checkout Modal

### Demo

🎥 **Watch the demo video:**
👉 https://www.loom.com/share/e74f9dd4275b4d0d977b562f6d24669c


### Repository

🧾 **GitHub Repo:**
[https://github.com/Pratham0-7/nexora](https://github.com/yourusername/nexora)

Once you’ve pasted this:

1. `git add .`
2. `git commit -m "final submission readme and setup"`
3. `git push origin main`
4. record your demo and add the link.
