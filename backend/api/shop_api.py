from services import new_product_service, add_imgShop_service, get_all_products_service, read_imgShop_service, get_detail_product_service, update_for_confirm, delete_product_service, get_all_products_for_confirm_service, get_all_products_validated_products_service, multiple_filter_service, get_products_by_gender,get_products_by_user, update_product_service

from flask import Blueprint, request

shop_route = Blueprint("shop_route", __name__)

@shop_route.route("/api/shop/add/", methods=["POST"])
def addProduct():
    data = request.get_json()
    return new_product_service(data)

@shop_route.route("/api/shop/add_img/", methods=["POST"])
def add_img():
    """Function to send itenerary informations under .json format"""
    return add_imgShop_service()

@shop_route.route("/api/shop/", methods=["GET"])
def get_products():
    return get_all_products_service()

@shop_route.route("/api/shop/toConfirm/", methods=["GET"])
def get_products_form_confirm():
    return get_all_products_for_confirm_service()

@shop_route.route("/api/shop/validated/", methods=["GET"])
def get_products_validated_products():
    return get_all_products_validated_products_service()

@shop_route.route("/api/shop/read_img/<string:filename>/", methods=["GET"])
def read_imgShop(filename):
    return read_imgShop_service(filename)

@shop_route.route("/api/shop/detail/<int:id>/", methods=["GET"])
def get_detail(id):
    return get_detail_product_service(id)

@shop_route.route("/api/shop/update/<int:id>", methods=["PUT"])
def update_product(id: int):
    return update_for_confirm(id)

@shop_route.route("/api/shop/delete/<int:id>", methods=["DELETE"])
def delete_product(id):
    return delete_product_service(id)

@shop_route.route("/api/shop/filter/multiple/<string:department>/<string:gender>/<string:category>/<string:cut>", methods=["GET"])
def filter_multiple_itinerary(department, gender, category, cut):
    return multiple_filter_service(department, gender, category, cut)

@shop_route.route("/api/shop/filter/<string:gender>", methods=["GET"])
def filter_gender(gender):
    return get_products_by_gender(gender)

@shop_route.route("/api/shop/my/products", methods=["GET"])
def get_my_products():
    return get_products_by_user()

@shop_route.route("/api/shop/modif/<int:id>", methods=["PUT"])
def update_products(id):
    data = request.get_json()
    print("route")
    return update_product_service(id, data)