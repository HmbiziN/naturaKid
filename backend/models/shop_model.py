# from unicodedata import category
from utils import db, ma
from models.user_model import User
from sqlalchemy.sql.sqltypes import Float, Boolean

class Product(db.Model):
    __tablename__ = "product"
    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    title= db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    img = db.Column(db.String(255), nullable=True)
    gender = db.Column(db.String(255), nullable=False)
    cut = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    price = db.Column(Float)
    confirm = db.Column(Boolean, default=False)

class ProductSchema(ma.Schema):
    class Meta:
        fields = (
            "id", 
            "user_id",
            "title",
            "content",
            "img", 
            "gender",
            "cut",
            "category",
            "department",
            "city",
            "price", 
            "confirm" 
        )
        model = Product
product_schema= ProductSchema()
products_schema= ProductSchema(many=True)