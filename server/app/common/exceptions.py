# src/exceptions.py

class UserNotFoundException(Exception):
    """Exception raised when a user is not found."""
    pass

class ProfileNotFoundException(Exception):
    """Exception raised when a user profile is not found."""
    pass

class EmailAlreadyExistsException(Exception):
    """Exception raised when the email already exists."""
    pass

class InvalidDataException(Exception):
    """Exception raised for invalid data."""
    pass
