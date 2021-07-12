POST /web/transaction.json --> to create an entity

{
    "id: 100"
    "username": "baz",
    "description": "paper",
    "amount": 20,
    "participants": [
        "foo",
        "baz"
    ],
    "date": "2021-07-01T00:00:00.000Z",
    "image": "https://www.villaggionatura.com/shop/modules/ph_simpleblog/covers/28.jpg"
}


-------

GET /web/transaction.json

{
    ... comunication between frontend and backend
}

imput --> [id:100, id:101]
output -->
[
    {
    "id": "100",
    "username": "baz",
    "description": "paper",
    "amount": 20,
    "participants": [
      "foo",
      "baz"
    ],
    "date": "2021-07-01T00:00:00.000Z",
    "image": "https://www.villaggionatura.com/shop/modules/ph_simpleblog/covers/28.jpg"
  },
  { 
    "id": "101",
    "username": "bar",
    "description": "coffee",
    "amount": 30,
    "participants": [
      "foo",
      "bar",
      "baz"
    ],
    "date": "2021-07-02T00:00:00.000Z",
    "image": "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  }
]

------

GET /web/transaction.json 
{
    ... comunication between frontend and backend
}

imput --> id:100
output -->

{
    "id: 100"
    "username": "baz",
    "description": "paper",
    "amount": 20,
    "participants": [
        "foo",
        "baz"
    ],
    "date": "2021-07-01T00:00:00.000Z",
    "image": "https://www.villaggionatura.com/shop/modules/ph_simpleblog/covers/28.jpg"
}

------

PUT /web/transaction.json

{
    "id: 100",
    "description": "pizza"
}

-----

DELETE /web/transaction.json

{
    "id: 100"
}