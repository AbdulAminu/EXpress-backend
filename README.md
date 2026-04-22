# Getting started  
You will need postman, if you dont have it, you can download it here - https://www.postman.com/downloads/  
after setting your postman up, selet JSON in the drop-down  

# Running the Server
To run the server, use:  
node --watch src/index.js in your VScode terminal

# SIGN-UP  
To Sign-up in the postman try localhost:3000/sign-up to sign up and fill in the necesary details, here is the format below  
{  
"name":"Abdulrasheed",  
"email": "abdulrasheed@gamil.com",   
"password":"Abfg123#$"   
}  
NB: This is a a POST request  

# LOGIN  
To login, use localhost:3000/Login and you should see a message that says "Login sucessfull, welcome back 😁"  
{  
"email": "abdulrasheed@gamil.com",   
"password":"Abfg123#$"   
}  
This is a POST request  

# Logout 
you can also logout localhost:3000/logout, and this time its a GET request

# DELETING AN ACCOUNT
To delete an account, you use localhost:3000/delete-user/id, the "id" will be replaced by the actual id of the user, and you can get the id after signing up, so the link would look like this  
"localhost:3000/delete-user/69e889e1445bc3d5da278961"   
And note that this would be a DELETE request

# FETCHING A USER'S DATA
You can do this by using localhost:3000/user/id, the "id" will be replaced by the actual id of the user, and you can get the id after signing up, so the link would look like this    
"localhost:3000/user/69e889e1445bc3d5da278961"   
And this is a GET request

# FETCHING ALL USER'S DATA
You can do this by using localhost:3000/Users, this would fetch the existing users and their details  
And this is also a GET request

# one last message
you can also make use of my live link  
https://e-xpress-backend.vercel.app/Login for example, in the postman also just like the localhost, the server must be running for all these to work
