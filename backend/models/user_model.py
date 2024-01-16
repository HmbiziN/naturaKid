from marshmallow import EXCLUDE
from utils import db, ma
# from models.iteneray_model import ItenerarySchema
# import iteneray_model
# import iteneraySchema
class User(db.Model):
    """Class for User's attributes and methods"""

    __tablename__ = "user"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )
    name = db.Column(db.String(255))
    mail = db.Column(db.String(255))
    password = db.Column(db.String(255))
    is_admin = db.Column(db.Boolean, default=False)
    img = db.Column(db.String(255))
    # itenerary = db.relationship("Itenerary.id", backref="models.user_model.User")

class UserSchema(ma.Schema):
    """Schema used to serialize data"""

    class Meta:
        unknown = EXCLUDE
        fields = (
            "id",
            "name",
            "mail",
            "password",
            "is_admin",
            "img",
            # "itenerary",
            )
        model = User()
    # itenerary= ma.Nested(ItenerarySchema)


user_schema = UserSchema(unknown=EXCLUDE)
users_schema = UserSchema(many=True)
