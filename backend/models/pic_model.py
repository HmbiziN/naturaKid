from utils import db, ma
from sqlalchemy.sql.sqltypes import Float

class Pic(db.Model):
    """Class for pic's attributes and methods"""

    __tablename__ = "pic"

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

class PicSchema(ma.Schema):
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
        )
        model = Pic()

pic_schema = PicSchema()
pics_schema = PicSchema(many=True)
