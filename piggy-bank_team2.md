swagger: "2.0"
info:
  description: "This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters."
  version: "1.0.0"
  title: "Swagger Petstore"
  termsOfService: "http://swagger.io/terms/"
  contact:
    email: "apiteam@swagger.io"
  license:
    name: "Apache 2.0"
    url: "http://www.apache.org/licenses/LICENSE-2.0.html"
host: ""
basePath: "/piggy-bank"
schemes:
- "http"
paths:
  /transactions:
    get:
      summary: "Get the list of the transactions"
      description: "Get the list of the transactions"
      operationId: "getTransactions"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: ""
        required: true
        schema:
          type: "object"
      responses:
        "400":
          description: "Bad Request"
    post:
      summary: "Create a new transaction"
      description: "Create a new transaction"
      operationId: "createTransaction"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: ""
        required: true
        schema:
          type: "object"
      responses:
        "400":
          description: "Bad request"
    put:
      summary: "Update the list of transactions"
      description: "Update the list of transactions"
      operationId: "updateTransactions"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - name: "transactionID"
        in: "body"
        description: "Status values that need to be considered for filter"
        required: true
        schema:
          type: "object"
      responses: 
        "400":
          description: "Bad Request"
    delete:
      summary: "delete a transaction"
      description: "Delete a transaction from the list."
      operationId: "deleteTransaction"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
        - in: "body"
          name: "body"
          description: ""
          required: true
          schema:
          type: "array"
      responses:
        "400":
          description: "Bad request"
    /groups:      
    get:
      summary: "Get the list of the groups"
      description: "Get the list of the groups"
      operationId: "getListOfGroups"
      produces:
      - "application/json"
      parameters:
      - name: "body"
        in: "body"
        description: ""
        required: true
      responses:
        "400":
          description: "Bad Request"
        "404":
          description: "Group not found"
    post:
      summary: "creates a new group"
      description: "creates a new group"
      operationId: "createGroup"
      consumes:
      - "html"
      produces:
      - "application/json"
      parameters:
      - name: "body"
        in: "body"
        description: ""
        required: true
        type: "string"
      responses:
        "400" : 
          description: "Bad Request"
        "405":
          description: "Invalid input"

    /groups/{groupName}:
  delete, put