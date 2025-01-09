from uuid import uuid4

from flask import (Blueprint, flash, jsonify, make_response, redirect,
                   render_template, request, send_file, url_for)
from werkzeug.security import check_password_hash, generate_password_hash

# Define blueprint
bp = Blueprint('bp', __name__)


users = {}  # Store user data in a dictionary

@bp.route('/')
def home():
    return render_template('home.html')

@bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        # Render the signup page if accessed via GET
        return render_template('signup.html')

    # Handle POST request (form submission)
    data = request.get_json() if request.is_json else request.form
    username = data.get('username')
    email = data.get('email')
    telephone = data.get('telephone')
    country = data.get('country')
    password = data.get('password')

    if not username or not email or not telephone or not country or not password:
        return jsonify({"message": "All fields are required!"}), 400

    if email in users or any(user['username'] == username for user in users.values()):
        return jsonify({"message": "Email or username already exists!"}), 400

    # Save the new user's data
    hashed_password = generate_password_hash(password)
    users[email] = {
        'username': username,
        'email': email,
        'telephone': telephone,
        'country': country,
        'password': hashed_password
    }

    return jsonify({"message": "Signup successful! Please log in."}), 200


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')

    data = request.get_json() if request.is_json else request.form

    identifier = data.get('identifier')  # Can be username or email
    password = data.get('password')

    # Find user by username or email
    user = next((u for u in users.values() if u['email'] == identifier or u['username'] == identifier), None)

    if user and check_password_hash(user['password'], password):
        # Generate auth_token (example uses UUID)
        auth_token = str(uuid4())

        # Create response and set cookies
        response = make_response(render_template('home.html'))
        response.set_cookie('email', user['email'])
        response.set_cookie('username', user['username'])
        response.set_cookie('auth_token', auth_token)  # Simulated auth token

        return response
    else:
        flash("Invalid credentials. Please try again.")
        return render_template('login.html')


@bp.route('/products')
def products():
    return render_template('products.html')

@bp.route('/about')
def about():
    return render_template('about.html')

@bp.route('/rate')
def rate():
    return render_template('rate.html')

@bp.route('/contact')
def contact():
    return render_template('contact.html')

@bp.route('/cart')
def cart():
    return render_template('cart.html')
