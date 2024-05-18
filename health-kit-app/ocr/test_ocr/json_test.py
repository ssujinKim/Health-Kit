import json
import ipdb
import pandas as pd
import re

#json 파일 읽어오기
with open( 'ocr/json_file/img_json_file.json', encoding='utf-8') as file:
    datas = json.load(file)
#json 파일 접근 코드 -> json 파일에 inferText에 접근하여 영양정보 추출
field_data= datas['images'][0]['fields']
text_list = None
def field_infertext(field_data):
    global text_list
    text_list = []
    for i in range(len(field_data)):
        if ('탄수화무'in field_data[i]['inferText'] or '탄수화믈'in field_data[i]['inferText']or '탄수화몰'in field_data[i]['inferText']or'탄수와믈'in field_data[i]['inferText']or'탄수와몰'in field_data[i]['inferText']or'탄수와물'in field_data[i]['inferText']):
            field_data[i]['inferText'] = field_data[i]['inferText'].replace(field_data[i]['inferText'],'탄수화물')
        elif ('종 내용당'in field_data[i]['inferText'] or '내용량'in field_data[i]['inferText']):
            field_data[i]['inferText'] = field_data[i]['inferText'].replace(field_data[i]['inferText'],'총 내용량')
        if ('1일'in field_data[i]['inferText'] or '1일 영양성분'in field_data[i]['inferText']or '1일영양성분'in field_data[i]['inferText']):
            break
        text_list.append(field_data[i]['inferText'])
    return text_list
infer_sentence=field_infertext(field_data)


# 데이터 전처리
#name은 추가될 수 있음
name = "나트륨|탄수화물|당류|지방|트랜스지방|포화지방|콜레스테롤|단백질|비타민B1|비타민B2|비타민B6|칼슘"
name_lst = ['나트륨','탄수화물','당류','지방','트랜스지방','포화지방','콜레스테롤','단백질','비타민B1','비타민B2','비타민B6','비타민A','비타민C','비타민D','비타민E','칼슘']
result = {}
#딕셔너리 형태로 받아옴 ex) {나트륨:610mg,31%, 탄수화물:54g,17%, ....}
current_item = None
current_values = []

for item in infer_sentence:
    m_item=re.match(name, item)
    if m_item is not None:
        if current_item is not None:
            result[current_item] = current_values
        key_string=m_item.group()
        value_string=item.replace(key_string, "")
        current_item = key_string 
        if len(value_string) != 0: 
            current_values = [value_string] #리스트 초기화
        else:
            current_values = []
    else:
        current_values.append(item)#name

# 마지막 요소 추가
if current_item is not None:
    result[current_item] = current_values


#위에 받아온 정보들을 전처리 하고 데이터 프레임으로 받아올 수 있도록 정제
# g전처리 + 정규표현식 + value 에러 전처리----------------------------
for key,val in result.items():
    for i,v in enumerate(val):
        if len(val) != 0:
            result[key][i] = re.findall(r'\d+|[a-zA-Z]+|%+', v)
    result[key] = sum(val,[])
     

my_list = []  
lst_2 = []
key_name = list(result.keys())[0]

#--- 변경부분 ) 69 ~93 코드 부분 변경 다시 적용 부탁드려요 0g으로 수정이 안되는거 같길래 수정했어용
for key_2, val_2 in result.items():
    for idx, v_2 in enumerate(val_2):
        if len(my_list) == 0:
            my_list.append(v_2)
        elif re.search(r'[0-9a-zA-Z]|%', v_2):  
            if re.search(r'g|mg|%$', my_list[-1]):  
                join_str = ''.join(my_list)
                if re.match(r'^0\d.', join_str):
                    join_str = re.sub(r'^0', '0.', join_str)
                lst_2.append(join_str)
                my_list = [] #리셋
            my_list.append(v_2)
        if len(lst_2) != 0 and idx == 0:
            if len(lst_2) == 1: 
                lst_2.append('Nan')
            if lst_2[0] == 'g': 
                print('g',lst_2[0]) 
                lst_2[0] = '0g'   #'0g'인데 'g'으로만 인식이 되어 '0g'으로 전처리
            if len(lst_2) == 0:
                lst_2.append('Nan','Nan')
            result[key_name] = lst_2
            key_name = key_2
            lst_2 = [] #리셋
#----


if len(my_list) != 0:
    join_str = ''.join(my_list)
    lst_2.append(join_str)
    result[key_name] = lst_2

#---변경 부분) 없는 영양성분에 nan 값 넣어서 데이터 프레임에 추가함
nan = ['Nan','Nan']
for name_ls in name_lst:
    if name_ls not in result:
        result[name_ls]=nan

#데이터 프레임으로 받아오기         
df = pd.DataFrame(result)
print(df)