let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let users = new Array();
users[0] = {
	"userId" : 0,
	"name" : "jin",
	"password" : "abc",
	"isAdmin" : true
}

app.put('/login', (req, res) => {
	// users 배열에서 찾도록 처리 해야 함
	// admin 여부를 확인하여 체크
	// req.body.id : ID
	// req.body.name : 패스워드
	if(users[req.body.userId].password == req.body.password){
		req.session.userId = [users[req.body.userId].userId,users[req.body.userId].isAdmin];
		console.log(req.body.userId);
	}
	res.send("Login");
});

app.put('/logout', (req, res) => {
	// Logout
	// 세션 유효 여부를 체크하고 세션 Delete
	if(req.session.userId != null){
        req.session.userId = null;
	}
	res.send("LogOut");

});

let auth = (req, res, next) => {
	// Session Check
	// 어드민 여부 체크 필요
	if (req.session.userId != null)
		next();
	else
		res.send("Error");

};

app.post('/user', (req, res) => {
	// Create book information
	if(req.session.userId[1] == true){
		users[req.body.userId] = [req.body.userId, req.body.name, req.body.password, req.body.isAdmin];
		console.log(req.body.userId);
	}	
	res.send(users[req.body.userId]);
})

app.put('/user/:userId', (req, res) => {
	// Update book information
    let userTmp = users;
	if(req.session.userId[1] == true){
		userTmp[req.body.userId] = [req.body.userId, req.body.name, req.body.password, req.body.isAdmin];
		res.send(userTmp[req.body.userId]);
	}
	
})

app.delete('/user/:userId', (req, res) => {
	// Delete book information
	if(req.session.userId[1] == true){
		users[req.body.userId] = [];
		res.send(users[req.body.userId]);
	}
	
})

app.get('/user/:userId', auth, (req, res) => {
	// get User Information
	let userId = req.params.userId;
	if(req.session.userId[1] == true){		
		
        console.log(users[userId]);
        res.send(users[userId]);
	} 	
});

// 사용자 추가 시에 admin 여부도 추가해야 함

let server = app.listen(80);
