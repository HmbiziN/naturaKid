import os
from flask import request, make_response, session
from marshmallow import EXCLUDE
from utils import db
from models import User, user_schema, users_schema
from flask.json import jsonify
from flask import session
import hashlib
import sqlalchemy as sa
import mail as m


def hash_password(password):
    return hashlib.sha256(str(password).encode("utf-8")).hexdigest()

import hashlib
# import bcrypt
def setup_route(app):
    @app.route("/api/registration", methods=["POST"])
    # def send_email():
    #     import os
    #     api_key = '12274b95b878786fffa0244c97c17323'
    #     api_secret = '819215a7c122e26fbda17710805024d2'
    #     mailjet = Client(auth=(api_key, api_secret), version='v3.1')
    #     data = {
    #     'Messages': [
    #         {
    #         "From": {
    #             "Email": "aurebes@gmail.com",
    #             "Name": "Natura-Kid"
    #         },
    #         "To": [
    #             {
    #             "Email": "aurebes@gmail.com",
    #             "Name": "Aurélie"
    #             }
    #         ],
    #         "Subject": "Greetings from Mailjet.",
    #         "TextPart": "My first Mailjet email",
    #         "HTMLPart": "<h3>Inscription ok!!!<a>http://demo.natura-kid.fr<a>!</    h3><br />May the delivery force be with you!",
    #         "CustomID": "AppGettingStartedTest"
    #         }
    #     ]
    #     }
    #     result = mailjet.send.create(data=data)
    #     print (result.status_code, 'mail')
    #     print (result.json(), 'coucou')
    def new_user_service():
        try:
            user_data = request.json
            user_data["mail"] = user_data["mail"].lower()
            user_data["name"] = user_data["name"]
            user_data["is_admin"] = False
            user_data["password"] = hash_password(user_data["password"])
            print(user_data)
            u = User(
                name = user_data["name"],
                mail = user_data["mail"],
                password=user_data["password"],
                is_admin=user_data["is_admin"],
            )
            print(u)
            print(u.__dict__)
            m.send_mail(u.mail, u.name)
            db.session.add(u)
            db.session.commit()
            
            return user_schema.dump(u)
        except Exception as e:
            print(e)
            return "erreur", 400


    @app.route("/api/user/login", methods=["POST"])
    def login_service():
        data = request.json

        try:
            data = user_schema.load(data)
            data["mail"] = data["mail"].lower()
            data["password"] = hash_password(data["password"])
        except Exception as e:
            print(str(e))
            return "erreur", 400
        user = (
        db.session.query(User)
            .filter(
                sa.and_(
                    User.mail == data["mail"],
                    User.password == data["password"]
            )
        )
        .first()
        )

        if user is not None:

            session["mail"] = data["mail"]
            session['id'] = user.id
            session['is_admin'] = user.is_admin
            user = user_schema.dump(user)

            db.session.close()
            return jsonify(user)
        else:
            db.session.close()
            return jsonify(False)


# ESTCONNECTE
    @app.route("/api/is_connected", methods=["GET"])
    def isConnected():
        if "mail" in session:
            user : User = (
                db.session.query(User).filter(User.id == session["id"]).first()
            )
            user = user_schema.dump(user)
            print(user, 'ix')
            return jsonify(user)
        else:
            return jsonify(False)

    # DECONNEXION
    @app.route("/api/logout", methods=["POST"])
    def logout():
        session.clear()
        return ""

    @app.route("/api/user/add_img/", methods=["POST"])
    def add_img():
        img = request.files["img"]
        filename = img.filename.replace("/","").replace("\\","")
        path = os.path.join(".", "assets","img", filename)

        img.save(path)
        return ''
    
    @app.route("/api/user/account/<int:id>/", methods=["GET"])
    def show_profil(id):
        try:
            i = db.session.query(User).filter(User.id == id).first()
            i = user_schema.dump(i)
            db.session.close()
            return jsonify(i)
        except Exception as e:
            print(str(e))
            import traceback
            traceback.print_exc()
            return make_response({"message": str(e)}, 404)
    
    # password
    @app.route("/api/change/password", methods=["PUT"])
    
    def change_password():
        data = request.get_json()
        print(data)
        print(data["new_password"])
        newP = data["new_password"]
        data = user_schema.load(data, unknown=EXCLUDE)
        print(data["mail"])
        newP = hash_password(newP)
        data["mail"] = data["mail"].lower()
        data["password"] = hash_password(data["password"])
        user = (
        db.session.query(User)
            .filter(
                sa.and_(
                    User.mail == data["mail"],
                    User.password == data["password"]
            )
        )
        .first()
        )
        User.password = newP
        print(user)
        db.session.commit()
        return ""

    @app.route("/api/getUser/<int:id>", methods=["GET"])
    def get_user_service(id):
        try:
            it = db.session.query(User).filter(User.id == id).all()
            it = users_schema.dump(it)
            db.session.close()
            return jsonify (it)
        except Exception as e:
            print(str(e))
            import traceback
            traceback.print_exc()
            return make_response({"message": str(e)}, 404)






