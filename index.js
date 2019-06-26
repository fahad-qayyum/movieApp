var express = require("express"), request = require("request"), app = express(), bodyParser = (require("body-parser"));


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
//home page route
app.get("/", function(req,res){
    res.render("search");
});

app.get("/result", function(req, res){

    var keyword = req.query.keyword;
    var type = req.query.type;
    var time = req.query.time;
    var url = "http://www.omdbapi.com/?s=" + keyword + "&apikey=thewdb" ;
    request(url, function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("result", {keyword:keyword, data : data, type : type, time:time});
        }else{
            res.send("<h2>Out of Luck! Movie not found</h2>");
        }
    });
});

//listening to the requests at icloud port
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started!");
})