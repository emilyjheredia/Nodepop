## Nodepop

# Load initial data to database:

```
npm run init-db
```

# Start the application in development with:

```sh
npm run dev
```

## API Documentation

# Product list:

GET api/products

```
{
      "results": [
      {
      "_id": "63b8c4b4059feb5de43ba64e",
      "name": "table",
      "sale": true,
      "price": 150,
      "photo": "table.png",
      "tags": [
      "work"
      ],
      "__v": 0
      },
      {
      "_id": "63b8c4b4059feb5de43ba64f",
      "name": "iphone 13 pro",
      "sale": false,
      "price": 950,
      "photo": "iphone13pro.png",
      "tags": [
      "mobile"
      ],
      "__v": 0
      },
      {
      "_id": "63b8c4b4059feb5de43ba650",
      "name": "car mini cooper",
      "sale": true,
      "price": 1000,
      "photo": "carminicooper.png",
      "tags": [
      "motor"
      ],
      "__v": 0
      },
      {
      "_id": "63b8c4b4059feb5de43ba651",
      "name": "chair",
      "sale": false,
      "price": 300,
      "photo": "chair.png",
      "tags": [
      "lifestyle"
      ],
      "__v": 0
   }
 ]
}

```

# Photos products:

GET /images/'name photo'

* http://localhost:3000/images/table.png
* http://localhost:3000/images/iphone13pro.png
* http://localhost:3000/images/carminicooper.png
* http://localhost:3000/images/chair.png

# Filters:

* Filter for name  http://localhost:3000/api/products?name=table
* Filter for price  http://localhost:3000/api/products?price=1000
* Filter for tag  http://localhost:3000/api/products?tags=mobile
* Filter for sale http://localhost:3000/api/products?sale=true
* Pagination http://localhost:3000/api/products?skip=1&limit=1
* Sort http://localhost:3000/api/products?sort=price
* Fields http://localhost:3000/api/products?fields=name

# Tags:

* http://localhost:3000/api/products/tags