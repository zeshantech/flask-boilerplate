from flask import Blueprint
from .controller import UserController

user_bp = Blueprint('user', __name__)

# Example: /api/user/me
user_bp.route('/me', methods=['GET'])(UserController.get_profile)
user_bp.route('/me', methods=['PUT'])(UserController.update_profile)
