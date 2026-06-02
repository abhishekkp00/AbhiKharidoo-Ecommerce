# AbhiKharidoo E-Commerce Platform

A full-stack e-commerce application built with **React** (Frontend) and **Spring Boot** (Backend). Shop for products with a modern, responsive UI backed by a robust REST API.

## 📋 Project Structure

```
AbhiKharidoo-Ecommerce/
├── Frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── AddProduct.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CheckoutPopup.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Product.jsx
│   │   ├── context/            # React context for state management
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api.js
│   │   ├── axios.jsx           # Axios configuration
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── Backend/
    └── AbhiKharidoo/           # Spring Boot application
        ├── src/main/
        │   ├── java/com/abhi/AbhiKharidoo/
        │   │   ├── controllers/
        │   │   │   ├── HelloController.java
        │   │   │   └── ProductController.java
        │   │   ├── models/
        │   │   │   └── Product.java
        │   │   ├── repo/
        │   │   │   └── ProductRepo.java
        │   │   ├── service/
        │   │   │   └── ProductService.java
        │   │   └── AbhiKharidooApplication.java
        │   └── resources/
        │       └── application.properties
        ├── pom.xml
        └── mvnw
```

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.2** - Build tool and dev server
- **Axios 1.6** - HTTP client
- **React Bootstrap 2.10** - UI components
- **React Router 6.23** - Navigation
- **Sass** - CSS preprocessing

### Backend
- **Spring Boot 4.0.6** - Java framework
- **Java 21** - Programming language
- **PostgreSQL** - Database
- **Lombok** - Code generation
- **Maven** - Build tool

## 🚀 Getting Started

### Prerequisites

**Frontend:**
- Node.js (v14 or higher)
- npm or yarn

**Backend:**
- Java 21 (JDK)
- Maven 3.6+
- PostgreSQL 12+

### Installation & Running

#### Frontend Setup

1. Navigate to the Frontend folder:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

#### Backend Setup

1. Navigate to the Backend folder:
```bash
cd Backend/AbhiKharidoo
```

2. Configure the database in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/abhikharidoo
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
```

3. Build and run the application:
```bash
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:8080`

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
./mvnw clean package
```

## ✨ Features

- 🛍️ **Product Browsing** - Browse and view product details
- 🛒 **Shopping Cart** - Add/remove products from cart
- 💳 **Checkout** - Complete purchase flow
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔄 **Real-time Updates** - Live cart and inventory updates
- 🎨 **Modern UI/UX** - Clean and intuitive interface
- ⚡ **Fast Performance** - Optimized with Vite and Spring Boot

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/{id}` | Fetch product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements. Please ensure your code follows the existing style conventions.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

[Abhishek Prajapati](https://github.com/abhishekkp00)

---

**Last Updated:** June 2026
