# app/shared/__init__.py
from .email_service import EmailService
from .otp_service import OTPService

# Do NOT instantiate services here
email_service = EmailService()
otp_service = OTPService()
