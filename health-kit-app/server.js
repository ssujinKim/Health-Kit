const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
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
        const [result] = await db.query("SELECT * FROM USERS WHERE NICKNAME = ?", [nickname]); // await를 사용하여 비동기 쿼리를 기다립니다.
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
        const [results] = await db.query("SELECT nickname, email, height, weight, age FROM users WHERE email = ?", [email]);
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
/*
const express = require('express')
const session = require('express-session')
const path = require('path');
const app = express()
const port = 3001

const db = require('./lib/db');
const sessionOption = require('./lib/sessionOption');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, '/pages')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
	key: 'session_cookie_name',
    secret: '~',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))

app.get('/', (req, res) => {    
    req.sendFile(path.join(__dirname, '/pages/Signin.js'));
})

app.get('/authcheck', (req, res) => {      
    const sendData = { isLogin: "" };
    if (req.session.is_logined) {
        sendData.isLogin = "True"
    } else {
        sendData.isLogin = "False"
    }
    res.send(sendData);
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

app.post("/login", (req, res) => { // 데이터 받아서 결과 전송
    const username = req.body.userId;
    const password = req.body.userPassword;
    const sendData = { isLogin: "" };

    if (username && password) {             // id와 pw가 입력되었는지 확인
        db.query('SELECT * FROM userTable WHERE username = ?', [username], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.      

                bcrypt.compare(password , results[0].password, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교

                    if (result === true) {                  // 비밀번호가 일치하면
                        req.session.is_logined = true;      // 세션 정보 갱신
                        req.session.nickname = username;
                        req.session.save(function () {
                            sendData.isLogin = "True"
                            res.send(sendData);
                        });
                        db.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`
                            , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
                    }
                    else{                                   // 비밀번호가 다른 경우
                        sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                        res.send(sendData);
                    }
                })                      
            } else {    // db에 해당 아이디가 없는 경우
                sendData.isLogin = "아이디 정보가 일치하지 않습니다."
                res.send(sendData);
            }
        });
    } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
        sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);
    }
});

app.post("/signin", (req, res) => {  // 데이터 받아서 결과 전송
    const username = req.body.userId;
    const password = req.body.userPassword;
    const password2 = req.body.userPassword2;
    
    const sendData = { isSuccess: "" };

    if (username && password && password2) {
        db.query('SELECT * FROM userTable WHERE username = ?', [username], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0 && password == password2) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
                const hasedPassword = bcrypt.hashSync(password, 10);    // 입력된 비밀번호를 해시한 값
                db.query('INSERT INTO userTable (username, password) VALUES(?,?)', [username, hasedPassword], function (error, data) {
                    if (error) throw error;
                    req.session.save(function () {                        
                        sendData.isSuccess = "True"
                        res.send(sendData);
                    });
                });
            } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우                  
                sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다."
                res.send(sendData);
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우            
                sendData.isSuccess = "이미 존재하는 아이디 입니다!"
                res.send(sendData);  
            }            
        });        
    } else {
        sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);  
    }
    
});
*/