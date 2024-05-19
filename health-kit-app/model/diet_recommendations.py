# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
import random
import re

import sys
import json

sys.stdout.reconfigure(encoding='utf-8')  # 한글 안 깨지게

# 인자의 개수 검사
if len(sys.argv) < 4:
    print("필요한 인자가 부족합니다.")
    sys.exit()

# 명령줄 인수로부터 user_info와 diet_info를 JSON 형태로 읽어오기
try:
    user_info = json.loads(sys.argv[1])
    diet_info = json.loads(sys.argv[2])
except IndexError:
    # sys.argv에서 필요한 인수를 받지 못한 경우
    print("필요한 인수가 제공되지 않았습니다.")
    sys.exit(1) # 프로그램 종료
except json.JSONDecodeError:
    # JSON 형태로 변환하는 데 실패한 경우
    print("입력 형식이 잘못되었습니다. JSON 문자열을 확인해주세요.")
    sys.exit(1) # 프로그램 종료

# user_info 딕셔너리에서 필요한 값을 추출
user_age = user_info[0].get('age')
user_gender = user_info[0].get('gender')
user_disease = []

# 각 질병 정보를 시도하여 존재하는 경우 리스트에 추가
disease1 = user_info[0].get('disease1')
if disease1:
    user_disease.append(disease1)

disease2 = user_info[0].get('disease2')
if disease2:
    user_disease.append(disease2)

disease3 = user_info[0].get('disease3')
if disease3:
    user_disease.append(disease3)

# 각 영양소 값을 추출하고, None 값이면 0을 기본값으로 사용합니다.
def safe_float(value):
    try:
        return float(value or 0)
    except ValueError:
        return 0.0

diet_info_item = diet_info[0] if diet_info and len(diet_info) > 0 else {}

Kcal = round(safe_float(diet_info_item.get('totalCalories', 0)), 2)
carbo = round(safe_float(diet_info_item.get('totalCarbs', 0)), 2)
sugars = round(safe_float(diet_info_item.get('totalSugars', 0)), 2)
fats = round(safe_float(diet_info_item.get('totalFat', 0)), 2)
trans_fats = round(safe_float(diet_info_item.get('totalTransFat', 0)), 2)
saturated_fats = round(safe_float(diet_info_item.get('totalSaturatedFat', 0)), 2)
cholesterol = round(safe_float(diet_info_item.get('totalCholesterol', 0)), 2)
protein = round(safe_float(diet_info_item.get('totalProtein', 0)), 2)
calcium = round(safe_float(diet_info_item.get('totalCalcium', 0)), 2)
sodium = round(safe_float(diet_info_item.get('totalSodium', 0)), 2)

# 카테고리
preferences = sys.argv[3]
preferences_list = [int(pref) for pref in preferences.split(',')]


file_path = 'C:/Users/mkk08/Downloads/food_data.csv'
df = pd.read_csv(file_path, encoding='utf-8')
df.fillna(0, inplace=True)
file_path2 = 'C:/Users/mkk08/Downloads/질병.csv'
dis = pd.read_csv(file_path2, encoding='utf-8')
file_path3 = 'C:/Users/mkk08/Downloads/modified_merged_data.csv'
med = pd.read_csv(file_path3, encoding='utf-8')
file_path4 = 'C:/Users/mkk08/Downloads/정렬데이터.csv'
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
    

def similar(a, b):
    if a == b:
        return 1.0
    else:
        n, m = len(a), len(b)
        if n > m:
            a, b = b, a
            n, m = m, n

        current_row = range(n+1)
        for i in range(1, m+1):
            previous_row, current_row = current_row, [i] + [0] * n
            for j in range(1, n+1):
                add, delete, change = previous_row[j]+1, current_row[j-1]+1, previous_row[j-1]
                if a[j-1] != b[i-1]:
                    change += 1
                current_row[j] = min(add, delete, change)

        return 1 - (current_row[n] / max(m, n))
