const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require('multer');
const { spawn } = require('child_process');
//const bcrypt = require('bcrypt');
const db = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/checkNickname", async (req, res) => { // async 함수를 사용
    const nickname = req.body.nickname;
    console.log("닉네임 중복 확인 요청 받음", req.body);

    try {
        const [result] = await db.query("SELECT * FROM USERS WHERE NICKNAME = ?", [nickname]); // await를 사용하여 비동기 쿼리를 기다림
        if (result.length > 0) {
            console.log("이미 사용 중인 닉네임입니다.");
            res.send({ isAvailable: false, message: "이미 사용 중인 닉네임입니다." });
        } else {
            console.log("사용할 수 있는 닉네임입니다.");
            res.send({ isAvailable: true, message: "사용할 수 있는 닉네임입니다." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("서버 에러");
    }
});

app.post("/checkEmail", async (req, res) => {
    const email = req.body.email;
    console.log("이메일 중복 확인 요청 받음", req.body);

    try {
        const [result] = await db.query("SELECT * FROM USERS WHERE EMAIL = ?", [email]);
        if (result.length > 0) {
            console.log("이미 등록된 이메일입니다.");
            res.send({ isAvailable: false, message: "이미 등록된 이메일입니다." });
        } else {
            console.log("사용할 수 있는 이메일입니다.");
            res.send({ isAvailable: true, message: "사용할 수 있는 이메일입니다." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("서버 에러");
    }
});

app.post("/signUp", async (req, res) => {
    const { email, password, nickname, age, height, weight, gender } = req.body;
    console.log("회원가입 요청 받음", req.body);

    try {
        await db.query("INSERT INTO HEALTHKIT.USERS (EMAIL, PASSWORD, NICKNAME, AGE, HEIGHT, WEIGHT, GENDER) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [email, password, nickname, age, height, weight, gender]);
        console.log("Inserted values successfully!");
        res.send("Inserted values successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).send("서버 에러 발생");
    }
});

app.post("/signIn", async (req, res) => {
    const { email, password } = req.body;
    console.log("로그인 요청 받음", req.body);

    if (email && password) {
        try {
            const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (results.length > 0 && results[0].password == password) {
                console.log("Login successfully!");
                res.send({ login: true, message: "로그인 성공" });
            } else if (results.length > 0) {
                res.send({ login: false, message: "비밀번호가 일치하지 않습니다." });
            } else {
                res.send({ login: false, message: "등록되지 않은 회원 정보입니다." });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("서버 에러 발생");
        }
    } else {
        res.send("로그인 정보를 입력해주세요!");
    }
});

app.get('/userInfo', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).send("이메일 파라미터가 필요합니다.");
    }

    try {
        const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send("해당 이메일의 사용자를 찾을 수 없습니다.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

// app.get('/disease', async (req, res) => {
//     try {
//         const [results] = await db.query("SELECT disease_name FROM disease");
//         res.json(results); // 질병 정보를 JSON 형태로 클라이언트에 전송
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("서버 오류가 발생했습니다.");
//     }
// });


// app.get('/medicine', async (req, res) => {
//     try {
//         const [results] = await db.query("SELECT medicine_name FROM medicine");
//         res.json(results); // 의약품 정보를 JSON 형태로 클라이언트에 전송
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("서버 오류가 발생했습니다.");
//     }
// });

app.post("/searchDisease", async (req, res) => {
    const searchText = req.body.searchText;
    console.log("질병 검색 요청 받음", req.body);

    try {
        const query = "SELECT * FROM disease WHERE disease_name LIKE ?";
        const values = [`%${searchText}%`];
        const [result] = await db.query(query, values);
        
        if (result.length > 0) {
            res.send({ success: true, data: result });
        } else {
            res.send({ success: false, message: "검색 결과가 없습니다." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("서버 에러");
    }
});

app.post("/searchMedicine", async (req, res) => {
    const searchText = req.body.searchText;
    console.log("의약품 검색 요청 받음", req.body);

    try {
        const query = "SELECT * FROM medicine WHERE medicine_name LIKE ?";
        const values = [`%${searchText}%`];
        const [result] = await db.query(query, values);
        
        if (result.length > 0) {
            res.send({ success: true, data: result });
        } else {
            res.send({ success: false, message: "검색 결과가 없습니다." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("서버 에러");
    }
});

app.post('/updateUserInfo', async (req, res) => {
    const updatedInfo = req.body;

    try {
      await db.query('UPDATE USERS SET height = ?, weight = ?, age = ?, gender = ?, disease1 = ?, disease2 = ?, disease3 = ?, medicine1 = ?, medicine2 = ?, medicine3 = ? WHERE email = ?', 
        [updatedInfo.height, updatedInfo.weight, updatedInfo.age, updatedInfo.gender, updatedInfo.disease1, updatedInfo.disease2, updatedInfo.disease3,updatedInfo.medicine1, updatedInfo.medicine2, updatedInfo.medicine3, updatedInfo.email]);
      console.log('사용자의 건강 정보가 업데이트되었습니다.');
      res.send('사용자의 건강 정보가 업데이트되었습니다.');
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 에러 발생');
    }
});

app.post("/searchFood", async (req, res) => {
    const searchText = req.body.searchText;
    console.log("음식 검색 요청 받음", req.body);

    try {
        const query = "SELECT * FROM food WHERE food_name LIKE ?";
        const values = [`%${searchText}%`];
        const [result] = await db.query(query, values);
        
        if (result.length > 0) {
            res.send({ success: true, data: result });
        } else {
            res.send({ success: false, message: "검색 결과가 없습니다." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("서버 에러");
    }
});

app.post('/menuAdd', async (req, res) => {
    const menuInfo = req.body;

    try {
      await db.query('INSERT INTO users_diet (user_email, date, meal_type, food_name, kcal, carbs, protein, fat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [menuInfo.email, menuInfo.date, menuInfo.meal_type, menuInfo.food, menuInfo.calories, menuInfo.carbs, menuInfo.protein, menuInfo.fat]);
      console.log('사용자의 식단 정보가 업데이트되었습니다.');
      res.send('식단 정보가 업데이트되었습니다.');
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 에러 발생');
    }
});

app.post('/menuSearchAdd', async (req, res) => {
    const menuInfo = req.body;

    try {;
      // 먼저 foods_info 테이블에서 음식의 영양 정보를 조회
      const [foodInfo] = await db.query('SELECT * FROM food WHERE food_name = ?', [menuInfo.food]);
      
      if (foodInfo.length > 0) {
        // 조회된 영양 정보를 바탕으로 users_diet 테이블에 데이터를 삽입
        await db.query('INSERT INTO users_diet (user_email, date, meal_type, food_name, kcal, carbs, ' + 
        'sugars, fat, trans_fat, saturated_fat, cholesterol, protein, calcium, sodium) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
          [menuInfo.email, menuInfo.date, menuInfo.meal_type, menuInfo.food, foodInfo[0].kcal, foodInfo[0].carbs, 
          foodInfo[0].sugars, foodInfo[0].fat, foodInfo[0].trans_fat, foodInfo[0].saturated_fat, foodInfo[0].cholesterol, 
          foodInfo[0].protein, foodInfo[0].calcium, foodInfo[0].sodium]);
        console.log('사용자의 식단 정보가 업데이트되었습니다.');
        res.send('식단 정보가 업데이트되었습니다.');
      } else {
        // 해당 음식에 대한 영양 정보가 없는 경우
        res.status(404).send('해당 음식의 영양 정보를 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 에러 발생');
    }
});

app.get('/totalInfo', async (req, res) => {
    const { email, date } = req.query;

    if (!email) {
        return res.status(400).send("이메일 파라미터가 필요합니다.");
    }

    try {
        const [results] = await db.query(`
            SELECT 
                SUM(carbs) AS totalCarbs, 
                SUM(protein) AS totalProtein, 
                SUM(fat) AS totalFat, 
                SUM(kcal) AS totalCalories 
            FROM users_diet 
            WHERE user_email = ? AND date = ?`, 
            [email, date]
        );
        if (results.length > 0) {
            const totals = results[0];
            if (totals.totalCarbs !== null) { // 합계가 계산된 경우
                res.json({
                    totalCarbs: totals.totalCarbs,
                    totalProtein: totals.totalProtein,
                    totalFat: totals.totalFat,
                    totalCalories: totals.totalCalories
                });
            } else {
                res.send("해당 날짜에 대한 식단 정보가 없습니다.");
                console.log("해당 날짜에 대한 식단 정보가 없습니다.");
            }
        } else {
            res.send("해당 이메일의 사용자를 찾을 수 없습니다.");
            console.log("해당 이메일의 사용자를 찾을 수 없습니다.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

app.get('/mealInfo', async (req, res) => {
    const { email, date } = req.query;

    if (!email) {
        return res.status(400).send("이메일 파라미터가 필요합니다.");
    }
    if (!date) {
        return res.status(400).send("날짜 파라미터가 필요합니다.");
    }

    try {
        const [results] = await db.query(`
            SELECT *
            FROM users_diet 
            WHERE user_email = ? AND date = ?`, 
            [email, date]
        );
        // 데이터가 없는 경우 빈 배열을 반환
        res.json(results || []);
    } catch (error) {
        console.error(error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

app.post('/deleteMeal', async (req, res) => {
    const { email, date, food_name, meal_type } = req.query;

    try {
      await db.query('DELETE FROM users_diet WHERE user_email = ? AND date = ? AND food_name = ? AND meal_type = ?', 
        [email, date, food_name, meal_type]);
      console.log('음식 정보가 삭제되었습니다.');
      res.json({ message: '음식 정보가 삭제되었습니다.' });  // 이게 없으면 클라이언트 쪽에서 axios.post() 다음에 있는 것들을 실행 안 함
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '서버 에러 발생' });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './ocr/to/') // 파일이 저장될 경로
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // 파일명
    }
});
  
const upload = multer({ storage: storage });
  
app.post('/imageUpload', upload.single('file'), (req, res) => {
    res.send('파일이 성공적으로 업로드 되었습니다.');
});

app.get('/run-python-ocr', async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const { email, date, productName, calories, calorieType } = req.query;

    if (!email) {
        return res.status(400).send("이메일 파라미터가 필요합니다.");
    }
    if (!date) {
        return res.status(400).send("날짜 파라미터가 필요합니다.");
    }

    try {
        // 데이터베이스에서 사용자 정보와 식단 정보를 가져옴
        const [userResults] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        const [dietResults] = await db.query(`SELECT SUM(kcal) AS totalCalories, SUM(carbs) AS totalCarbs, 
        SUM(sugars) AS totalSugars, SUM(fat) AS totalFat, SUM(trans_fat) AS totalTransFat, SUM(saturated_fat) AS totalSaturatedFat, 
        SUM(cholesterol) AS totalCholesterol, SUM(protein) AS totalProtein, SUM(calcium) AS totalCalcium, SUM(sodium) AS totalSodium 
        FROM users_diet 
        WHERE user_email = ? AND date = ?`, [email, date]);

        // 사용자 정보와 식단 정보를 JSON 문자열로 변환
        const userInfo = JSON.stringify(userResults);
        const dietInfo = JSON.stringify(dietResults);

        // 파이썬 스크립트 실행
        const pythonProcess = spawn('C:/Health-Kit/Health-Kit/health-kit-app/myvenv/Scripts/python.exe', 
            ['./model/ocr_recommendations.py', userInfo, dietInfo, productName, calories, calorieType], {
                env: { ...process.env, PYTHONIOENCODING: 'utf-8' } // 한글 안 깨지게
        });
        let outputData = '';

        pythonProcess.stdout.setEncoding('utf8');
        pythonProcess.stdout.on('data', (data) => {
            outputData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            res.send(outputData); // 파이썬 스크립트의 출력을 클라이언트에 전송
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

app.get('/run-python-dr', async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const { email, date, preferences } = req.query;

    if (!email) {
        return res.status(400).send("이메일 파라미터가 필요합니다.");
    }
    if (!date) {
        return res.status(400).send("날짜 파라미터가 필요합니다.");
    }

    try {
        // 데이터베이스에서 사용자 정보와 식단 정보를 가져옴
        const [userResults] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        const [dietResults] = await db.query(`SELECT SUM(kcal) AS totalCalories, SUM(carbs) AS totalCarbs, 
        SUM(sugars) AS totalSugars, SUM(fat) AS totalFat, SUM(trans_fat) AS totalTransFat, SUM(saturated_fat) AS totalSaturatedFat, 
        SUM(cholesterol) AS totalCholesterol, SUM(protein) AS totalProtein, SUM(calcium) AS totalCalcium, SUM(sodium) AS totalSodium 
        FROM users_diet 
        WHERE user_email = ? AND date = ?`, [email, date]);

        // 사용자 정보와 식단 정보를 JSON 문자열로 변환
        const userInfo = JSON.stringify(userResults);
        const dietInfo = JSON.stringify(dietResults);

        // 파이썬 스크립트 실행
        const pythonProcess = spawn('C:/Health-Kit/Health-Kit/health-kit-app/myvenv/Scripts/python.exe', 
            ['./model/diet_recommendations.py', userInfo, dietInfo, preferences], {
                env: { ...process.env, PYTHONIOENCODING: 'utf-8' }  // 한글 안 깨지게
        });
        let outputData = '';

        pythonProcess.stdout.setEncoding('utf8');
        pythonProcess.stdout.on('data', (data) => {
            outputData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            console.log('outputData:', outputData); // 여기에 로그 추가
            res.send(outputData); // 파이썬 스크립트의 출력을 클라이언트에 전송
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})