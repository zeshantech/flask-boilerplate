import random
import string
import redis
from flask import current_app

class OTPService:
    def _get_redis_client(self):
        """Lazily initialize the Redis client within an application context."""
        return redis.Redis.from_url(
            current_app.config['REDIS_URI'],
            decode_responses=True
        )
    
    def generate_otp(self, length=6):
        """Generates a numeric OTP of specified length."""
        return ''.join(random.choices(string.digits, k=length))
    
    def store_otp(self, key, otp):
        """Stores OTP in Redis with expiration."""
        redis_client = self._get_redis_client()
        redis_client.setex(key, current_app.config['OTP_EXPIRATION'], otp)
    
    def verify_otp(self, key, otp):
        """Verifies the OTP. Returns True if valid, False otherwise."""
        redis_client = self._get_redis_client()
        stored_otp = redis_client.get(key)
        print(stored_otp, "-----------------------------")
        if stored_otp and stored_otp == otp:
            redis_client.delete(key) 
            return True
        return False
