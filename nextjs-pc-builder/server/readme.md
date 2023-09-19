# Cow Hut Backend Assignment

This is the backend assignment repository for the Cow Hut web application.

GitHub Repository: [https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-Ujjalzaman](https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-Ujjalzaman)

Live Link: [https://digital-cow-hut-backend-ujjalzaman.vercel.app/](https://digital-cow-hut-backend-ujjalzaman.vercel.app/)

## Application Routes

### User Authentication

- User Login: `POST /api/v1/users/login`
- Admin Refresh Token: `POST /api/v1/users/refresh-token`

### Admin

- Create Admin: `POST /api/v1/admins/create-admin`
- Login Admin: `POST /api/v1/admins/login`
- Admin Refresh Token: `POST /api/v1/admin/admin-refresh-token`

### User

- Signup: `POST /api/v1/users/signup`  (Buyer and seller only can create account)
- Get All Users: `GET /api/v1/users` (Admin can get All the users)
- Get Single User: `GET /api/v1/users/6177a5b87d32123f08d2f5d4` (Include an ID that is saved in your database)
- Update User: `PATCH /api/v1/users/6177a5b87d32123f08d2f5d4` (Include an ID that is saved in your database)
- Delete User: `DELETE /api/v1/users/6177a5b87d32123f08d2f5d4` (Include an ID that is saved in your database)

### Cows

- Create Cow: `POST /api/v1/cows` (Can Acces - Seller)
- Get All Cows: `GET /api/v1/cows` (Can Acces - Admin, Buyer, Seller)
- Get Single Cow: `GET /api/v1/cows/6177a5b87d32123f08d2f5d4` (Include an ID that is saved in your database) (Can Acces - Seller)
- Update Cow: `PATCH /api/v1/cows/6177a5b87d32123f08d2f5d4` (Include an ID that is saved in your database) (Can Acces -  Seller)
- Delete Cow: `DELETE /api/v1/cows/6177a5b87d32123f08d2f5d4` (Include an ID that is saved in your database) (Can Acces -  Seller)

### Pagination and Filtering routes of Cows

- Get Cows with Pagination: `GET /api/v1/cows?pag=1&limit=10`
- Get Cows Sorted by Price in Ascending Order: `GET /api/v1/cows?sortBy=price&sortOrder=asc`
- Get Cows within a Price Range: `GET /api/v1/cows?minPrice=20000&maxPrice=70000`
- Get Cows by Location: `GET /api/v1/cows?location=Chattogram`
- Search Cows by Term: `GET /api/v1/cows?searchTerm=Cha`

### Orders

- Create Order: `POST /api/v1/orders` (Can Acces - Buyer)
- Get All Orders: `GET /api/v1/orders` (Can Acces - Buyer)
- Get Single Order: `GET /api/v1/orders/:id` (Can Acces - Admin, Buyer, Seller)
- Delete Order: `DELETE /api/v1/orders/:id` (Can Acces - Admin, Buyer)
- Update Order: `PATCH /api/v1/orders/:id` (Can Acces - Admin, Buyer)