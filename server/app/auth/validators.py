from marshmallow import Schema, fields, validate, ValidationError
from ..user.service import UserService

def validate_email_unique(email):
    if UserService.get_user_by_email(email):
        raise ValidationError('Email already exists.')

class RegisterSchema(Schema):
    email = fields.Email(required=True, validate=validate_email_unique)
    password = fields.String(required=True, validate=validate.Length(min=6))

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)

class ForgotPasswordSchema(Schema):
    email = fields.Email(required=True)

class ResetPasswordSchema(Schema):
    token = fields.String(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))

class VerifyOtpSchema(Schema):
    email = fields.Email(required=True)
    otp = fields.String(required=True, validate=validate.Length(equal=6))

class SendVerificationEmailSchema(Schema):
    email = fields.Email(required=True)

class ChangePasswordSchema(Schema):
    currentPassword = fields.String(required=True)
    newPassword = fields.String(required=True, validate=validate.Length(min=6))
