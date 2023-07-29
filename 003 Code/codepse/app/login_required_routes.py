from flask_login import LoginManager, UserMixin, current_user
from database.models import User

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    # existing User model definition

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))