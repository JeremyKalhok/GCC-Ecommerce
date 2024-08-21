# GCC-Ecommerce
To demo the hosted website, visit [GCC 4 U](https://gcc-ecommerce.onrender.com)
> [!NOTE]
> The images and other product information must be retrieved from the database. If they are not displaying, please wait 30-40 seconds for them to load.

> [!CAUTION]
> User information is NOT ENCRYTPED in the database. If you want to Sign Up to test the cart, use a dummy password.

## Languages and Frameworks
### Front End
- React
- CSS

### Back End
- Express.js (used to create and manage endpoint access for adding and removing products from cart, and handling user logins and signups)
- Multer (used to store images in the server that were uploaded via admin webpage to add new products)
- JWT (stored in the webpage's localStorage to authenticate user logins and act as a flag for whether someone is currently logged in)
- MongoDB (used to store the products that are displayed on the website, and store user information (e.g. email, password, objects in cart))
- Node.js
