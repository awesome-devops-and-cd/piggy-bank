get_ipython().run_line_magic('pylab', 'inline')

import json

data = open('api/expenses.json',)

expenses_dict =  json.load(data)

expenses_dict

#for each user in the list create a new voice in the dict or just add an expense if alredy present (more than a single expense for the user)
balance_list = {}
for trans in expenses_dict:
    if trans['username'] not in [*balance_list]:
        balance_list[trans['username']]=(trans['amount'])
    else:
        balance_list[trans['username']]+=(trans['amount'])

#balance the amount of each user subtracting the amount related to expanses from other users that involves him
for trans in expenses_dict:
    for part in trans['participants']:
        balance_list[part]-=float(trans['amount'])/float(len(trans['participants']))

print(balance_list)

