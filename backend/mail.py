from mailjet_rest import Client

import os
def send_mail(dest, name):
    api_key = '12274b95b878786fffa0244c97c17323'
    api_secret = '819215a7c122e26fbda17710805024d2'
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')
    data = {
      'Messages': [
        {
          "From": {
            "Email": "haureln@protonmail.com",
            "Name": "Natura-kid"
          },
          "To": [
            {
              "Email": dest,
              "Name": name
            }
          ],
          "Subject": "Bienvenue!",
          "TextPart": "My first Mailjet email",
          "HTMLPart": "<h3>Natura Kid vous souhaite la bienvenue!</h3><br />Retrouvez tous les parcours!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
    }
    result = mailjet.send.create(data=data)
    print (result.status_code, 'mail')
    print (result.json())

# def send_mail_contact(exp, name, txt):
#     api_key = '12274b95b878786fffa0244c97c17323'
#     api_secret = '819215a7c122e26fbda17710805024d2'
#     mailjet = Client(auth=(api_key, api_secret), version='v3.1')
#     data = {
#       'Messages': [
#         {
#           "From": {
#             "Email": "haureln@protonmail.com",
#             "Name": "Natura-kid"
#           },
#           "To": [
#             {
#               "Email": "aurebes@gmail.com",
#               "Name": "aurelie"
#             }
#           ],
#           "Subject": "message du site",
#           "TextPart": "My first Mailjet email",
#           "HTMLPart": txt,
#           "CustomID": "AppGettingStartedTest"
#         }
#       ]
#     }
#     result = mailjet.send.create(data=data)
#     print (result.status_code, 'mail')
#     print (result.json())