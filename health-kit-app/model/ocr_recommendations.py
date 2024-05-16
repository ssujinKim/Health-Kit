# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
import random
import re
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

import sys
import json

# 인자로 전달된 사용자 정보와 식단 정보를 로드합니다.
user_info = json.loads(sys.argv[1])
diet_info = json.loads(sys.argv[2])

# user_info 딕셔너리에서 필요한 값을 추출합니다.
age = user_info[0].get('age')
gender = user_info[0].get('gender')
disease = user_info[0].get('disease1', [])  # 기본값으로 빈 리스트를 설정하였습니다.


file_path = 'C:/Users/kkuu2/Downloads/food_data.csv'
df = pd.read_csv(file_path, encoding='utf-8')
df.fillna(0, inplace=True)
file_path2 = 'C:/Users/kkuu2/Downloads/질병.csv'
dis = pd.read_csv(file_path2, encoding='utf-8')
file_path3 = 'C:/Users/kkuu2/Downloads/modified_merged_data.csv'
med = pd.read_csv(file_path3, encoding='utf-8')
file_path4 = 'C:/Users/kkuu2/Downloads/정렬데이터.csv'
sor = pd.read_csv(file_path4, encoding='utf-8')

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

class Person:
    disease = []
    today_kcal = []
    today_pro = []
    today_car = []
    today_fat = []
    def cal_nut(self): #연령별로 칼로리계산
        if self.age <= 18:
            self.Kcal = 2700
        elif self.age <= 29:
            self.Kcal = 2600
        elif self.age <= 49:
            self.Kcal = 2400
        elif self.age <= 64:
            self.Kcal = 2200
        elif self.age <= 74:
            self.Kcal = 2300
        else:
            self.Kcal = 2000

        if self.gender == 'female':
            self.Kcal -= 400
    #생성자 함수
    def __init__(self, age, gender, carbo=324, sug=100, fats=54, tran=100, satf=14, chol=300, prot=55, calc=700, sodi=2000, today_kcal=None, today_pro=None, today_car=None, today_fat=None, disease=None):
        self.age = age
        self.gender = gender
        self.Kcal = 0
        self.carbo = int(carbo)
        self.sugars = int(sug)
        self.fats = int(fats)
        self.trans_fats = int(tran)
        self.saturated_fats = int(satf)
        self.cholesterol = int(chol)
        self.protein = int(prot)
        self.calcium = int(calc)
        self.sodium = int(sodi)
        self.disease = disease
        self.cal_nut()
        self.error()
        self.today_kcal = today_kcal if today_kcal is not None else []
        self.today_pro = today_pro if today_pro is not None else []
        self.today_car = today_car if today_car is not None else []
        self.today_fat = today_fat if today_fat is not None else []

    #일일영양성분 초과시 에러안내문
    def error(self):
        negative_values = {}
        if self.carbo < 0:
            negative_values['carbo'] = self.carbo
        if self.sugars < 0:
            negative_values['sugars'] = self.sugars
        if self.fats < 0:
            negative_values['fats'] = self.fats
        if self.trans_fats < 0:
            negative_values['trans_fats'] = self.trans_fats
        if self.saturated_fats < 0:
            negative_values['saturated_fats'] = self.saturated_fats
        if self.cholesterol < 0:
            negative_values['cholesterol'] = self.cholesterol
        if self.protein < 0:
            negative_values['protein'] = self.protein
        if self.calcium < 0:
            negative_values['calcium'] = self.calcium
        if self.sodium < 0:
            negative_values['sodium'] = self.sodium
        
        if negative_values:
            for key, value in negative_values.items():
                print("일일 영양성분 초과입니다 ")
                print(f"{key}")
    #매일 매일 섭취정보 초기화
    def daily_reset(self):
        self.cal_nut()
        self.carbo = self.c
        self.sugars = self.s
        self.fats = self.f
        self.trans_fats = self.t
        self.saturated_fats = self.sa
        self.cholesterol = self.ch
        self.protein = self.p
        self.calcium = self.ca
        self.sodium = self.so
        self.today_pro = []
        self.today_car = []
        self.today_fat = []

    #여유분의 에너지 반환
    def extra_nut(self):
        return (self.Kcal, self.carbo, self.sugars, self.fats, 
                self.trans_fats, self.saturated_fats, self.cholesterol, 
                self.protein, self.calcium, self.sodium)

    #음식 섭취시 불러오는 함수
    def eat(self, kal=0, car=0, sug=0, fat=0, trans=0, sat=0, chol=0, pro=0, cal=0, sod=0):
        self.Kcal -= kal
        self.carbo -= car
        self.sugars -= sug
        self.fats -= fat
        self.trans_fats -= trans
        self.saturated_fats -= sat
        self.cholesterol -= chol
        self.protein -= pro
        self.calcium -= cal
        self.sodium -= sod
        self.append_eat(kal,pro,car,fat) #음식 섭취시에 자동으로 추가
        
    def custom(self, **key):
        for nut, val in key.items():
            if hasattr(self, nut):
                setattr(self, nut, val)

    #질병 반환
    def disease_return(self):
        return self.disease
    #질병 추가
    def append_disease(self,disease):
        self.disease.append(disease)
    #오늘 섭취한음식 리스트에 추가 그림그리기용
    def append_eat(self, kcal, pro, car, fat): #오늘 섭취한 음식 추가
        if len(self.today_kcal) > 0:
            kcal += self.today_kcal[-1] 
        self.today_kcal.append(kcal)
        self.today_pro.append(pro)
        self.today_car.append(car)
        self.today_fat.append(fat)
    #오늘 섭취한 음식 리스트 반환
    def return_eat(self):
        return self.today_kcal, self.today_pro, self.today_car, self.today_fat
    
