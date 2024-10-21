from flask_jwt_extended import create_access_token
from datetime import timedelta
from ..user.service import UserService
from ..user.model import User
from ..shared import email_service, otp_service
from .. import db

class AuthService:
    @staticmethod
    def register(email, password):
        if UserService.get_user_by_email(email):
            raise ValueError("Email already exists.")
        user = UserService.create_user(email, password)
        AuthService.send_verification_email(user)
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=7))
        return access_token

    
    @staticmethod
    def send_verification_email(user):
        otp = otp_service.generate_otp()
        otp_key = f"verify_email:{user.id}"
        otp_service.store_otp(otp_key, otp)
        subject = "Verify Your Email"
        html_content = f"""
        <p>Thank you for registering. Use the following OTP to verify your email:</p>
        <h2>{otp}</h2>
        <p>This OTP will expire in 5 minutes.</p>
        """
        email_service.send_email(user.email, subject, html_content)
    
    @staticmethod
    def login(email, password):
        user = UserService.get_user_by_email(email)
        if not user or not UserService.verify_password(user, password):
            raise ValueError("Invalid credentials.")
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=7))
        return access_token

    @staticmethod
    def verify_reset_password_otp(email, otp):
        user = UserService.get_user_by_email(email)
        if not user:
            raise ValueError("User does not exist.")
        otp_key = f"forgot_password:{user.id}"
        if otp_service.verify_otp(otp_key, otp):
            reset_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=10))
            token_key = f"reset_token:{reset_token}"
            otp_service.store_otp(token_key, email)
            return reset_token
        else:
            raise ValueError("Invalid or expired OTP.")
    
    @staticmethod
    def forgot_password(email):
        user = UserService.get_user_by_email(email)
        if not user:
            raise ValueError("User with this email does not exist.")
        otp = otp_service.generate_otp()
        otp_key = f"forgot_password:{user.id}"
        otp_service.store_otp(otp_key, otp)
        subject = "Forgot Password OTP"
        html_content = f"""
        <p>You requested to reset your password. Use the following OTP to proceed:</p>
        <h2>{otp}</h2>
        <p>This OTP will expire in 5 minutes.</p>
        """
        email_service.send_email(user.email, subject, html_content)
    
    @staticmethod
    def reset_password(token, new_password):
        token_key = f"reset_token:{token}"
        email = otp_service._get_redis_client().get(token_key)
        if email:
            user = UserService.get_user_by_email(email)
            if user:
                UserService.update_password(user, new_password)
                otp_service._get_redis_client().delete(token_key)
                return True
        return False

    @staticmethod
    def verify_email(email, otp):
        user = UserService.get_user_by_email(email)
        if not user:
            raise ValueError("User does not exist.")
        otp_key = f"verify_email:{user.id}"
        if otp_service.verify_otp(otp_key, otp):
            user.is_verified = True
            db.session.commit()
            return True
        else:
            raise ValueError("Invalid or expired OTP.")
    
    @staticmethod
    def send_verification_email_via_otp(email):
        user = UserService.get_user_by_email(email)
        if not user:
            raise ValueError("User does not exist.")
        AuthService.send_verification_email(user)