#df 3종류를 넣고 person을 받아서 추천
def nat_rec(person, df, df2, sor, case): 
    person_nutrients = person.extra_nut()
    kcal, carbo, sugar, fats, trans_fats, sat_fats, cholesterol, protein, calcium, sodium = person.extra_nut()
    
    food_list = df[(df['에너지(kcal)'] <= kcal) &#데이터 검열
                   (df['탄수화물(g)'] <= carbo) &
                   (df['지방(g)'] <= fats) &
                   (df['당류(g)'] <= sugar) &
                   (df['트랜스지방산(g)'] <= trans_fats) &
                   (df['포화지방산(g)'] <= sat_fats) &
                   (df['콜레스테롤(mg)'] <= cholesterol) &
                   (df['단백질(g)'] <= protein) &
                   (df['칼슘(mg)'] <= calcium) &
                   (df['나트륨(mg)'] <= sodium)].copy()
    #질병 보유자 검열
    if person.disease_return(): 
        dis = person.disease_return()
        foods = []
        for disease_name in dis:
            matching_row = df2[df2['질병명'] == disease_name]
            foods.extend(matching_row['권장식품'].tolist())

        food_list = pd.DataFrame()
        food_reshape = [food.replace(" ", "") for food in foods]
        food_reshape = ''.join(food_reshape)
        food_reshape = food_reshape.split(",")
    
        for food in food_reshape:
            filtered_food_list = df[df['식품명'].str.contains(re.escape(food), case=False)]
            food_list = pd.concat([food_list, filtered_food_list])
        food_list.drop_duplicates(subset=['식품명'], inplace=True)
    merged_df = food_list
    if 1 in case:  # 에너지 하위 30프로
        im_list = sor.sort_values(by='에너지(kcal)')
        im_list = im_list.head(int(len(im_list) * 0.3))
        merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')
    elif 2 in case:  # 에너지 상위 30프로
        im_list = sor.sort_values(by='에너지(kcal)', ascending=False)
        im_list = im_list.head(int(len(im_list) * 0.3))
        merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')
    elif 3 in case:  # 저지방
        im_list = sor.sort_values(by='지방(g)')
        im_list = im_list.head(int(len(im_list) * 0.7))
        merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')
    elif 4 in case:  # 고단백
        im_list = sor.sort_values(by='단백질(g)', ascending=False)
        im_list = im_list.head(int(len(im_list) * 0.9999))
        merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')
    elif 5 in case:  # 저나트륨
        im_list = sor.sort_values(by='나트륨(mg)')
        im_list = im_list.head(int(len(im_list) * 0.3))
        merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')
    elif 6 in case:  # 저탄수화물
        im_list = sor.sort_values(by='탄수화물(g)')
        im_list = im_list.head(int(len(im_list) * 0.3))
        merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')

    elif 7 in case:  # 저콜레스테롤
        im_list = sor.sort_values(by='콜레스테롤(mg)')
        im_list = im_list.head(int(len(im_list) * 0.3))
        merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')


    ind = random.sample(range(len(merged_df)), min(10, len(merged_df)))
    sel = merged_df.iloc[ind, 1:12]
    sel.fillna(0,inplace = True)
    return sel


# 추출한 값으로 Person 인스턴스를 생성합니다.
person = Person(age=user_age, gender=user_gender, disease=user_disease)  # 영양성분 추가

# 확인
#print(f"Age: {person.age}, Gender: {person.gender}, Disease: {person.disease}")
#print(Kcal, carbo, sugars, fats, trans_fats, saturated_fats, cholesterol, protein, calcium, sodium)
#print(preferences_list)

result = nat_rec(person, df[(df['분류'] == "밥류")], dis, sor, preferences_list)

#print(result['식품명'], result['에너지(kcal)_x'])


def run_python_dr():
    # 예시 데이터
    food_names = result['식품명'].tolist()
    energies = result['에너지(kcal)_x'].tolist()
    
    # 식품명과 에너지를 하나의 객체로 묶음
    data = [{"food_name": name, "energy": energy} for name, energy in zip(food_names, energies)]
    print(data)
run_python_dr()