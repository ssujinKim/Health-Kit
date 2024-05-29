# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
import random
import re
import requests
import json
import base64
import cv2
import sys
import json


# 입력 값 받아오기
sys.stdout.reconfigure(encoding='utf-8')  # 한글 안 깨지게

# 인자의 개수 검사
if len(sys.argv) < 7:
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
user_medicine = []

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

# 각 의약품 정보를 시도하여 존재하는 경우 리스트에 추가
medicine1 = user_info[0].get('medicine1')
if medicine1:
    user_medicine.append(medicine1)

medicine2 = user_info[0].get('medicine2')
if medicine2:
    user_medicine.append(medicine2)

medicine3 = user_info[0].get('medicine3')
if medicine3:
    user_medicine.append(medicine3)

productName = sys.argv[3]
amount = float(sys.argv[4])
calories = float(sys.argv[5])
calorieType = sys.argv[6]

# 각 변수에 대한 'null' 값 (이 경우 빈 문자열) 처리
if not productName:
    print("식품명 값이 입력되지 않았습니다.")
    sys.exit()

if not calories:
    print("칼로리 값이 입력되지 않았습니다.")
    sys.exit()

if not calorieType:
    print("calorieType이(가) 비어있습니다.")
    sys.exit()
    
# 각 영양소 값을 추출하고, None 값이면 0을 기본값으로 사용합니다.
def safe_float(value):
    try:
        return float(value or 0)
    except ValueError:
        return 0.0

diet_info_item = diet_info[0] if diet_info and len(diet_info) > 0 else {}

kcal = round(safe_float(diet_info_item.get('totalCalories', 0)), 2)
carbs = round(safe_float(diet_info_item.get('totalCarbs', 0)), 2)
sugars = round(safe_float(diet_info_item.get('totalSugars', 0)), 2)
fat = round(safe_float(diet_info_item.get('totalFat', 0)), 2)
trans_fat = round(safe_float(diet_info_item.get('totalTransFat', 0)), 2)
saturated_fat = round(safe_float(diet_info_item.get('totalSaturatedFat', 0)), 2)
cholesterol = round(safe_float(diet_info_item.get('totalCholesterol', 0)), 2)
protein = round(safe_float(diet_info_item.get('totalProtein', 0)), 2)
calcium = round(safe_float(diet_info_item.get('totalCalcium', 0)), 2)
sodium = round(safe_float(diet_info_item.get('totalSodium', 0)), 2)


# model 코드 시작
file_path = 'C:/Users/kkuu2/Downloads/dis_data.csv'
dis = pd.read_csv(file_path, encoding='utf-8')
file_path2 = 'C:/Users/kkuu2/Downloads/food_data.csv'
df = pd.read_csv(file_path2, encoding='utf-8')
df.fillna(0, inplace=True)
file_path3 = 'C:/Users/kkuu2/Downloads/med_data.csv'
med = pd.read_csv(file_path3, encoding='utf-8')
file_path4 = 'C:/Users/kkuu2/Downloads/food_sort_data.csv'
sor = pd.read_csv(file_path4, encoding='utf-8')
file_path5 = 'C:/Users/kkuu2/Downloads/medtofood.csv'
mtf = pd.read_csv(file_path5,encoding="utf-8")

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
    def __init__(self, age, gender, kal = 2600, carbo=324, sug=100, fats=54, tran=100, satf=14, chol=300, prot=55, calc=700, sodi=2000, today_kcal=None, today_pro=None, today_car=None, today_fat=None, disease=[],med = []):
        self.age = age
        self.gender = gender
        self.Kcal = kal
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
        self.error()
        self.today_kcal = today_kcal if today_kcal is not None else []
        self.today_pro = today_pro if today_pro is not None else []
        self.today_car = today_car if today_car is not None else []
        self.today_fat = today_fat if today_fat is not None else []
        self.med = med if med is not None else []

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

def cal_nut(age,gender): #연령별로 칼로리계산
    if age <= 18:
        Kcal = 2700
    elif age <= 29:
        Kcal = 2600
    elif age <= 49:
        Kcal = 2400
    elif age <= 64:
        Kcal = 2200
    elif age <= 74:
        Kcal = 2300
    else:
        Kcal = 2000

    if gender == 'female':
        Kcal -= 400
    return Kcal
