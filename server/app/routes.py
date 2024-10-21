from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/api/welcome', methods=['GET'])
def welcome():
    return jsonify({"message": "Welcome to the Full-Stack Application API!"}), 200
