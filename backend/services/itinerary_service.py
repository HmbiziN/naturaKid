from sqlalchemy import desc
from models.itinerary_user import Favoris,favoriss_schema
from models import Itenerary, itinerary_schema, many_itinerary_schema
from utils import db
from flask import make_response, request, jsonify, send_from_directory, session
import os

def new_itinerary_service(itinerary_data):
    """Function to add a new itinerary"""
    try:
        new_itinerary = Itenerary(**itinerary_data)
        db.session.add(new_itinerary)
        db.session.commit()
        return itinerary_schema.dump(new_itinerary)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def add_file_service():
    doc = request.files["doc"]
    filename = doc.filename.replace("/","").replace("\\","")
    path = os.path.join(".", "assets","docs", filename)
    doc.save(path)
    return ''
def add_gpx_service():
    gpx = request.files["gpx"]
    filename = gpx.filename.replace("/","").replace("\\","")
    path = os.path.join(".", "assets","gpx", filename)
    gpx.save(path)
    return ''
def add_img_service():
    img = request.files["img"]
    filename = img.filename.replace("/","").replace("\\","")
    path = os.path.join(".", "assets","img", filename)
    img.save(path)
    return ''


def read_gpx_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/gpx'
    return send_from_directory(folder_path, filename, as_attachment = True)

def read_img_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/img'
    return send_from_directory(folder_path, filename, as_attachment = True)

def download_gpx_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/gpx'
    return send_from_directory(folder_path, filename, as_attachment = True)
def download_img_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/img'
    return send_from_directory(folder_path, filename, as_attachment = True)

def download_pdf_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/pdf'
    return send_from_directory(folder_path, filename, as_attachment = True)

def show_itinerary_service():
    """Function to show all itinerary"""
    try:
        itinerary = db.session.query(Itenerary).all()
        itinerary = many_itinerary_schema.dump(itinerary)
        db.session.close()
        return jsonify(itinerary)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def show_itinerary_spotlight_service():
    """Function to show 9 itinerary"""
    try:
        itinerary = db.session.query(Itenerary).order_by(desc(Itenerary.creation_date)).limit(9).all()
        itinerary = many_itinerary_schema.dump(itinerary)
        db.session.close()
        return jsonify(itinerary)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def show_itinerary_detail_service(id):
    """Function to show detail itenerary"""
    try:
        it = db.session.query(Itenerary).filter(Itenerary.id == id).all()
        it = many_itinerary_schema.dump(it)
        db.session.close()
        return jsonify (it)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)
    
def filter_itinerary_service(filtre):
    try:
        i = db.session.query(Itenerary).filter(Itenerary.age == filtre).all()
        i = many_itinerary_schema.dump(i)
        db.session.close()
        return jsonify(i)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def filter_itinerary_complexity_service(complexity):
    try:
        i = db.session.query(Itenerary).filter(Itenerary.complexity == complexity).all()
        i = many_itinerary_schema.dump(i)
        db.session.close()
        return jsonify(i)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def filter_itinerary_city_service(city):
    try:
        i = db.session.query(Itenerary).filter(Itenerary.departure == city).all()
        i = many_itinerary_schema.dump(i)
        db.session.close()
        return jsonify(i)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def filter_itinerary_label_false_service():
    try:
        i = db.session.query(Itenerary).filter(Itenerary.label == False).all()
        i = many_itinerary_schema.dump(i)
        db.session.close()
        return jsonify(i)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def filter_itinerary_label_true_service():
    try:
        i = db.session.query(Itenerary).filter(Itenerary.label == True).all()
        i = many_itinerary_schema.dump(i)
        db.session.close()
        return jsonify(i)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def delete_itinerary_service(id):
    try:
        db.session.query(Itenerary).filter(Itenerary.id == id).delete()
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

#QUESTIONNAIRE
# @app.route("/reponse", methods=["POST"])
def favoris_service():
    try:
        data = Itenerary(**data)
    except Exception as e:
        return "erreur", 400
    questionnaire = Itenerary(**data)
    questionnaire.user_id = db.session['id']
    db.add(questionnaire)
    db.commit()
    db.close()
    return ""

def get_favoris_itinerary():
    favorite_itinerary = db.session.query(Itenerary).filter(Itenerary.id == Favoris.itinerary_id).join(Favoris, Favoris.user_id == session['id']).all()
    favorite_itinerary = many_itinerary_schema.dump(favorite_itinerary)
    db.session.close()
    return jsonify(favorite_itinerary)


def filter_test_service(filtre, complexity):
    try:
        i = db.session.query(Itenerary).filter((Itenerary.age == filtre) & (Itenerary.complexity == complexity)).all()
        i = many_itinerary_schema.dump(i)
        db.session.close()
        return jsonify(i)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def filter_multiple_service(filtre, complexity, label):
    try:
        i = db.session.query(Itenerary).filter((Itenerary.age == filtre) & (Itenerary.complexity == complexity)& (Itenerary.label == label)).all()
        i = many_itinerary_schema.dump(i)
        db.session.close()
        return jsonify(i)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)
