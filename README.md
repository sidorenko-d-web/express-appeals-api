# Express Appeals API

This is REST API created for handling appeals

## Used technologies:
1. Node.js
2. Express
3. SQLite3
4. PrismaORM

## Endpoinds
1. **GET /appeals  gets all records if there are no body fields**  
    body_schema:
   
        date?: Date     if provived returns records created at exact date (other fields shouldn't be provided)
        date_range_start?: Date    if provived returns records created between ranges (should be used only with date_range_end)
        date_range_end?: Date
3. **POST /appeals**  
   body_schema:
   
        theme: string
        appeal_text: string
3. **POST /appeals**
5. **PATCH /appeals/:id/set-in-progress**
6. **PATCH /appeals/:id/set-finished**  
   body_schema:
   
        processed_text: string 
7. **PATCH /appeals/:id/set-declined**  
   body_schema:
   
        processed_text: string 
8. **PATCH /appeals/decline-all-in-progress**    
   body_schema:
   
        processed_text: string 

## How to start server

Step 1: Clone this repository  

Step 2: open console in directory of cloned repository

Step 3: Write down commands into console

    $ npm i
    $ npm run dev
    
Step 4: You will have an access to the API at ``http:localhost:3000``  
