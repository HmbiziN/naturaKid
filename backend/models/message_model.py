from models.shop_model import Product
from utils import db, ma
from models.user_model import User
from sqlalchemy.sql.sqltypes import Boolean

class Message(db.Model):
    __tablename__ = "message"
    id = db.Column(db.Integer, nullable=False, primary_key=True, autoincrement=True)
    user_sender = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user_recipient = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    product = db.Column(db.Integer, db.ForeignKey(Product.id), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    actif = db.Column(Boolean, default=False)
    title = db.Column(db.String(255), nullable = False)
    description = db.Column(db.String(255), nullable = False)
    name_recipient=  db.Column(db.String(255), nullable = True)
    # name_sender= db.Column(db.String, nullable = False)
    depends_of= db.Column(db.Integer, db.ForeignKey("message.id", ondelete='CASCADE'), nullable=True)

class MessageSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "user_sender",
            "user_recipient",
            "product",
            "content",
            "actif",
            "title",
            "description",
            "name_recipient",
            # "name_sender",
            "depends_of",
        )
        model = Message

message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)