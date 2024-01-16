import imp
from flask import Blueprint
from services import show_category_service

category_route = Blueprint("category_route", __name__)

@category_route.route("/api/category/", methods=["GET"])
def show_all_category():
    return show_category_service()