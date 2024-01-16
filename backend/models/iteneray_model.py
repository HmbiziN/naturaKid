from utils import db, ma
from sqlalchemy.sql.sqltypes import Float, Boolean
from datetime import datetime


class Itenerary(db.Model):
    """Class for itenerary's attributes and methods"""

    __tablename__ = "itenerary"

    id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    age = db.Column(db.Integer, nullable=False)
    complexity = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255))
    content = db.Column(db.String(255))
    creation_date = db.Column(db.Date, nullable=False, default=datetime.now)
    lat = db.Column(Float)
    lng = db.Column(Float)
    active = db.Column(Boolean, default=False)
    gpx = db.Column(db.String(255))
    doc = db.Column(db.String(255), nullable=True)
    img = db.Column(db.String(255), nullable=True)
    label = db.Column(Boolean, default=False)
    play = db.Column(Boolean, default=False)
    departure = db.Column(db.String(255))
    distance = db.Column(Float)

class ItenerarySchema(ma.Schema):
    """Schema used to serialize data"""
    class Meta:
        fields = (
            "id",
            "title",
            "content",
            "age",
            "creation_date",
            "complexity",
            "lat",
            "lng",
            "active",
            "gpx",
            "doc",
            "img",
            "label",
            "play",
            "departure",
            "distance",
        )
        model = Itenerary()

itinerary_schema = ItenerarySchema()
many_itinerary_schema = ItenerarySchema(many=True)
