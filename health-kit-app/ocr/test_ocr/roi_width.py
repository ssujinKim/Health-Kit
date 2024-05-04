import requests
import uuid
import time
import json
import base64
import cv2
import ipdb
import sys

path = 'ocr/to/photo.jpg'

#57 36 680 448
image = cv2.imread(path)
image = cv2.resize(image,(550,550))
x = 10
y = 200
width = 530
height = 150

roi = image[y:y+height, x:x+width]
color = (0,0,255)
thickness = 5
cv2.rectangle(img=roi,pt1=(0,0),pt2=(width,height),color = color ,thickness = thickness)
cv2.imshow('image',image)
cv2.waitKey()
cv2.imwrite('ocr/roi_img/roi_img2.png',roi)
cv2.destroyAllWindows()

path = 'ocr/roi_img/'
with open(path + "roi_img2.png", "rb") as f:
    img = base64.b64encode(f.read())

URL = 'https://br2v3ztqo2.apigw.ntruss.com/custom/v1/29704/b24823359e042057eab283525ace201f34c9cd5c8c2a53214a43b5f4dd6b268d/general'
KEY = 'TWNsdFhOQlZTU3JsVEx0R1hxaFRDbXpnblBBYUxmUFE='


output_file = 'ocr/json_file/test4.json'

headers = {
    "Content-Type": "application/json",
    "X-OCR-SECRET": KEY
}
    
data = {
    "version": "V1",
    "requestId": "sample_id", # 요청을 구분하기 위한 ID, 사용자가 정의
    "timestamp": 0, # 현재 시간값
    "images": [
        {
            "name": "sample_image",
            "format": "png",
            "data": img.decode('utf-8')
        }
    ]
}
data = json.dumps(data)
response = requests.post(URL, data=data, headers=headers)
res = json.loads(response.text)
print(res)
#sys.stdout.flush()



with open(output_file, 'w', encoding='utf-8') as outfile:
    json.dump(res, outfile, indent=4, ensure_ascii=False)
    