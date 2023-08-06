data = {'Shaik Sharuk ':{'food': 500, 'travel': 1000, 'hotel': 0, 'essentials': 0, 'other': 0}, 
        'Kashmir files ': {'food': 0, 'travel': 0, 'hotel': 500, 'essentials': 0, 'other': 1500}}

def calculate(data):

    expense_categories = ["food", "hotel", "travel", "essentials", "others"]

    people = list(data.keys())

    expenses = data

    total_expenses = {person: sum(expenses[person].values()) for person in people}

    total_spent = sum(total_expenses.values())
    num_people = len(people)
    average_expense = total_spent / num_people

    gets_money = {person: total_expenses[person] - average_expense for person in people}
    gives_money = {person: average_expense - total_expenses[person] for person in people}

    print(total_expenses)
    print(gets_money)
    print(gives_money)

    response = dict()
    response['total'] = total_expenses
    response['gets'] = gets_money
    response['gives'] = gives_money

    # print("Total expenses:")
    # for person in people:
    #     print(f"{person}: {total_expenses[person]}")
        

    # print("\nGets money:")
    # for person, amount in gets_money.items():
    #     if amount > 0:
    #         print(f"{person} get {amount:.2f}")

    # print("\nGives money:")
    # for person, amount in gives_money.items():
    #     if amount > 0:
    #         print(f"{person} gives {amount:.2f}")

    return response

if __name__ == '__main__':
    print(calculate(data))