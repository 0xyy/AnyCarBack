
# 🚀 AnyCar - backend v0.1 
# demo - https://www.anycar.networkmanager.pl/


## The main idea of the application is a portal with various car ads. Also, this project is written to gain experience in different technologies.





## 🛠 Technologies used in this project:
- TypeScript
- NodeJS
- Express.js
- MySQL

## 🛠 Packages used in this project:
- express-fileupload
- cors
- mysql2
- uuid
- express-async-errors
- ts-jest




## 🛠 Main API Reference

#### Get cars with the given phrase

```http
  GET /api/car/search/:adName?
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `adName` | `string` | Search cars with the given phrase (if the phrase is empty, all cars are returned)|

#### Get a car with the given id

```http
  GET /api/car/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Search for a car with the given id |

#### Create a car

```http
  POST /api/car
```




### 👋 Project is currently in progess and may be expanded in the future.

## Authors

- [@0xyy](https://github.com/0xyy)