#이름으로 음식 검색 이름만 반환
def find_food(food_name, df):
    food_list = df[df['식품명'].str.contains(food_name, case=False)]
    
    if food_list.empty:
        print("해당하는 음식이 없습니다.")
    else:
        print("해당하는 음식 리스트:")
        for index, row in food_list.iterrows():
            print(row['식품명'])
        return food_list.index.tolist()

#이름으로 음식 검색 음식 번호가 나옴
def select_food(food_name, df):
    food_info = df[df['식품명'].str.contains(food_name, case=False)]
    
    if food_info.empty:
        print("해당하는 음식이 없습니다.")
    else:
        print("해당하는 음식 정보:")
        return(food_info.iloc[:, 1:])

#카테고리에 포함되는 음식만 반환
def select_food_category(category, df):
    food_info = df[df['분류'].str.contains(category, case=False)]
    
    if food_info.empty:
        print("해당하는 음식이 없습니다.")
    else:
        print("해당하는 음식 정보:")
        return food_info.iloc[:, 1:]
#음식 거부시 추천 알고리즘으로 넘기는 함수
def deny_food(food_num, df):
    recommend = recommend_food(food_num, df)
    print(recommend)
#음식 섭취시 호출하는 함수
def confirm_food(food_num, df, person):
    food_info = df.iloc[food_num, 2:12]
    person_nutrients = person.extra_nut()
    #섭취 가능여부 판별 추후에 계속 사용
    return recommend_food(food_num, df,person)


#음식 추천 알고리즘 similar함수를 이용해 이름의 유사도를 비교
def recommend_food(food_num, df,person):
    selected_food = df.iloc[food_num]
    category_name = selected_food['분류']
    kcal, carbo, sugar, fats, trans_fats, sat_fats, cholesterol, protein, calcium, sodium = person.extra_nut()
    
    sim_foods = df[(df['분류'] == category_name) &
                   (df['에너지(kcal)'] <= kcal) &
                   (df['탄수화물(g)'] <= carbo) &
                   (df['지방(g)'] <= fats) &
                   (df['당류(g)'] <= sugar) &
                   (df['트랜스지방산(g)'] <= trans_fats) &
                   (df['포화지방산(g)'] <= sat_fats) &
                   (df['콜레스테롤(mg)'] <= cholesterol) &
                   (df['단백질(g)'] <= protein) &
                   (df['칼슘(mg)'] <= calcium) &
                   (df['나트륨(mg)'] <= sodium)].copy()
    #정렬후 리턴
    sim_foods['similarity'] = sim_foods['식품명'].apply(lambda x: similar(x, selected_food['식품명']))
    sim_foods = sim_foods.sort_values(by='similarity', ascending=False)

    return sim_foods.iloc[0:10, 1:]

#이름 비교 시스템
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
#랜덤으로 음식을 뽑아주는 시스템
def ran_food_recom(df):
    ind = random.sample(range(len(df)), 10)
    sel = df.iloc[ind, 1:]
    return sel

#음식 섭취 영양성분을 매개변수로 받음
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
        # print("섭취 가능한 품목입니다.")
        return True
    else:
        # print("일일 영양섭취 초과입니다.")
        return False
    
#섭취가능여부를 판별하지 않고 섭취
def consume_food2(per, kal=0, car=0, sug=0, fat=0, trans=0, sat=0, chol=0, pro=0, cal=0, sod=0): #무조건 먹는거
    per.eat(kal, car, sug, fat, trans, sat, chol, pro, cal, sod)
    print("입력한 데이터가 입력되었습니다.")

