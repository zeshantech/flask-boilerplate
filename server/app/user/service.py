from app.common.exceptions import EmailAlreadyExistsException, InvalidDataException, ProfileNotFoundException, UserNotFoundException
from .model import User
from .. import db
from werkzeug.security import generate_password_hash, check_password_hash
from app.user_profile.service import UserProfileService

class UserService:
    @staticmethod
    def create_user(email, password):
        if UserService.get_user_by_email(email):
            raise EmailAlreadyExistsException("Email already exists.")
        hashed_password = generate_password_hash(password)
        new_user = User(email=email, hashed_password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def verify_password(user, password):
        return check_password_hash(user.hashed_password, password)

    @staticmethod
    def update_user(user, **kwargs):
        if 'email' in kwargs:
            user.email = kwargs['email']
            user.is_verified = False  # Email changed, mark as unverified
        if 'password' in kwargs:
            user.hashed_password = generate_password_hash(kwargs['password'])
        for key, value in kwargs.items():
            if key not in ['email', 'password']:
                setattr(user, key, value)
        db.session.commit()
        return user

    @staticmethod
    def update_password(user, new_password):
        user.hashed_password = generate_password_hash(new_password)
        db.session.commit()

    @staticmethod
    def get_full_profile(user_id):
        user = UserService.get_user_by_id(user_id)
        if not user:
            raise UserNotFoundException()
        
        user_profile = UserProfileService.get_profile_by_user_id(user_id)
        
        # Ensure empty strings are returned if fields don't exist
        user_data = {
            "id": user.id,
            "email": user.email,
            "is_verified": user.is_verified,
            "first_name": getattr(user_profile, "first_name", "") or "",
            "last_name": getattr(user_profile, "last_name", "") or "",
            "bio": getattr(user_profile, "bio", "") or "",
            "avatar_url": getattr(user_profile, "avatar_url", "") or "",
        }
        return user_data

    @staticmethod
    def update_full_profile(user_id, data):
        user = UserService.get_user_by_id(user_id)
        if not user:
            raise UserNotFoundException()

        new_email = data.get('email')
        if new_email and new_email != user.email:
            if UserService.get_user_by_email(new_email):
                raise EmailAlreadyExistsException("New email already exists.")
            user.is_verified = False

        try:
            updated_user = UserService.update_user(user, **data)
        except Exception as e:
            raise InvalidDataException(str(e))

        profile_data = {
            "first_name": data.get("first_name", "") or "",
            "last_name": data.get("last_name", "") or "",
            "bio": data.get("bio", "") or "",
            "avatar_url": data.get("avatar_url", "") or "",
        }
        try:
            updated_profile = UserProfileService.create_or_update_profile(user_id, **profile_data)
        except Exception as e:
            raise InvalidDataException(str(e))

        user_data = {
            "id": updated_user.id,
            "email": updated_user.email,
            "is_verified": updated_user.is_verified,
            "created_at": updated_user.created_at,
            "updated_at": updated_user.updated_at,
            "profile": {
                "first_name": updated_profile.first_name or "",
                "last_name": updated_profile.last_name or "",
                "bio": updated_profile.bio or "",
                "avatar_url": updated_profile.avatar_url or "",
            }
        }
        return user_data