import json
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
#ipdb.set_trace()
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
            if len(lst_2) == 1 and lst_2 =='g':  
                lst_2 = '0g'   #'0g'인데 'g'으로만 인식이 되어 '0g'으로 전처리
            elif len(lst_2) == 1: 
                lst_2.append('Nan')
            elif len(lst_2) == 0:
                lst_2.append('Nan','Nan')
            result[key_name] = lst_2
            key_name = key_2
            lst_2 = [] #리셋

if len(my_list) != 0:
    join_str = ''.join(my_list)
    lst_2.append(join_str)
    result[key_name] = lst_2



def consume_food(per, kal=0, car=0, sug=0, fat=0, trans=0, sat=0, chol=0, pro=0, cal=0, sod=0):
    # 오늘의 여유분 계산
    kcal, carbo, sugars, fats, trans_fats,sat_fats, cholesterol, protein, calcium, sodium = per.extra_nut()  
    
    if all([
        kcal >= kal,
        carbo >= car,
        sugars >= sug,
        fats >= fat,
        trans_fats >= trans,
        sat_fats >= sat,
        cholesterol >= chol,
        protein >= pro,
        calcium >= cal,
        sodium >= sod
    ]):
        print("섭취 가능한 품목입니다.")
    else:
        print("일일 영양섭취 초과입니다.")
#섭취가능여부를 판별하지 않고 섭취
def consume_food2(per, kal=0, car=0, sug=0, fat=0, trans=0, sat=0, chol=0, pro=0, cal=0, sod=0): #무조건 먹는거
    per.eat(kal, car, sug, fat, trans, sat, chol, pro, cal, sod)
    print("입력한 데이터가 입력되었습니다.")
def con_df(df, per):
    sodium = make_num(df.at[0, '나트륨'])
    carbohydrates = make_num(df.at[0, '탄수화물'])
    sugars = make_num(df.at[0, '당류'])
    fat = make_num(df.at[0, '지방'])
    trans_fat = make_num(df.at[0, '트랜스지방'])
    saturated_fat = make_num(df.at[0, '포화지방'])
    cholesterol = make_num(df.at[0, '콜레스테롤'])
    protein = make_num(df.at[0, '단백질'])
    calcium = make_num(df.at[0, '칼슘'])
    consume_food(per, kal=0, car=int(carbohydrates[0]), sug=int(sugars[0]), fat=int(fat[0]), trans=int(trans_fat[0]), sat=int(saturated_fat[0]), chol=int(cholesterol[0]), pro=int(protein[0]), cal=int(calcium[0]), sod=int(sodium[0]))
# 숫자 +글자에서 숫자만 출력함
def make_num(text):
    numbers = re.findall(r'\d+', text)
    return numbers

#데이터 프레임으로 받아오기         
img_df = pd.DataFrame(result)
person = Person(age=25, gender='female', disease=['간경화'])
result = con_df(img_df,person)
print(result)