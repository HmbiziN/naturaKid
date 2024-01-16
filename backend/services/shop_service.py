from requests import session
from utils import db
from models import Product, product_schema, products_schema
from flask import jsonify, session, make_response, request, send_from_directory
import os
# from requests import session

def new_product_service(data):
    try:
        new_product = Product(**data)
        new_product.user_id = session['id']
        db.session.add(new_product)
        db.session.commit()
        return product_schema.dump(new_product)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def add_imgShop_service():
    img = request.files["img"]
    filename = img.filename.replace("/","").replace("\\","")
    path = os.path.join(".", "assets","imgShop", filename)
    img.save(path)
    return ''
def read_imgShop_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/imgShop'
    return send_from_directory(folder_path, filename, as_attachment = True)

def get_all_products_service():
    try:
        products = db.session.query(Product).all()
        products = products_schema.dump(products)
        db.session.close()
        return jsonify(products)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def get_all_products_for_confirm_service():
    try:
        products = db.session.query(Product).filter(Product.confirm == False).all()
        products = products_schema.dump(products)
        db.session.close()
        return jsonify(products)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def get_all_products_validated_products_service():
    try:
        products = db.session.query(Product).filter(Product.confirm == True).all()
        products = products_schema.dump(products)
        db.session.close()
        return jsonify(products)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def read_imgShop_service(filename):
    from pathlib import Path
    root = Path('.')
    folder_path = root/'assets/imgShop'
    return send_from_directory(folder_path, filename, as_attachment = True)

def get_detail_product_service(id):
    try:
        p = db.session.query(Product).filter(Product.id==id).all()
        p =products_schema.dump(p)
        db.session.close()
        return jsonify(p)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def update_for_confirm(id):
    try:
        p = db.session.query(Product).filter(Product.id == id).first()
        p.confirm = True
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def delete_product_service(id):
    try:
        db.session.query(Product).filter(Product.id == id).delete()
        db.session.commit()
        return ""
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def multiple_filter_service(department, gender, category, cut):
    try:
        p = db.session.query(Product).filter((Product.department == department) & (Product.gender == gender)& (Product.category == category)& (Product.cut == cut)).all()
        p = products_schema.dump(p)
        db.session.close()
        return jsonify(p)
    except Exception as e:
        print(str(e))
        import traceback

        traceback.print_exc()
        return make_response({"message": str(e)}, 404)

def get_products_by_gender(gender):
    try:
        products = db.session.query(Product).filter(Product.gender == gender).all()
        products = products_schema.dump(products)
        db.session.close()
        return jsonify(products)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def get_products_by_user():
    try:
        id= session['id']
        products = db.session.query(Product).filter(Product.user_id == id).all()
        products = products_schema.dump(products)
        db.session.close()
        return jsonify(products)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})

def update_product_service(id,data):
    print('coucou')
    print(data, 'data')
    try:
        
        product_modif = Product(**data)
        product = db.session.query(Product).filter(Product.id == id).first()
        product.title = product_modif.title
        product.content = product_modif.content
        product.user_id = product_modif.user_id
        product.id = product_modif.id
        product.gender = product_modif.gender
        product.category = product_modif.category
        product.cut = product_modif.cut
        product.price = product_modif.price
        product.department = product_modif.department
        product.city = product_modif.city
        product.img = product_modif.img
        product.confirm = False
        db.session.commit()
        return product_schema.dump(product)
    except Exception as e:
        print(str(e))
        import traceback
        traceback.print_exc()
        return make_response({"message": str(e)})