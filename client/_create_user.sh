#!/usr/bin/env bash
# creer un utilisateur administrateur par defaut

curl -X POST http://localhost:3030/users/register \
    -H "Content-Type: application/json" \
    -d '{ 
        "email" : "admin@gmail.com", 
        "password" : "admin" ,
        "username": "admin",
        "role": "admin"
    }'