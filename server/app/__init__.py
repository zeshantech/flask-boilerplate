# app/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import Config

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ALLOWED_ORIGINS"].split(',')}})
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize shared services within app context
    with app.app_context():
        from .shared.email_service import EmailService
        from .shared.otp_service import OTPService
        app.email_service = EmailService()
        app.otp_service = OTPService()
    
    # Register Blueprints
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    from .user.routes import user_bp
    app.register_blueprint(user_bp, url_prefix='/api/user')
    
    from .auth.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    return app
