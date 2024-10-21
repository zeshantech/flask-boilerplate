from marshmallow import Schema, fields, validate, ValidationError

class UpdateProfileSchema(Schema):
    first_name = fields.String(required=False, validate=validate.Length(max=50))
    last_name = fields.String(required=False, validate=validate.Length(max=50))
    bio = fields.String(required=False)
    avatar_url = fields.Url(required=False)
    email = fields.Email(required=False)