from models import Category, categories_schema
from utils import db
from flask import make_response, jsonify

def show_category_service():
    print("service")
    try:
        category = db.session.query(Category).all()
        category = categories_schema.dump(category)
        db.session.close()
        return jsonify(category)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})