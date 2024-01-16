import cv2

d = cv2.QRCodeDetector()

val, points, qrcode = d.detectAndDecode(cv2.imread("liste_parcours.png"))
val, points, qrcode = d.detectAndDecode(cv2.imread("parcours1.png"))
print(val)