def con_df(df, per, case1, max1, kal):
    case = 1
    if case1 == 0:
        case = 1
    if case1 == 1:
        case = max1 / 100

    df['칼로리'] = str(kal)

    kal1 = make_num(df.at[0, '칼로리']) * case
    sodium = make_num(df.at[0, '나트륨']) * case
    carbohydrates = make_num(df.at[0, '탄수화물']) * case
    sugars = make_num(df.at[0, '당류']) * case
    fat = make_num(df.at[0, '지방']) * case
    trans_fat = make_num(df.at[0, '트랜스지방']) * case
    saturated_fat = make_num(df.at[0, '포화지방']) * case
    cholesterol = make_num(df.at[0, '콜레스테롤']) * case
    protein = make_num(df.at[0, '단백질']) * case
    calcium = make_num(df.at[0, '칼슘']) * case

    return consume_food(per, kal=kal1, car=carbohydrates, sug=sugars, fat=fat, trans=trans_fat, sat=saturated_fat, chol=cholesterol, pro=protein, cal=calcium, sod=sodium)
  
# 숫자 +글자에서 숫자만 출력함
def make_num(text):
    numbers = re.findall(r'\d+', text)
    return int(numbers[0]) if numbers else 0

#이미지에서 이름을 추출하여 넣을시 리스트에서 가장 비슷한 음식 하나를 골라 섭취 가능여부 판별
def food_classification(food_name, df,person):
    
    person_nutrients = person.extra_nut()
    df['similarity'] = df['식품명'].apply(lambda x: similar(x,food_name))
    df = df.sort_values(by='similarity', ascending=False)
    food_info = df.iloc[0, 2:12]
    row_index = df.index[df['식품명'] == df.iloc[0,1]].tolist()
    return(df.iloc[0],row_index)

#질병 보유자를 위한 함수 다른점은 df2라는 질병 데이터를 받음
def dis_confirm_food(food_num, df, df2, person, med, mtf):
    food_info = df.iloc[food_num, 2:12]
    dis = person.disease_return()
    person_nutrients = person.extra_nut()
    person_med = person.med
    
    foods = []
    med_food = []

    for med_name in person_med:
        matching_row = med[med['제품명'] == med_name]
        med_food.extend(matching_row['문항1'].tolist())

    reshape = [food.replace(" ", "") for food in med_food]
    reshape = ''.join(reshape)
    reshape = reshape.split(",")

    for item in reshape:
        matching_mtf_row = mtf[mtf['질병명'] == item]
        foods.extend(matching_mtf_row['권장식품'].tolist())

    foods = [food.replace(" ", "") for food in foods]
    foods = ''.join(foods)
    foods = foods.split(",")

    precautions = [] 
    for disease_name in dis:
        matching_row = df2[df2['질병명'] == disease_name]
        foods.extend(matching_row['권장식품'].tolist()) 
        precautions.extend(matching_row['주의사항'].tolist()) 

    # print("일일 영양섭취 초과입니다")
    recommended_foods = dis_recommend_food(food_num, df, foods)

    # print("권장 음식:", recommended_foods)
    # print("주의사항:", precautions)
    return recommended_foods  # 수정된 부분

#recommendfood와 동일 대신 정렬과 중복제거를 함
def dis_recommend_food(food_num, df, foods):
    selected_food = df.iloc[food_num]
    category_name = selected_food['분류']
    kcal, carbo, sugar, fats, trans_fats, sat_fats, cholesterol, protein, calcium, sodium = person.extra_nut()
    
    sim_foods = df[(df['분류'] == category_name) &
                   (df['에너지(kcal)'] <= kcal) &
                   (df['탄수화물(g)'] <= carbo) &
                   (df['지방(g)'] <= fats) &
                   (df['당류(g)'] <= sugar) &
                   (df['트랜스지방산(g)'] <= trans_fats) &
                   (df['포화지방산(g)'] <= sat_fats) &
                   (df['콜레스테롤(mg)'] <= cholesterol) &
                   (df['단백질(g)'] <= protein) &
                   (df['칼슘(mg)'] <= calcium) &
                   (df['나트륨(mg)'] <= sodium)].copy()

    sim_foods['similarity'] = sim_foods['식품명'].apply(lambda x: similar(x, selected_food['식품명']))
    sim_foods = sim_foods.sort_values(by='similarity', ascending=False)
    food_list = pd.DataFrame()
    food_reshape = [food.replace(" ", "") for food in foods]
    food_reshape = ''.join(food_reshape)
    food_reshape = food_reshape.split(",")

    food_list = pd.DataFrame()
    for food in food_reshape:
        filtered_food_list = sim_foods[sim_foods['식품명'].str.contains(re.escape(food), case=False)]
        food_list = pd.concat([food_list, filtered_food_list])
    food_list.drop_duplicates(subset=['식품명'], inplace=True)
    food_list = food_list.sort_values(by='similarity', ascending=False)
    food_list.drop(food_list[food_list['식품코드'] == food_num].index, inplace=True)
    return food_list[1:11]
