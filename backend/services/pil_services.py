from models import Pil, pils_schema
from flask import make_response, jsonify
from utils import db

def new_pil_service(data):
    try:
        pil = Pil(**data)
        db.session.add(pil)
        db.session.commit()
        return "", 200
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def get_pil_with_id_itinerary(id_i):
    try:
        p = db.session.query(Pil).filter(Pil.id_i == id_i).all()
        p = pils_schema.dump(p)
        db.session.close()
        return jsonify(p)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)