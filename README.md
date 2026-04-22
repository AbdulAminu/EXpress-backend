to run the code, you start the server using node --watch src/index.js
first of all, you need to have postman and if you dont have, you can download it from https://www.postman.com/downloads/
selet JSON in the drop-down then to test in the postman try localhost:3000/sign-up to sign up, fill in the necessary details for ex,
{
"name":"Abdulrasheed",
"email": "abdulrasheed@gamil.com",
"password":"Abfg123#$"
}
This is a a POST request 
to login, use localhost:3000/Login and u should see "Login sucessfull, welcome back 😁" this is a POST request
you can also logout localhost:3000/logout, and this time its a GET request 
to delete an account, you try localhost:3000/delete-user/id, the "id" will be replaced by the actual id, and you can get the id after signing up, so the link would look like this "localhost:3000/delete-user/69e889e1445bc3d5da278961" and note that this would be a DELETE request
