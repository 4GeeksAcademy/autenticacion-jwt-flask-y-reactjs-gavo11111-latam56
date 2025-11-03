"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints   
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_manager, jwt_required, get_jwt_identity     
from werkzeug.security import generate_password_hash, check_password_hash      #corregí el ambiente virtual en la linea 7 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    password_hash = generate_password_hash(password)
    new_user = User(email=email, password=password_hash, is_active=True)  # hash de la contraseña

    db.session.add(new_user)
    db.session.commit() 

    return jsonify(new_user.serialize()), 201

#Esta ruta se creo, pero hay quer moverla segun convenga 

@api.route('/tokens', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email is None or password is None:
        return jsonify({
            'message': 'Password and email required'
        }), 400

    query = db.select(User).filter_by(email=email)  
    result = db.session.execute(query).scalars().first()

    if result is None:
        return jsonify({"message": "CREDENCIALES NO VALIDAS"}), 400

    user = result
    password_is_valid = check_password_hash(user.password, password)
    if not password_is_valid:
        return jsonify({"message": "CREDENCIALES NO VALIDAS"}), 400

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
    "token": access_token
}), 201

@api.route('/users')
@jwt_required()
def private():
    user_id = get_jwt_identity()

    query = db.select(User).filter_by(id=user_id)
    result = db.session.execute(query).scalars().first()

    user = result
    return jsonify({
        "acceso": "Garantizado",
        "user": user.serialize()
    }), 200







# def login():
#     query = db.select(User).filter_by(email=email)
#     result = db.session.execute(query).scalars().first()

#     if result is None:
#         return jsonify({"message": "CREDENCIALES NO VÁLIDAS"}), 400
    
#     user = result 
#     password_is_valid = check_password_hash(user.password, password)
#     if not password_is_valid:
#         return jsonify({"message": "CREDENCIALES NO VÁLIDAS"}), 400
    

#     return jsonify(result.serialize()), 200