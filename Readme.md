# Access-Key Manager for Micro Focus

- Project by MAKUTU
- Tech Stack used : Nodejs Express and MongoDb
- deployed link https://access-key-o07p.onrender.com

## Routes

- all routes have middleware for authorization except for user routes

#### User routes

1. A token is generated upon login to access other routes

- header :{ "x-auth-token": TOKEN_HERE }

```
    POST : /user/register                {email, password}

    POST : /user/login                   {email, password}

    POST : /user/reset-password/request  {email}

    POST : /user/reset-password/confirm  {new_password}

    GET  : /user/verify-email

```

#### Admin Routes

- for all Get request set header first to be authorized
- header : { "x-auth-token" : TOKEN }
- TOKEN is generated on login

```
    POST : /admin/login                 {email, password}

    GET  : /admin/keys

    GET  : /admin/key/:id/revoke

    GET  : /admin/key/status?email=EMAIL_HERE

```

#### Key Routes

- for all key routes set Header first
- header : { "x-auth-tokn" : YOUR_TOKEN }

```
    GET : /user/get-key

    GET : /user/keys
```
