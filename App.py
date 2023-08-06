from flask import Flask, render_template, redirect, url_for, request, flash, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from test import calculate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SECRET_KEY'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)

class Expenses(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    food = db.Column(db.Integer, default=0)
    travel = db.Column(db.Integer, default=0)
    hotel = db.Column(db.Integer, default=0)
    essential = db.Column(db.Integer, default=0)
    others = db.Column(db.Integer, default=0)

class Users(db.Model):
    username = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(50))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/logout')
def logout():
    return redirect(url_for('index'))

@app.route('/trip')
def trip():
    return render_template('tripmanagement.html')

@app.route('/sign-up', methods = ['POST', 'GET'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if Users.query.filter_by(username = username).first():
            flash('Username already taken')

        else:
            user = Users(username=username, password=password)

            db.session.add(user)
            db.session.commit()

        return redirect(url_for('index'))
    
    return render_template('signup.html')

@app.route('/middle')
def middle():
    return render_template('middle.html')

@app.route('/display-image/<filename>')
def display_image(filename):
    return send_from_directory('static', filename)

@app.route('/sign-in', methods = ['POST'])
def signin():
    
    username = request.form.get('username')
    password = request.form.get('password')

    if Users.query.filter_by(username = username, password = password).first():
        return redirect(url_for('middle'))

    else:
       flash('error invalid username or password')

    return redirect(url_for('index'))

@app.route('/calulate-expenses', methods=['POST'])
def calulate_expenses():
    data = request.get_json()
    insert_data(data)

    reponse = calculate(data)
    

    return reponse

def insert_data(data):
    print(data)
    for record in data:
        e = Expenses.query.filter_by(name=record).first()

        print(record)
        print(data[record]['food'])
        print(data[record]['travel'])

        if not e:
            e = Expenses(name=record, food=data[record]['food'], travel=data[record]['travel'], hotel=data[record]['hotel'], essential=data[record]['essentials'], others=data[record]['other'])
            db.session.add(e)
            db.session.commit()

        else:
            e.food += data[record]['food']
            e.travel += data[record]['travel']
            e.hotel += data[record]['hotel']
            e.others += data[record]['other']
            e.essential += data[record]['essentials']

            db.session.add(e)
            db.session.commit()


if __name__ == '__main__':
    app.run(debug=True)