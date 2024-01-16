from models import Pic, pics_schema
from flask import make_response, jsonify
from utils import db

def new_pic_service(pic_data):
    """Function to add a new pic"""
    try:
        print('service new pic')
        new_pic = Pic(**pic_data)
        db.session.add(new_pic)
        db.session.commit()
        return "", 200
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def show_pic_service():
    """Function to show all pic"""
    try:
        pic = db.session.query(Pic).all()
        pic = pics_schema.dump(pic)
        db.session.close()
        return jsonify(pic)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def filter_pic_city_service(city):
    try:
        p = db.session.query(Pic).filter(Pic.city == city).all()
        p = pics_schema.dump(p)
        db.session.close()
        return jsonify(p)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def filter_pic_category_service(category):
    try:
        p = db.session.query(Pic).filter(Pic.category == category).all()
        p = pics_schema.dump(p)
        db.session.close()
        return jsonify(p)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def delete_pic_service(id):
    try:
        db.session.query(Pic).filter(Pic.id == id).delete()
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)