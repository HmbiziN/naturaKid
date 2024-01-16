from models.iteneray_model import Itenerary
from models import Favoris, favoriss_schema, favoris_schema
from utils import db
from flask import jsonify, make_response, session
import os

def addFavorisService(data):
    try:
        print(data)
        print( "l utilisateur courant est "+os.getlogin())
        favoris = Favoris(**data)
        favoris.user_id = session['id']
        favoris.favorite = True
        db.session.add(favoris)
        db.session.commit()
        return favoris_schema.dump(favoris)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})
        # centernames = dict(
        #     sa_session.query(db.Firefighter.cod, db.Center.name)
        #     .join(db.Firefighter, db.Center.id == db.Firefighter.id_center)
        #     .filter(db.Firefighter.cod.in_(cod_users))
        #     .all()
        # )

def get_favoris():
    favorite_itinerary = db.session.query(Favoris).filter(Favoris.user_id == session['id']).all()

    favorite_itinerary = favoriss_schema.dump(favorite_itinerary)
    print(favorite_itinerary, 'test')
    db.session.close()
    return jsonify(favorite_itinerary)

def delete_favoris(id):
    try:
        db.session.query(Favoris).filter(Favoris.id == id).delete()
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)


