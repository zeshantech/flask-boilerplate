from flask import request, jsonify
from .service import UserService
from .validators import UpdateProfileSchema
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity  # type: ignore
from app.common.exceptions import EmailAlreadyExistsException, InvalidDataException, ProfileNotFoundException, UserNotFoundException

class UserController:
    @staticmethod
    @jwt_required()
    def get_profile():
        user_id = get_jwt_identity()
        try:
            user_data = UserService.get_full_profile(user_id)
            return jsonify(user_data), 200
        except UserNotFoundException:
            return jsonify({"message": "User not found."}), 404
        except ProfileNotFoundException:
            return jsonify({"message": "User profile not found."}), 404
        except Exception as e:
            return jsonify({"message": str(e)}), 500

    @staticmethod
    @jwt_required()
    def update_profile():
        user_id = get_jwt_identity()
        schema = UpdateProfileSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400

        try:
            user_data = UserService.update_full_profile(user_id, data)
            return jsonify(user_data), 200
        except UserNotFoundException:
            return jsonify({"message": "User not found."}), 404
        except EmailAlreadyExistsException:
            return jsonify({"message": "New email already exists."}), 400
        except ProfileNotFoundException:
            return jsonify({"message": "User profile not found."}), 404
        except InvalidDataException as e:
            return jsonify({"message": str(e)}), 400
        except Exception as e:
            return jsonify({"message": str(e)}), 500
