{% extends "base.html" %}
{% block title %}Contact Us - FashionHub{% endblock %}
{%block extra_css%}
<link rel="stylesheet" href="{{ url_for('static', filename='contact.css') }}">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
{%endblock%}
{% block content %}
        <section class="contact-form-section">
            <h2>Contact Us</h2>
            <form id="contact-form" onsubmit="return validateForm()">
                <div class="input-container">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" required placeholder="Enter your Name">
                </div>
                <div class="input-container">
                    <label for="email">Your Email:</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your Email">
                </div>
                <div class="input-container">
                    <label for="phone">Your Phone Number:</label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="Enter your Phone number"
                        required>
                </div>
                <div class="input-container">
                    <label for="message">Your Message:</label>
                    <textarea id="message" name="message" rows="5" required placeholder="Message"></textarea>
                </div>
                <div class="button-container">
                    <button type="submit">Send Message</button>
                </div>
            </form>
        </section>

        <section class="contact-info">
            <h3>Contact Information</h3>
            <p>If you prefer, you can also reach us by phone:</p>
            <a href="tel:010196947780" class="phone-icon">
                <i class="fas fa-phone-alt"></i> 010196947780
            </a>
        </section>

{% endblock %}
{% block scripts %}
<script src="{{ url_for('static', filename='js/contact.js') }}"></script>
{% endblock %}