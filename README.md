# Propacity Assignment Backend (WIP)
## How to run locally
1. clone this repository using `git clone`
2. To install dependencies, run `npm install`
3. Create a .env file and add following environment variables: <br>
    `PORT` <br> `BCRYPT_SALTS` : Bcrypt salt rounds for password encryption <br> `JWT_KEY`: Serves as a key for jwt authentication <br> `DATABASE_URL` : Your postgreSQL database connection string
4. To start the server, run `node index.js`
## Endpoints
### Register User 
```
POST /api/user/register
{
    username: "username",
    email: "email",
    password: "password",
    type: "user" / "admin"
}
```
### Login user
```
POST/api/user/login
{
    email: "email",
    password: "password",
    type: "user" / "admin"
}
```

### Get all users
```
GET/api/user
```