from flask import Flask
from .routes import bp
      
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hamody2005'  # Replace with a secure, random string
    app.register_blueprint(bp)  

    return app

