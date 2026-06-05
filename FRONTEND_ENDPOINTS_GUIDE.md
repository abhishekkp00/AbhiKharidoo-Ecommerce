# Frontend Endpoints and Components Guide

## Overview
This document outlines the new update, delete, and search functionality added to the frontend. These components are ready to use and only need corresponding backend endpoints to be fully functional.

---

## API Endpoints (Updated in `src/api.js`)

### 1. **Update Product**
- **Function:** `updateProduct(id, formData)`
- **Method:** `PUT`
- **Endpoint:** `/product/{id}`
- **Description:** Updates an existing product with new details and optional image
- **Parameters:**
  - `id` (string): Product ID to update
  - `formData` (FormData): Multipart form data containing:
    - `product`: JSON object with product details
    - `imageFile`: Optional image file (can be empty)
- **Usage:**
  ```javascript
  import { updateProduct } from "../api";
  await updateProduct(productId, formData);
  ```

### 2. **Delete Product**
- **Function:** `deleteProduct(id)`
- **Method:** `DELETE`
- **Endpoint:** `/product/{id}`
- **Description:** Deletes a product by ID
- **Parameters:**
  - `id` (string): Product ID to delete
- **Usage:**
  ```javascript
  import { deleteProduct } from "../api";
  await deleteProduct(productId);
  ```

### 3. **Search Products**
- **Function:** `searchProducts(query)`
- **Method:** `GET`
- **Endpoint:** `/products/search?q={query}`
- **Description:** Searches for products by query string
- **Parameters:**
  - `query` (string): Search keyword (searches product name, brand, category, etc.)
- **Usage:**
  ```javascript
  import { searchProducts } from "../api";
  const results = await searchProducts("laptop");
  ```

---

## New Components

### 1. **UpdateProduct Component** (`src/components/UpdateProduct.jsx`)

**Purpose:** Allow users to edit existing product details

**Features:**
- Fetches current product details
- Form to update all product fields (name, brand, description, price, category, stock, release date)
- Option to change product image
- Validates input before submission
- Redirects to home page on successful update

**How to Use:**
1. Add route to your router configuration:
   ```javascript
   <Route path="/product/:id/update" element={<UpdateProduct />} />
   ```

2. Link from Product.jsx:
   ```javascript
   <Link to={`/product/${id}/update`} className="btn btn-warning">
     Update Product
   </Link>
   ```

**Backend Requirement:**
- Endpoint: `PUT /api/product/{id}`
- Accept multipart/form-data with:
  - `product`: JSON object (product details)
  - `imageFile`: Optional image file
- Return: Updated product object

---

### 2. **DeleteProduct Component** (`src/components/DeleteProduct.jsx`)

**Purpose:** Allow users to safely delete products with confirmation

**Features:**
- Shows product details before deletion
- Confirmation dialog with product information
- Prevents accidental deletion
- Provides Cancel option
- Redirects to home on successful deletion

**How to Use:**
1. Add route to your router configuration:
   ```javascript
   <Route path="/product/:id/delete" element={<DeleteProduct />} />
   ```

2. Link from Product.jsx:
   ```javascript
   <Link to={`/product/${id}/delete`} className="btn btn-danger">
     Delete Product
   </Link>
   ```

**Backend Requirement:**
- Endpoint: `DELETE /api/product/{id}`
- Return: Success message or HTTP 204 No Content

---

### 3. **SearchProducts Component** (`src/components/SearchProducts.jsx`)

**Purpose:** Provide a dedicated page for searching and filtering products

**Features:**
- Search bar with query input
- Real-time search with loading indicator
- Displays search results in card grid
- Shows total number of products found
- Includes Clear button to reset search
- Error handling for failed searches
- Fetches and displays product images

**How to Use:**
1. Add route to your router configuration:
   ```javascript
   <Route path="/search" element={<SearchProducts />} />
   ```

2. Link from Navbar.jsx:
   ```javascript
   <Link to="/search" className="nav-link">
     Search Products
   </Link>
   ```

**Backend Requirement:**
- Endpoint: `GET /api/products/search?q={query}`
- Parameter: `q` (query string for search)
- Return: Array of matching products
- Suggested search criteria:
  - Product name (case-insensitive)
  - Brand
  - Category
  - Description

---

## Integration Steps

### Step 1: Update Router Configuration
Add the new routes to your main routing file (likely `App.jsx` or a router config):

```javascript
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import SearchProducts from "./components/SearchProducts";

// In your Routes component:
<Route path="/product/:id/update" element={<UpdateProduct />} />
<Route path="/product/:id/delete" element={<DeleteProduct />} />
<Route path="/search" element={<SearchProducts />} />
```

### Step 2: Update Product.jsx
Add update and delete buttons to the Product detail page. Uncomment or add these links:

```javascript
<Link to={`/product/${id}/update`} className="btn btn-warning">
  Update Product
</Link>
<Link to={`/product/${id}/delete`} className="btn btn-danger">
  Delete Product
</Link>
```

### Step 3: Update Navbar.jsx
Add a link to the search page:

```javascript
<Link to="/search" className="nav-link">
  Search Products
</Link>
```

### Step 4: Update AddProduct.jsx (Optional)
The AddProduct component can be updated to use the new API function:

```javascript
import { createProduct } from "../api";

// In submitHandler:
try {
  const response = await createProduct(formData);
  alert("Product added successfully");
} catch (error) {
  alert("Error adding product");
}
```

---

## Backend Endpoints to Implement

Create these endpoints in your backend:

| Method | Endpoint | Description | Required |
|--------|----------|-------------|----------|
| PUT | `/api/product/{id}` | Update product | Yes |
| DELETE | `/api/product/{id}` | Delete product | Yes |
| GET | `/api/products/search?q={query}` | Search products | Yes |

### Example Backend Structure

**UpdateProduct Endpoint:**
- Accept: `multipart/form-data`
- Body params: `product` (JSON), `imageFile` (optional)
- Response: Updated product object

**DeleteProduct Endpoint:**
- Accept: URL parameter (product ID)
- Response: 204 No Content or success message

**SearchProducts Endpoint:**
- Accept: Query parameter `q`
- Response: Array of matching products

---

## Testing Checklist

- [ ] Update button works and shows UpdateProduct component
- [ ] Can modify product fields and submit
- [ ] Image can be changed or skipped
- [ ] Product updates correctly in database
- [ ] Delete button shows confirmation
- [ ] Deletion removes product from system
- [ ] Search accepts user input
- [ ] Search results display correctly
- [ ] Images load for search results
- [ ] Empty search shows appropriate message
- [ ] All navigation links work properly

---

## Notes

- All components use the centralized API configuration from `src/api.js`
- Error handling is implemented in all components
- Loading states are shown during API calls
- Components include navigation back to home page
- Search results fetch product images automatically
- Update component allows optional image replacement
