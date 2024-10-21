from flask import Blueprint
from .controller import AuthController

auth_bp = Blueprint('auth', __name__)

auth_bp.route('/register', methods=['POST'])(AuthController.register)
auth_bp.route('/login', methods=['POST'])(AuthController.login)
auth_bp.route('/forgot-password', methods=['POST'])(AuthController.forgot_password)
auth_bp.route('/reset-password', methods=['POST'])(AuthController.reset_password)
auth_bp.route('/verify-email', methods=['POST'])(AuthController.verify_email)
auth_bp.route('/send-verification-email', methods=['POST'])(AuthController.send_verification_email)
auth_bp.route('/verify-reset-password-otp', methods=['POST'])(AuthController.verify_reset_password_otp)
auth_bp.route('/change-password', methods=['POST'])(AuthController.change_password)