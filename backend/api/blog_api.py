from flask import Blueprint, request
from services import new_article_service, show_article_service, show_article_detail_service, delete_article_service, update_article_service, restore_article_service, read_img_service,add_img_service, filter_article_service,get_article_not_archived

blog_route = Blueprint("blog_route", __name__)

@blog_route.route("/api/blog/new_article/", methods=["POST"])
def new_article():
    """Function to add a new article"""
    data = request.get_json()
    return new_article_service(data)

@blog_route.route("/api/blog/", methods=["GET"])
def show_all_article():
    """Function to send article informations under .json format"""
    return show_article_service()

@blog_route.route("/api/blog/not/archived/", methods=["GET"])
def get_article_not():
    return get_article_not_archived()

@blog_route.route("/api/blog/detail/<int:id>/", methods=["GET"])
def show_detail(id):
    print(id, "id")
    """Function to send article informations under .json format"""
    return show_article_detail_service(id)

@blog_route.route("/api/blog/delete/<int:id>", methods=["DELETE"])
def delete_article(id):
    return delete_article_service(id)

@blog_route.route("/api/blog/update/<int:id>", methods=["PUT"])
def update_article(id: int):
    return update_article_service(id)

@blog_route.route("/api/blog/restore/<int:id>", methods=["PUT"])
def restore_article(id: int):
    return restore_article_service(id)

@blog_route.route("/api/blog/read_img/<string:filename>/", methods=["GET"])
def read_img(filename):
    """Function to send itenerary informations under .json format"""
    return read_img_service(filename)

@blog_route.route("/api/blog/add_img/", methods=["POST"])
def add_img():
    """Function to send itenerary informations under .json format"""
    return add_img_service()

@blog_route.route("/api/blog/filter/<string:categorie>/", methods=["GET"])
def filter_article(categorie):
    """Function to send article informations under .json format"""
    return filter_article_service(categorie)