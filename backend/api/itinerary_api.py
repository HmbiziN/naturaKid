from flask import Blueprint, request
from services.itinerary_service import get_favoris_itinerary
# from backend.services.itinerary_service import favoris_service
from services import new_itinerary_service, show_itinerary_service, show_itinerary_detail_service, add_file_service, add_gpx_service, read_gpx_service, filter_itinerary_service, download_gpx_service, download_pdf_service,filter_itinerary_city_service,filter_itinerary_complexity_service,filter_itinerary_label_false_service,filter_itinerary_label_true_service, delete_itinerary_service, add_img_service, read_img_service, favoris_service, show_itinerary_spotlight_service, filter_test_service, filter_multiple_service

itinerary_route = Blueprint("itinerary_route", __name__)

@itinerary_route.route("/api/itinerary/new_itenerary/", methods=["POST"])
def new_itinerary():
    """Function to add a new itinerary"""
    data = request.get_json()
    return new_itinerary_service(data)

@itinerary_route.route("/api/itenerary/", methods=["GET"])
def show_all_itenerary():
    """Function to send itenerary informations under .json format"""
    return show_itinerary_service()

@itinerary_route.route("/api/itenerary/spotlight", methods=["GET"])
def show_spotlight_itenerary():
    """Function to send itenerary informations under .json format"""
    return show_itinerary_spotlight_service()

@itinerary_route.route("/api/itenerary/detail/<int:id>/", methods=["GET"])
def show_detail(id):
    """Function to send itenerary informations under .json format"""
    return show_itinerary_detail_service(id)

@itinerary_route.route("/api/itenerary/add_file/", methods=["POST"])
def add_file():
    """Function to send itenerary informations under .json format"""
    return add_file_service()

@itinerary_route.route("/api/itenerary/add_gpx/", methods=["POST"])
def add_gpx():
    """Function to send itenerary informations under .json format"""
    return add_gpx_service()

@itinerary_route.route("/api/itenerary/add_img/", methods=["POST"])
def add_img():
    """Function to send itenerary informations under .json format"""
    return add_img_service()

@itinerary_route.route("/api/itinerary/filter/<int:filtre>/", methods=["GET"])
def filter_itinerary(filtre: int):
    """Function to send itenerary informations under .json format"""
    return filter_itinerary_service(filtre)

@itinerary_route.route("/api/itinerary/filter/complexity/<int:complexity>/", methods=["GET"])
def filter_itinerary_complexity(complexity: int):
    """Function to send itenerary informations under .json format"""
    return filter_itinerary_complexity_service(complexity)

@itinerary_route.route("/api/itinerary/filter/city/<string:city>/", methods=["GET"])
def filter_itinerary_city(city):
    """Function to send itenerary informations under .json format"""
    return filter_itinerary_city_service(city)

@itinerary_route.route("/api/itinerary/filter/label/false", methods=["GET"])
def filter_itinerary_label_false():
    """Function to send itenerary informations under .json format"""
    return filter_itinerary_label_false_service()

@itinerary_route.route("/api/itinerary/filter/label/true", methods=["GET"])
def filter_itinerary_label_true():
    """Function to send itenerary informations under .json format"""
    return filter_itinerary_label_true_service()

@itinerary_route.route("/api/itinerary/read_gpx/<string:filename>/", methods=["GET"])
def read_gpx(filename):
    """Function to send itenerary informations under .json format"""
    return read_gpx_service(filename)

@itinerary_route.route("/api/itinerary/read_img/<string:filename>/", methods=["GET"])
def read_img(filename):
    """Function to send itenerary informations under .json format"""
    return read_img_service(filename)

@itinerary_route.route("/api/itinerary/download_gpx/<string:filename>/", methods=["GET"])
def download_gpx(filename):
    """Function to send itenerary informations under .json format"""
    return download_gpx_service(filename)

@itinerary_route.route("/api/itinerary/download_pdf/<string:filename>/", methods=["GET"])
def download_pdf(filename):
    """Function to send itenerary informations under .json format"""
    return download_pdf_service(filename)

@itinerary_route.route("/api/itinerary/delete/<int:id>", methods=["DELETE"])
def delete_itinerary(id):
    return delete_itinerary_service(id)

@itinerary_route.route("/api/itinerary/favoris/", methods=["POST"])
def favoris_itinerary():
    return favoris_service()

@itinerary_route.route("/api/getFavoriteItinereary/", methods=["GET"])
def getFavorisForUser():
    return get_favoris_itinerary()

@itinerary_route.route("/api/itinerary/filter/test/<int:filtre>/<int:complexity>/", methods=["GET"])
def filter_test_itinerary(filtre: int, complexity: int):
    """Function to send itenerary informations under .json format"""
    return filter_test_service(filtre, complexity)

@itinerary_route.route("/api/itinerary/filter/multiple/<int:filtre>/<int:complexity>/<string:label>/", methods=["GET"])
def filter_multiple_itinerary(filtre: int, complexity: int, label: int):
    """Function to send itenerary informations under .json format"""
    return filter_multiple_service(filtre, complexity, label)