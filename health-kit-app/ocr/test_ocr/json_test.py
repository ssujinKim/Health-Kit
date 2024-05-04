import json
import ipdb
import pandas as pd

with open( 'ocr/json_file/test4.json', encoding='utf-8') as file:
    datas = json.load(file)

field_data= datas['images'][0]['fields']
text_list = None
def field_infertext(field_data):
    global text_list
    text_list = []
    for i in range(len(field_data)):
        if ('탄수화무'in field_data[i]['inferText'] or '탄수화믈'in field_data[i]['inferText']or '탄수화몰'in field_data[i]['inferText']or'탄수와믈'in field_data[i]['inferText']or'탄수와몰'in field_data[i]['inferText']or'탄수와물'in field_data[i]['inferText']):
            field_data[i]['inferText'] = field_data[i]['inferText'].replace(field_data[i]['inferText'],'탄수화물')
        text_list.append(field_data[i]['inferText'])
    #return " ".join(text_list)
    return text_list
infer_sentence=field_infertext(field_data)
del infer_sentence[0]



# 데이터 전처리
name = ['총 내용량', '나트륨', '탄수화물', '당류', '지방', '트랜스지방', '포화지방', '콜레스테롤', '단백질', '비타민B1', '비타민B2', '비타민B6', '칼슘', '금상','1일']
result = {}

current_item = None
current_values = []

for item in infer_sentence:
    if item in name: #만약 item이 name 안에 있다면
        if current_item is not None: #맨 처음 빼고 가능 
            if len(current_values) % 2 == 0:
                current_values = [current_values[i] + current_values[i+1] for i in range(0,len(current_values),2)]
            result[current_item] = current_values #만약 current_item이 변경되면 딕셔너리 형태로 전체를 저장
        current_item = item #맨 처음엔 걔가 item으로 변경됨 이후엔 다음 name 요소가 item으로 변경
        current_values = [] #리스트 초기화
    else:
        current_values.append(item)#name 요소 외에 모두 value로 넣어짐

# 마지막 요소 추가
#if current_item is not None:
#    result[current_item] = current_values

# g 전처리 

for key,val in result.items():
    for i,v in enumerate(val):
        if v == 'g':
            result[key][i] = '0g'
        if len(val) == 1:
            result[key].append('NaN')

df = pd.DataFrame(result)

print(df)