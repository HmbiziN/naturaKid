from utils import db, ma
from sqlalchemy.sql.sqltypes import  Boolean
from datetime import datetime

class Article(db.Model):
    """Class for article's attributes and methods"""

    __tablename__ = "article"

    id = db.Column(
        db.Integer, nullable=False, primary_key=True, autoincrement=True
    )
    title = db.Column(db.String(255))
    abstract = db.Column(db.String(255))
    paragraph_one = db.Column(db.String(255))
    paragraph_two = db.Column(db.String(255))
    paragraph_three = db.Column(db.String(255))
    creation_date = db.Column(db.Date, nullable=False, default=datetime.now)
    active = db.Column(Boolean, default=False)
    img = db.Column(db.String(255))
    img2 = db.Column(db.String(255))
    img3 = db.Column(db.String(255))
    categorie = db.Column(db.String(255))

class ArticleSchema(ma.Schema):
    """Schema used to serialize data"""
    class Meta:
        fields = (
            "id",
            "title",
            "abstract",
            "paragraph_one",
            "paragraph_two",
            "paragraph_three",
            "creation_date",
            "active",
            "img",
            "img2",
            "img3",
            "categorie"
        )
        model = Article()

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)