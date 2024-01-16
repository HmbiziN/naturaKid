from models.iteneray_model import Itenerary
from utils import db, ma
from sqlalchemy.sql.sqltypes import Float

class Pil(db.Model):
    """Class for pil's attributes and methods"""

    __tablename__ = "pil"

    id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    name = db.Column(db.String(255))
    url = db.Column(db.String(255))
    city = db.Column(db.String(255))
    lat = db.Column(Float)
    lng = db.Column(Float)
    category = db.Column(db.String(255))
    street = db.Column(db.String(255))
    cp = db.Column(db.Integer)
    content = db.Column(db.String(255))
    id_i = db.Column(db.Integer, db.ForeignKey(Itenerary.id), nullable=False)

class PilSchema(ma.Schema):
    """Schema used to serialize data"""
    class Meta:
        fields = (
            "id",
            "name",
            "url",
            "city",
            "lat",
            "lng",
            "category",
            "street",
            "cp",
            "content"
        )
        model = Pil()

pil_schema = PilSchema()
pils_schema = PilSchema(many=True)