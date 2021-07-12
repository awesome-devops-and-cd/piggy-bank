## API - Group Office  

### Insert new transaction [POST]
You may create your own transaction using this action.
This action takes a JSON payload as part of the request.
Response then return specific header and body.

+ Request (/web/expenses.json)

        {
            "mandatory": [
				"username", 
				"description", 
				"paid amount", 
				"partecipants"],
            "optional": [
                "date",
                "image"]
        }

+ Response 201 (/web/expenses.json)

    + Headers
			    	Location: /web/responses

    + Body

			 {
				"mandatory": [
				"username", 
				"description", 
				"paid amount", 
				"participants"],
			 "optional": [
	     		 "date",
			   "image"]
			   }

### List All Transactions  [GET]
List all saved transactions and related details. 

This action returns a 200 status code along with a JSON body.

+ Response 200 (application/json)

        {
            "question": "Show all transactions",
            "url": "/web/index",
            "transactions": 
			 [
				{
				"username",
				"description",
				"amount",
				"participants",
				"date",
				"image"
				},
				
				{...}
			  ]
			  
            ]
        }
