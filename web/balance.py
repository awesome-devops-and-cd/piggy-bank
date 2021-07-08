import json
import numpy as np

# Opening JSON file
f = open('api/expenses.json','r')
  
# returns JSON object as 
# a dictionary
data = json.load(f)



# Closing file
f.close()

matrix = np.zeros((3,3))


dic = {"foo":0, "bar":1, "baz":2}

for spesa in data :
    user = spesa['username']
    part = spesa['participants']
    n = len(part)
    amount= float(spesa['amount'])

    for p in part:
        if p != user :
            matrix[dic[p]][dic[user]] = matrix[dic[p]][dic[user]] + amount/n


print(matrix)
