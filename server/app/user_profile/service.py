from app.common.exceptions import InvalidDataException
from .model import UserProfile
from .. import db

class UserProfileService:
    @staticmethod
    def get_profile_by_user_id(user_id):
        return UserProfile.query.filter_by(user_id=user_id).first()

    @staticmethod
    def create_or_update_profile(user_id, **kwargs):
        profile = UserProfile.query.filter_by(user_id=user_id).first()
        if not profile:
            profile = UserProfile(user_id=user_id, **kwargs)
            db.session.add(profile)
        else:
            for key, value in kwargs.items():
                setattr(profile, key, value)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise InvalidDataException(str(e))
        return profile
