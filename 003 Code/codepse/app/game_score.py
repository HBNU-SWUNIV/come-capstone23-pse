from flask_login import current_user

@app.route('/api/current_user', methods=['GET'])
def current_user_info():
    if current_user.is_authenticated:
        return {"user_id": current_user.id, "user_email": current_user.user_email}
    else:
        return {"error": "User not logged in"}, 403
