import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask, send_from_directory
from flask_cors import CORS
from utils import db
from services.user_service import setup_route
# from api import blog_route
from api import itinerary_route, blog_route, category_route, pic_route, favoris_route, shop_route, message_route, pil_route

app = Flask(__name__)
cors = CORS(
        app,
        supports_credentials=True,
        origins="*",
        allow_headers=["Cookie", "content-type"],
    )

@app.route("/<path:path>", methods=["GET"])
def get_catchall(path: str) :
    if path =="":
        path = "index.html"
    return send_from_directory("/home/lyzc8224/public_html", path)

def setup_db_o2switch():
    db_url = "localhost:3306"
    db_name = "lyzc8224_soutenance"
    db_user = "lyzc8224"
    db_password = "fxAn-xMvp-p2v?"
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "pool_pre_ping": True
    }
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"mysql+mysqldb://{db_user}:{db_password}@{db_url}/{db_name}"

def setup_db_local():
    db_url = "localhost:5432"
    db_name = "soutenance"
    db_user = "postgres"
    db_password = "orbe"
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"postgresql://{db_user}:{db_password}@{db_url}/{db_name}"

setup_db_o2switch()

app.config["SECRET_KEY"] = "MLJGMFHGFLINGFMINDM986497408£**dslfihsjdf-66"
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_PATH"] = "/"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
with app.app_context():
    db.create_all()
    db.session.commit()

setup_route(app)
app.register_blueprint(itinerary_route)
app.register_blueprint(blog_route)
app.register_blueprint(category_route)
app.register_blueprint(pic_route)
app.register_blueprint(favoris_route)
app.register_blueprint(shop_route)
app.register_blueprint(message_route)
app.register_blueprint(pil_route)

if __name__ == "__main__":
    app.config["development"] = True
    app.run(host="0.0.0.0", port=5000, debug=True)


