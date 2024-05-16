import requests
import uuid
import time
import json
import base64
import cv2
import ipdb

#네이버 ocr key
URL = 'https://br2v3ztqo2.apigw.ntruss.com/custom/v1/29704/b24823359e042057eab283525ace201f34c9cd5c8c2a53214a43b5f4dd6b268d/general'
KEY = 'TWNsdFhOQlZTU3JsVEx0R1hxaFRDbXpnblBBYUxmUFE='

#이미지 받아오기 test 이미지임
path = 'ocr/to/photo.jpg'

#이미지 불러오기 후 화면에 5초 보여줌
# 변경 사항 -> roi 없이 이미지 그대로 roi_img로 받아오게 됨 
image = cv2.imread(path) #이미지 로드
cv2.imshow('image',image) #이미지 보여줌
cv2.waitKey(5000) #5초 정도 후 꺼짐 
#roi_img 경로로 이미지 저장 이후 ocr 인식이 되는 최종 이미지임
cv2.imwrite('ocr/roi_img/roi_img.png',image) 
#시스템 정리
cv2.destroyAllWindows()

#위에서 저장된 roi_img를 받아와서 ocr로 읽어온 후 json 파일로 저장 --- 
path = 'ocr/roi_img/'
with open(path + "roi_img.png", "rb") as f:
    img = base64.b64encode(f.read())

#json 파일로 저장될 경로 지정
output_file = 'ocr/json_file/img_json_file.json'

#ocr 코드
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

#json 파일로 변경 코드 
data = json.dumps(data)
response = requests.post(URL, data=data, headers=headers)
res = json.loads(response.text)
print('파이썬 실행됨!')

#json 데이터를 파일에 저장하는 코드
with open(output_file, 'w', encoding='utf-8') as outfile:
    json.dump(res, outfile, indent=4, ensure_ascii=False)
    