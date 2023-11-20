# Authentication App

This is a NestJS-based application that provides user authentication functionalities using JWT (JSON Web Tokens) and interacts with MongoDB through Mongoose. The app includes CRUD operations for user management, allowing the creation, retrieval, and update of user information.

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [Docker](https://www.docker.com/) (for containerization)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/gonzalogil23/authentication-app.git
   cd authentication-app

   ```

2. **Install Dependencies**

```bash
npm install

```

3. **Environment Variables**
   Create a .env file in the root of the project and define the necessary environment variables. Here it is a sample .env file:

```env
JWT_SECRET=secretkey
MONGODB_URI=mongodb://mongodb/users-authentication

```

4. **Dockerize MongoDB:**

```bash
docker-compose up -d
```

5. **Run the aplication:**

```bash
npm run start
```

The application will be accessible at http://localhost:3000

### Postman Collection

- [Api JSON](https://api.postman.com/collections/19522659-fbc4e67b-a49f-453c-8b8f-ce1177e80739?access_key=PMAT-01HFPRS0E1NG94JYM27V77QQJG)

- **Endpoints**

1. Sign Up - Creates an User

```http
POST /auth/signup
```

2. Sign In - Return access token

```http
POST /auth/signin
```

3. Create User

```http
POST /users
```

4. Get Users

```http
GET /users
```

5. Get User by Id

```http
GET /users/:id
```

6. Update User

```http
PATCH /users/:id
```

7. Remove User

```http
DELETE /users/:id
```

### Authentication and JWT:

- The application uses JWT for user authentication. When a user is created or logs in, a JWT is generated and returned.
- Include the JWT in the Authorization header for authenticated requests: Authorization: Bearer YOUR_JWT_TOKEN.
