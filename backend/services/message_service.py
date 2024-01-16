from sqlalchemy import desc
from utils import db
from models import Message, message_schema, messages_schema
from flask import make_response, session, jsonify

def new_message_service(data):
    try:
        print(data)
        # print(session["id"] , "session", session["name"])
        new_msg = Message(**data)
        new_msg.user_sender = session['id']
        # new_msg.name_sender = session['mail']
        db.session.add(new_msg)
        db.session.commit()
        return message_schema.dump(new_msg)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def get_all_messages_received():
    try:
        us = session["id"]
        m = db.session.query(Message).filter(Message.user_recipient == us).order_by(Message.id.desc()).all()
        m = messages_schema.dump(m)
        db.session.close()
        return jsonify(m)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def get_detail_message_service(id):
    try:
        m = db.session.query(Message).filter(Message.id==id).all()
        m =messages_schema.dump(m)
        db.session.close()
        return jsonify(m)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def update_if_read(id):
    try:
        m = db.session.query(Message).filter(Message.id == id).first()
        m.actif = True
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def delete_message_service(id):
    try:
        db.session.query(Message).filter(Message.id == id).delete()
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def get_messages_not_read():
    try:
        us = session["id"]
        m = db.session.query(Message).filter_by(Message.user_recipient == us).order_by(Message.id.desc()).all()
        m = messages_schema.dump(m)
        db.session.close()
        return jsonify(m)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})