#질병 추가 함수
def dis_append(person,dis_name):
    person.append_disease(dis_name)
#데이터를 너무 영양성분들이 높거나 낮은 데이터를 제거함
def remake(df, kcal=2600, carbo=324, fats=54, sugar=100, trans_fats=100, sat_fats=14, cholesterol=300, protein=55, calcium=700, sodium=2600):
    ma = 0.8 #최대 수치 비율
    mi = 0.2 #최소 수치 비율

    foods = df[(df['분류'] == "밥류") & 
               (kcal*mi <= df['에너지(kcal)']) & (df['에너지(kcal)'] <= kcal*ma) &
               (carbo*mi <= df['탄수화물(g)']) & (df['탄수화물(g)'] <= carbo*ma) &
               (fats*mi <= df['지방(g)']) & (df['지방(g)'] <= fats*ma) &
               (sugar*mi <= df['당류(g)']) & (df['당류(g)'] <= sugar*ma) &
               (trans_fats*mi <= df['트랜스지방산(g)']) & (df['트랜스지방산(g)'] <= trans_fats*ma) &
               (sat_fats*mi <= df['포화지방산(g)']) & (df['포화지방산(g)'] <= sat_fats*ma) &
               (cholesterol*mi <= df['콜레스테롤(mg)']) & (df['콜레스테롤(mg)'] <= cholesterol*ma) &
               (protein*mi <= df['단백질(g)']) & (df['단백질(g)'] <= protein*ma) &
               (calcium*mi <= df['칼슘(mg)']) & (df['칼슘(mg)'] <= calcium*ma) &
               (sodium*mi <= df['나트륨(mg)']) & (df['나트륨(mg)'] <= sodium*ma)].copy()
    return foods

#df 3종류를 넣고 person을 받아서 추천
def sort_and_merge(food_list, sor, col_name, ascending=True, percentage=0.3):
    im_list = sor.sort_values(by=col_name, ascending=ascending)
    im_list = im_list.head(int(len(im_list) * percentage))
    merged_df = pd.merge(food_list, im_list, on='식품명', how='inner')
    return merged_df

def comb_confirm_food(food_num,person, df, df2,med,mtf):
    if person.disease_return() != []:
        return dis_confirm_food(food_num,df, df2,person,med,mtf)
    else:
        return confirm_food(food_num,df, person)
    
def con_eve(person, df,dis,food_name,TF,med,mtf):
    if TF:
        return 0
    else:
        return comb_confirm_food(food_classification(food_name,df,person)[1][0], person, df, dis,med,mtf)
    
    
person = Person(age=user_age, gender=user_gender, carbo=324-carbs, sug=100-sugars, 
fats=54-fat, tran=100-trans_fat, satf=14-saturated_fat, chol=300-cholesterol, prot=55-protein, 
calc=700-calcium, sodi=2000-sodium, kal = cal_nut(user_age, user_gender)-kcal, disease=user_disease, med = user_medicine)

# print(person.age, person.gender, person.carbo, person.sugars, person.fats, person.trans_fats, person.saturated_fats, person.cholesterol,
#       person.protein, person.calcium, person.sodium, person.Kcal, person.disease, person.med)

calorieType = 0 if calorieType == 'total' else 1
totalAmount = 1 if calorieType == 0 else amount

result = con_eve(person, df, dis, productName, False, med, mtf)

# 결과 값 전송하기
def run_python_ocr2():
    food_names = result['식품명']
    energies = result['에너지(kcal)']
    
    # 식품명과 에너지를 하나의 객체로 묶음
    data = [{"food_name": name, "energy": energy} for name, energy in zip(food_names, energies)]
    print(data)
run_python_ocr2()