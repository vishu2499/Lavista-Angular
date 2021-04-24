// Load necessary modules
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require('multer');
const router = express.Router();
const cookieParser = require('cookie-parser');
const MongoClient = require("mongodb").MongoClient;


app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 4200;
const { ageMW } = require("./middleware/age");
let database, users, products;


app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(cors());


var BCRYPT_SALT_ROUNDS = 12;



const url =
	"mongodb+srv://lavista:avs@cluster0.supzy.mongodb.net/Lavista?retryWrites=true&w=majority";
//"mongodb://lavista:avs@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		if (err) throw err;
		database = db.db("Lavista");
		users = database.collection("users");
		products = database.collection("products");
    blog = database.collection("blog");
		console.log("MongoDB Connected");
	}
);

app.post("/login", (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	users.findOne({ email: email }, (err, user) => {
		if (user) {
			bcrypt.compare(password, user.hash, (err, matched) => {
				if (matched) {
					delete user._id;
					delete user.hash;
					user.password = password;
					res.status(200).send({
						message: "You are validated !!",
						user: user,
					});
				} else
					res.status(401).send({ message: "Incorrect Password !!" });
			});
		} else {
			console.log("User Not Found !!");
			res.status(401).send({
				message: "You are not registered. Please register first !!",
			});
		}
	});
});

app.post("/register",ageMW,(req, res) => {
	//console.log(req.body);
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const email = req.body.email;
	const password = req.body.password;
	const gender = req.body.gender;
	const dateofbirth = req.body.dateofbirth;
	const addr = req.body.addr;
	const city = req.body.city;
	const phonenumber = req.body.phonenumber;
	//calculate month difference from current date in time
	const year = new Date(
		Date.now() - new Date(dateofbirth).getTime()
	).getUTCFullYear();
	//now calculate the age of the user
	const age = Math.abs(year - 1970);
	if (age < 18) {
		console.log("Age must be greater than 18 years !");
		res.status(401).send({
			message: "Age must be greater than 18 years !",
		});
	} else {
		bcrypt.hash(password, BCRYPT_SALT_ROUNDS, (err, hash) => {
			const user = {
				firstname,
				lastname,
				email,
				hash,
				gender,
				dateofbirth,
				addr,
				city,
				phonenumber
			};

			users.insertOne(user, function (err, res) {
				if (err) throw err;
				console.log("New user registered !!");
			});
		});
		res.status(200).send({ message: "New user registered !!" });
	}
});



  app.get("/product", (req,res)=>{
	products.find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.status(200).send(result);
	  });
	
}) 

//feedback
app.get('/feedback', function (req, res) {
	
  blog.find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.status(200).send(result);
	  });

  })

//Multer

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null,`Lavista_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })
   

app.get("/", (req, res) => {
    res.send(
      `<h1 style='text-align: center'>
            Welcome to Lavista 
            <br><br>
            <b style="font-size: 182px;">##</b>
        </h1>`
    );
  });

  app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
	console.log('Uploaded file :')
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400;
      return next(error)
    }
      res.send(file);
  })

  app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
    const files = req.files;
	console.log('Uploaded files :')
    console.log(files);
    if (!files) {
      const error = new Error('No File')
      error.httpStatusCode = 400;
      return next(error)
    }
      res.send({status:  'SUCCESSFULLY UPLOADED.!'});
  })

//feedback


  app.get("/update/:postid",(req,res) =>{
    console.log(req.params);
    var postChoosen = req.params["postid"]
    

    mongo.connect(mongo_url,function(err,db){
        var dbo = db.db(database_name);

        dbo.collection(blog).findOne(mongo.ObjectId(postChoosen), function(err, result) {
            if (err) throw err;
            console.log(result.post_title);
            res.render("update-feedback",{records:result})
            db.close();
          });
    });
})

app.get("/deleteu/:postid",(req,res) =>{
    console.log(req.params);
    console.log("inside delete function")
    var postChoosen = req.params["postid"]
    console.log(`Data ID recieved is : ${postChoosen}`)
    

    mongo.connect(mongo_url,function(err,db){
        var dbo = db.db(database_name);

        dbo.collection(blog).findOne(mongo.ObjectId(postChoosen), function(err, result) {
            if (err) throw err;
            console.log(result.post_title);
            res.render("delete-feedback",{records:result})
            db.close();
          });
    });
})

app.post("/update", function(req,res){
    console.log(req.body);
    // INserting received data into mongo client
    
    mongo.connect(mongo_url,function(err,db){
        if (err) throw err;
        var dbo = db.db(database_name);
        var myPost = {post_title: req.body.post_title, post_description: req.body.post_description}

       

        dbo.collection(blog).updateOne({post_title:req.body.post_title},{$set: myPost},function(err,res){
            if (err) throw err;
            console.log("Data Updated.");
            db.close();
        })
    });

    res.redirect("/feedback");
});

app.post("/delete",(req,res)=>{
    mongo.connect(mongo_url, function(err, db) {
        if (err) throw err;

        var dbo = db.db(database_name);
        var myPost = {post_title: req.body.post_title}

        dbo.collection(blog).deleteOne(myPost, function(err, obj) {
          if (err) throw err;
          console.log("The record has been deleted.");
          db.close();
        });
      });

      res.redirect("/feedback");
});

app.post('/open_post', (req,res) =>{
    // INserting received data into mongo client
    console.log(req.body);
    var myPost = {post_title: req.body.post_title, post_description: req.body.post_description}
    
    feedback.insertOne(myPost, function (err, res) {
      if (err) throw err;
      console.log("New user registered !!");
    });
  
  res.status(200).send({ message: "New user registered !!" });

    res.redirect("/feedback");

});

app.get('/write_feedback',(req,res) =>{
  res.render('insert-feedback',{});
})



// listen to the requests on given PORT
app.listen(PORT, () => {
	console.log(
		`NodeJs application started listening http://localhost:${PORT}`
	);
});




