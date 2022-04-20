from flask import Flask, request,jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS


app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonreactDB'
mongo = PyMongo(app)

## configuring CORS to avoid errors comunication with react development server
CORS(app)

db = mongo.db.users



@app.route('/users', methods=['POST'])
def createUser(): 
    id = db.insert_one({
        'name':request.json['name'],
        'email':request.json['email'],
        'password': request.json['password']
    })
    ## Here we use the ObjectId class to get the mongodb insertion ID, and we pass it as a response to the request
    return jsonify(id = str(ObjectId(id.inserted_id)))
    

@app.route('/users/',methods=['GET'])
def getUsers(): 
    ## get all the users inside the database and bring them up, append them to the users list, and return it as the request response.
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    print(users[0])
    return jsonify(users)
    

@app.route('/user/<id>',methods=['GET'])
def getUser(id): 

    user = db.find_one({'_id': ObjectId(id)})
    
    ## showing all keys of user dct
    print(user.keys())
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    })


@app.route('/users/<id>',methods=['DELETE'])
def deleteUser(id):
    ## deleting 1 user passed by url parameters
    id = db.delete_one({'_id': ObjectId(id)}) 
    return jsonify({'mssg': 'User Deleted Successfully'})


@app.route('/users/<id>',methods=['PUT'])
def updateUser(id):
    print(request.json)
    print()
    db.update_one({'_id': ObjectId(id)}, {'$set':{
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    }})
    return 'received'

if __name__ == "__main__":
    app.run(debug=True)
