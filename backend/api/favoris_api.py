from flask import Blueprint, request
from services import addFavorisService, get_favoris, delete_favoris
favoris_route = Blueprint("favoris_route", __name__)

@favoris_route.route("/api/favoris/add/", methods=["POST"])
def addFavoris():
    data = request.get_json()
    return addFavorisService(data)

@favoris_route.route("/api/getFavorite/", methods=["GET"])
def getFavorisForUser():
    return get_favoris()

@favoris_route.route("/api/deleteFavorite/<int:id>", methods=["DELETE"])
def deleteFavorisForUser(id):
    return delete_favoris(id)