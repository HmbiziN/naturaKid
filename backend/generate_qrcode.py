import qrcode
from qrcode.constants import ERROR_CORRECT_L

# img = qrcode.make('http://localhost:4200/list_road')
# img.save('liste_parcours.png')
qr = qrcode.QRCode(
    version=3,
    error_correction=ERROR_CORRECT_L,
    box_size=3,
    border=5
    )
qr.add_data('https://frugeres.natura-kid.fr/#/welcome-frugeres/')
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save('point_info_frugeres_1.png')

qr = qrcode.QRCode(
    version=3,
    error_correction=ERROR_CORRECT_L,
    box_size=3,
    border=5
    )
qr.add_data('https://frugeres.natura-kid.fr/#/welcome-frugeres-pi2')
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save('point_info_frugeres_2.png')

qr = qrcode.QRCode(
    version=3,
    error_correction=ERROR_CORRECT_L,
    box_size=3,
    border=5
    )
qr.add_data('https://frugeres.natura-kid.fr/#/welcome-frugeres-pi3')
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save('point_info_frugeres_3.png')