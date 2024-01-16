from email.policy import default
from models.iteneray_model import Itenerary
from models.user_model import User
from utils import db, ma
class Favoris(db.Model):
    __tablename__ = "favoris"
    id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    itinerary_id = db.Column(db.Integer, db.ForeignKey(Itenerary.id), nullable=False)
    favorite = db.Column(db.Boolean, default=False)
class FavorisSchma(ma.Schema):
    class Meta:
        fields = (
            "id",
            "user_id",
            "itinerary_id",
            "favorite"
        )
favoris_schema = FavorisSchma()
favoriss_schema = FavorisSchma(many=True)