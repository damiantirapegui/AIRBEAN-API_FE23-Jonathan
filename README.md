# Airbean - Gruppuppgift_node_basgrupp1

### Created by Dylan, Eric, Jonathan, Marina, Shahin, Sofia

Link to document: https://docs.google.com/document/d/1pOovep_lnmzYjM1koyztNiJIAB_XBALulh1j2V3UMoo/edit

### The description of the task:

In this group work, you will create an API for the web app Airbean where you can order coffee and have it delivered via drone (drones are not included in the task). ATTENTION! You do not need to do any frontend, only the backend is your task.

### Follow these steps to run the project:

**1. Clone git-repo**

- Open your terminal/console and run this command git clone <repo-url>

**2. Navigate to project:**

- Run the command: cd <project folder>

**3. Install dependencies:**

- Run the npm install command to install all necessary dependencies needed.

**4. Start server:**

- Use nodemon . command to run the server || npm run dev.

**5. Start your api application and use the urls below to test the project**

### Base url:

http://localhost:8000/api/

### Menu:

http://localhost:8000/api/company/menu  
Method: GET

### Company info:

http://localhost:8000/api/company/companyInfo  
Method: GET

### Create order:

http://localhost:8000/api/order/createOrder  
Method: POST

Add query params Key: userID and the Value: {userId} when creating the order as a registered user.

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

Example of JSON structure for creating several orders:

```json
[
  {
    "id": 1,
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  },
  {
    "id": 2,
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  }
]
```

Will give the user the response: "Your order id: 000."

### Send order:

http://localhost:8000/api/order/sendOrder/:orderID
Method: POST

To complete your order use sendOrder with your order id. Order will be sent to completedOrder.db. You can then see order history and order status.

### Get cart:

http://localhost:8000/api/order/getCart/:orderId
Method: GET

When you create an order in CreateOrder you’ll receive an orderId. Copy that orderId and paste it at the end of the URL. For example, if you receive a response of orderID 349 then paste it like this. http://localhost:8000/api/order/getCart/349

### Add item cart:

http://localhost:8000/api/order/addItemCart/:orderId  
Method: PUT

If you want to add something in your cart then you can use this method.
Almost like you did in getCart you’ll have to paste your orderID at the end of the URL.
In the body tab in insomnia/postman. Take note that it’s very important that you choose something from the menu.js file otherwise you’ll receive: error: "Items must match menu". Go to: Vs Code >> services >> menu.js to see the menu list or make a get request: http://localhost:8000/api/company/menu

### Delete item:

http://localhost:8000/api/order/deleteItem/:orderID?itemId=<ProductID>  
Method: DELETE

Go to the "Parameters" tab (in Postman or Insomnia).
Add query params key: itemID and the value: {itemId} when deleting an item from the order.
Order confirmation:
http://localhost:8000/api/order/orderConfirmation/:orderID
Method: GET
\*Must be done after calling sendOrder.

### Create user:

http://localhost:8000/api/users/signup  
Method: POST

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

Example of JSON structure for creating users:

```json
{
  "username": "user",
  "password": "test123"
}
```

Will give the user this response:

```json
{
  "message": "User created.",
  "user": {
    "id": "randomlyGeneratedNumbersAndLetters987",
    "username": "user"
  }
}
```

\*You will need the ID to create orders as a user and to retrieve your order history.

### Login user:

http://localhost:8000/api/users/login  
Method: POST

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

Example of JSON structure for logging in users:

```json
{
  "username": "user",
  "password": "test123"
}
```

Will give the user this response:

```json
{
  "message": "Login successful. Logged in user: user. Id: “randomlyGeneratedNumbersAndLetters987"
}
```

\*You will need the ID to create orders as a user and to retrieve your order history.

### Logout user:

http://localhost:8000/api/users/logout  
Method: POST

### Order history for registered users:

http://localhost:8000/api/order/orderHistory/:userID  
Method: GET

Will give the user this response:

```json
{
"orderHistory": [
{
"orderId": "000",
"estDelivery": "11:28",
"newOrder": [
{
"id": 1,
"title": "Bryggkaffe",
"desc": "Bryggd på månadens bönor.",
"price": 39
}
],
"userId": "randomlyGeneratedNumbersAndLetters987",
"_id": "randomlyGeneratedNumber"
}
]
}
********************************************************************************************************
This section is for the admin and promotion manual

As an admin, you have access to create new products for the menu, remove and change. In order to have access to these functions, you therefore need to be logged in. More instructions on how to log in will come a little further on in this section. In addition to this, the admin can also create campaign offers that are stored in a separate database called promotion.db. In the admin database I have stored a user that is controlled by the api when you try to login. All new products that are created or changed are stored in the database company.db where you will find all products

please feel free to test this awesome api and have fun 🙂

Allright, first step is to log in.
Log in admin:
http://localhost:8000/api/users/login-admin
Method: POST
Go to the "Parameters" tab (in Postman or Insomnia).
Add this in the json body tab:
{
    "username": "admin123",
    "password": "test123"
}

You’ll receive a message back saying:
{
    "message": "Login successful. Logged in admin: admin123. Id: 1laVXMT2oMCZ2rlt."
}


Once you are logged you can start having fun.
The instructions below are just examples for what you can write in the body tab. In other words it’s a boiler plate but you can add your own menus.



Add product to the menu:
http://localhost:8000/api/menu/add-product
Method: POST
Go to the "Parameters" tab (in Postman or Insomnia).
Add this in the json body tab:
{
  "id": 8,
  "title": "Espresso",
  "desc": "A strong and intense coffee shot.",
  "price": 49.99
}
To double check if the product went to the menu you can go to:
Menu:
http://localhost:8000/api/company/menu
Method: GET


Change added och existing product:
http://localhost:8000/api/menu/update-product/8
Method: PUT
Go to the "Parameters" tab (in Postman or Insomnia).
Add this in the json body tab:
{
  "_id": 8,
  "title": "Updated Product Title",
  "desc": "Updated description of the product",
  "price": 109.99
}
JSON respond:
{
    "message": "Product updated successfully",
    "product": {
        "_id": 8,
        "title": "Updated Product Title",
        "desc": "Updated description of the product",
        "price": 109.99,
        "createdAt": "2024-06-11T10:13:34.566Z",
        "modifiedAt": "2024-06-11T10:14:17.798Z"
    }
}

Change added och existing product:
http://localhost:8000/api/menu/delete-product/8  ←- change id:8 if you want to delete other product.
Method: DELETE

Then press send.

Add promotion:
http://localhost:8000/api/promotion/add-promotion
Method: POST
Go to the "Parameters" tab (in Postman or Insomnia).
Add this in the json body tab:
{
    "_id": 1,
    "price": 40,
    "products": ["Bryggkaffe", "Gustav Adolfsbakelse"]
}

Get promotions:
http://localhost:8000/api/promotion/add-promotion
Method: POST
Go to the "Parameters" tab (in Postman or Insomnia).
For this function you can use it as a guest. Admin not required.

```
