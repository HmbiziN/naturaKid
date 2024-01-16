import os
from models import Article, article_schema, articles_schema
from utils import db
from flask import make_response, request, send_from_directory
from flask.json import jsonify

def new_article_service(article_data):
    """Function to add a new article"""
    try: 
        new_article = Article(**article_data)
        db.session.add(new_article)
        db.session.commit()
        return article_schema.dump(new_article)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def show_article_service():
    """Function to show all article"""
    try:
        articles = db.session.query(Article).order_by(Article.creation_date).all()
        articles = articles_schema.dump(articles)
        db.session.close()
        return jsonify(articles)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def show_article_detail_service(id):
    """Function to show detail article"""
    try:
        a = db.session.query(Article).filter(Article.id == id).all()
        a = articles_schema.dump(a)
        print(a, "a")
        db.session.close()
        return jsonify(a)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def delete_article_service(id):
    try:
        db.session.query(Article).filter(Article.id == id).delete()
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def update_article_service(id):
    try:
        a = db.session.query(Article).filter(Article.id == id).first()
        a.active = True
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def restore_article_service(id):
    try:
        a = db.session.query(Article).filter(Article.id == id).first()
        a.active = False
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def add_img_service():
    img = request.files["img"]
    filename = img.filename.replace("/","").replace("\\","")
    path = os.path.join(".", "assets","imgBlog", filename)
    img.save(path)
    return ''
def read_img_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/imgBlog'
    return send_from_directory(folder_path, filename, as_attachment = True)

def filter_article_service(categorie):
    try:
        a = db.session.query(Article).filter((Article.categorie == categorie) & (Article.active == False)).all()
        a = articles_schema.dump(a)
        print(a)
        db.session.close()
        return jsonify(a)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def get_article_not_archived():
    """Function to show all article"""
    try:
        articles = db.session.query(Article).filter(Article.active == False).order_by(Article.creation_date).all()
        articles = articles_schema.dump(articles)
        db.session.close()
        return jsonify(articles)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})