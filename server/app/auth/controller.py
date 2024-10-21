from app.user.service import UserService
from flask import request, jsonify
from .service import AuthService
from .validators import ChangePasswordSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema, VerifyOtpSchema, ResetPasswordSchema, SendVerificationEmailSchema
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity

class AuthController:
    @staticmethod
    def register():
        schema = RegisterSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        email = data['email']
        password = data['password']
        
        try:
            access_token = AuthService.register(email, password)
            return jsonify({"access_token": access_token}), 201
        except ValueError as ve:
            return jsonify({"message": str(ve)}), 400
        except Exception as e:
            return jsonify({"message": "Registration failed."}), 500
    
    @staticmethod
    def login():
        schema = LoginSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        email = data['email']
        password = data['password']
        
        try:
            access_token = AuthService.login(email, password)
            return jsonify({"access_token": access_token}), 200
        except ValueError as ve:
            return jsonify({"message": str(ve)}), 401
        except Exception as e:
            return jsonify({"message": "Login failed."}), 500
    
    @staticmethod
    def forgot_password():
        schema = ForgotPasswordSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        email = data['email']
        
        try:
            AuthService.forgot_password(email)
            return jsonify({"message": "OTP sent to your email."}), 200
        except ValueError as ve:
            return jsonify({"message": str(ve)}), 404
        except Exception as e:
            return jsonify({"message": "Failed to process forgot password."}), 500
    
    @staticmethod
    def verify_reset_password_otp():
        schema = VerifyOtpSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        email = data['email']
        otp = data['otp']
        
        try:
            token = AuthService.verify_reset_password_otp(email, otp)
            return jsonify({"token": token}), 200
        except ValueError as ve:
            return jsonify({"message": str(ve)}), 400
        except Exception as e:
            return jsonify({"message": "Failed to verify reset password."}), 500
    
    @staticmethod
    def reset_password():
        schema = ResetPasswordSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        token = data['token']
        new_password = data['password']
        
        try:
            success = AuthService.reset_password(token, new_password)
            if success:
                return jsonify({"message": "Password has been reset successfully."}), 200
            else:
                return jsonify({"message": "Invalid or expired token."}), 400
        except Exception as e:
            return jsonify({"message": "Failed to reset password."}), 500
    
    @staticmethod
    def verify_email():
        schema = VerifyOtpSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        email = data['email']
        otp = data['otp']
        
        try:
            success = AuthService.verify_email(email, otp)
            if success:
                return jsonify({"message": "Email has been verified successfully."}), 200
            else:
                return jsonify({"message": "Invalid or expired OTP."}), 400
        except ValueError as ve:
            return jsonify({"message": str(ve)}), 400
        except Exception as e:
            return jsonify({"message": "Failed to verify email."}), 500
    
    @staticmethod
    def send_verification_email():
        schema = SendVerificationEmailSchema()
        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        email = data['email']
        
        try:
            AuthService.send_verification_email_via_otp(email)
            return jsonify({"message": "Verification OTP sent to email."}), 200
        except ValueError as ve:
            return jsonify({"message": str(ve)}), 404
        except Exception as e:
            return jsonify({"message": "Failed to send verification OTP."}), 500

    @staticmethod
    @jwt_required()
    def change_password():
        user_id = get_jwt_identity()
        schema = ChangePasswordSchema()

        try:
            data = schema.load(request.get_json())
        except ValidationError as err:
            return jsonify(err.messages), 400
        
        user = UserService.get_user_by_id(user_id)
        if not user or not UserService.verify_password(user,  data['currentPassword']):
            return jsonify({"message": "Invalid current password."}), 401
        
        try:
            UserService.update_password(user, data['newPassword'])
            return jsonify({"message": "Password changed successfully."}), 200
        except Exception as e:
            return jsonify({"message": "Failed to change password."}), 500
