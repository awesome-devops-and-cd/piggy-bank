
## Expenses
- GET piggybank/expenses -> return json describing all expenses (list) [basically returning our expenses.json file]
- GET piggybank/expenses/{query} -> return json describing all the filtered expenses (list)
- GET piggybank/expenses/{id} -> return json with expense description
- POST piggybank/expenses/ -> json in body of http request, returns a status code
- PUT piggybank/expenses/{id} -> json in body of http request, returns a status code
- DELETE piggybank/expenses/{id} -> returns a status code

## Users
- GET piggybank/users -> returns list of users
- POST piggybank/users -> json in body of http request, returns a status code
