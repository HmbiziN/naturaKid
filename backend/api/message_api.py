from flask import Blueprint, request
from mailjet_rest import Client

from services.message_service import new_message_service, get_all_messages_received, get_detail_message_service, update_if_read, delete_message_service, get_messages_not_read

message_route = Blueprint("message_route", __name__)

@message_route.route("/api/new/message/", methods=["POST"])
def newMessage():
    data = request.get_json()
    return new_message_service(data)

@message_route.route("/api/messages/", methods=["GET"])
def getMessagesReceveid():
    return get_all_messages_received()

@message_route.route("/api/messages/detail/<int:id>/", methods=["GET"])
def getMessageDetail(id):
    return get_detail_message_service(id)

@message_route.route("/api/messages/update/<int:id>", methods=["PUT"])
def if_read(id: int):
    return update_if_read(id)

@message_route.route("/api/messages/delete/<int:id>", methods=["DELETE"])
def delete_message(id):
    return delete_message_service(id)

@message_route.route("/api/messages/not/read/", methods=["GET"])
def getMessagesNotRead():
    return get_messages_not_read()

@message_route.route("/api/messages/admin/", methods=["POST"])
def test():
    data = request.get_json()
    print(data["subject"], 'dans service')
    sender = data["senderMail"]
    api_key = '12274b95b878786fffa0244c97c17323'
    api_secret = '819215a7c122e26fbda17710805024d2'
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')
    data = {
        'Messages': [
            {
            "From": {
                "Email": "haureln@protonmail.com",
                "Name": data["name"]
            },
            "To": [
                {
                "Email": "aurebes@gmail.com",
                "Name": "Natura-kid"
                }
            ],
            "Subject": data["subject"]+ sender,
            "TextPart": "My first Mailjet email",
            "HTMLPart": data["message"],
            "CustomID": "AppGettingStartedTest"
            }
        ]
        }
    result = mailjet.send.create(data=data)
    print (result.status_code, 'mail')
    return ""