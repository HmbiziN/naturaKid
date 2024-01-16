from utils import db, ma

class Category(db.Model):

    __tablename__ = "Category"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))

class CategoySchema(ma.Schema):

    class Meta:
        fields = ("id", "name")
        model = Category()

category_schema = CategoySchema()
categories_schema = CategoySchema(many=True)