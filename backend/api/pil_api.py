from flask import Blueprint, request
from services import new_pil_service, get_pil_with_id_itinerary

pil_route = Blueprint("pil_route", __name__)

@pil_route.route("/api/pil/new_pil/", methods=["POST"])
def new_pil():
    data = request.get_json()
    return new_pil_service(data)

@pil_route.route("/api/pil/<int:id_i>/", methods=["POST"])
def get_pil_for_itinerary(id_i):
    return get_pil_with_id_itinerary(id_i)


