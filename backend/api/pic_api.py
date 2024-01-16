from flask import Blueprint, request
from services import new_pic_service, show_pic_service, filter_pic_city_service,filter_pic_category_service, delete_pic_service 

pic_route = Blueprint("pic_route", __name__)

@pic_route.route("/api/pic/new_pic/", methods=["POST"])
def new_pic():
    """Function to add a new pic"""
    pic_data = request.get_json()
    return new_pic_service(pic_data)

@pic_route.route("/api/pic/", methods=["GET"])
def show_all_pic():
    """Function to send pic informations under .json format"""
    return show_pic_service()

@pic_route.route("/api/pic/city/<string:city>/", methods=["GET"])
def filter_pic_city(city):
    """Function to send itenerary informations under .json format"""
    return filter_pic_city_service(city)

@pic_route.route("/api/pic/category/<string:category>/", methods=["GET"])
def filter_pic_category(category):
    """Function to send itenerary informations under .json format"""
    return filter_pic_category_service(category)

@pic_route.route("/api/pic/delete/<int:id>", methods=["DELETE"])
def delete_pic(id):
    return delete_pic_service(id)    