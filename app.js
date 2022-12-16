var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser') 
const fs= require('fs')
var req= null


app.use(express.static('public'))
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

let readlist = ["grapes","leaves","mockingbird","sun","dune", "flies"]
app.use(require('express-session')({
 
    name: '_es_demo', // The name of the cookie
    secret: '1234', // The secret is required, and is used for signing cookies
    resave: false, // Force save of session for each request.
    saveUninitialized: false // Save a session that is new, but has not been modified

}));

let loadUsers = function(){
  try{
   let bufferedData = fs.readFileSync('users.json')
   let stringData = bufferedData.toString()
   let usersArray = JSON.parse(stringData)
   return usersArray}
  catch(error){
       return []}}

let addUser= function(user,res){
  let users= loadUsers()
  var i;
  var flag = 0;
  for(i = 0; i < users.length; i++){
      
      if (users[i].name == user.name){
          
          flag = 1;
          break
      }}

  console.log(flag)
    if (flag == 0){
          users.push(user)
          res.redirect('/')}
          else{
            res.render('alertAlready')
          }
    
    fs.writeFileSync('users.json',JSON.stringify(users))}

    app.listen(3000);

    app.get('/', function(req, res){
        res.render('login')})
    
    
    app.get('/registration', function(req, res){
        res.render('registration')})
    

    app.post('/register',function(req,res){
    
           
    let user= {
        name: req.body.username,
        password: req.body.password,
        readlist :[] }
        addUser(user,res)
        console.log(JSON.stringify(user))})
    
   app.get('/home', function(req, res){
      res.render('home')})
    
            
   app.post('/loginbutton',function(req,res){
       
       let user= {
          name: req.body.username,
           password: req.body.password,
           readlist: [] }
            
            checkUser(user,res,req)})
    
    let checkUser= function(user,res,req){
       let users= loadUsers()
         var i;
         var flag = 0;
            for(i = 0; i < users.length; i++){
                    
              if (users[i].name == user.name && users[i].password == user.password){
                    user.readlist= users[i].readlist
                    flag = 1;
                    break}}

                console.log(flag)
                if (flag == 1){
                  req.session.email = user.name
                      console.log(user.name)
                      res.redirect('/home')}
                      else{
                       
                        res.render('alertIncorrect')}}


app.get('/dune',function(req,res){
  res.render('dune')});

app.get('/fiction',function(req,res){
    res.render('fiction')});
    
app.get('/files',function(req,res){
  res.render('files')});
  
app.get('/grapes',function(req,res){
  res.render('grapes')});
  
app.get('/home',function(req,res){
  res.render('home')});
  
app.get('/leaves',function(req,res){
  res.render('leaves')});
  
app.get('/mockingbird',function(req,res){
  res.render('mockingbird')});
  
app.get('/novel',function(req,res){
  res.render('novel')});
  
app.get('/poetry',function(req,res){
  res.render('poetry')});

// app.get('/readlist',function(req,res){
//     res.render('readlist')});
    
//app.get('/searchresults',function(req,res){
 // res.render('searchresults')});
  
app.get('/sun',function(req,res){
  res.render('sun')});

let loadSearch = function(key){
// check search is substring            
var ResList=[];
var i;
for (i=0;i<readlist.length;i++){
if (readlist[i].toLowerCase().includes (key.toLowerCase().replace(/\s/g, ''))){
console.log('mawgooda')
ResList.push(readlist[i]);}
}
if (ResList.length==0){
console.log("Book not found")
ResList.push("Book Not Found");  
}

return ResList}

// app.post('/addreadlist',function(req,res){
    
//   console.log(req.body.i)})

  var sess;
app.get('/addreadlistgrapes',function(req, res){
    //console.log(req.session.email)
    checkReadlist(req.session.email,"grapes",res)})
app.get('/addreadlistleaves',function(req, res){
    //console.log(req.session.email)
    checkReadlist(req.session.email,"leaves",res)})
app.get('/addreadlistmockingbird',function(req, res){
      //console.log(req.session.email)
    checkReadlist(req.session.email,"mockingbird",res)})
app.get('/addreadlistsun',function(req, res){
     //console.log(req.session.email)
    checkReadlist(req.session.email,"sun",res)})
app.get('/addreadlistdune',function(req, res){
      //console.log(req.session.email)
    checkReadlist(req.session.email,"dune",res)})
app.get('/addreadlistflies',function(req, res){
      //console.log(req.session.email)
    console.log(req.session.email + "TESTPPPP")
    checkReadlist(req.session.email,"flies",res)
      
  })


let loadreadlist = function(req){
    
  let users= loadUsers()
  var i;
  var flag = 0;
 var readlistArray;
 
  for(i = 0; i < users.length; i++){
          
     if (users[i].name == req.session.email){
        readlistArray = users[i].readlist
             
        break}}
        console.log(readlistArray)
        return readlistArray;}

let updateUser= function(user,res){
    let users= loadUsers()
    var i;
    for(i = 0; i < users.length; i++){
              
       if (users[i].name == user.name){
          users[i] = user
                 
          break}}
      fs.writeFileSync('users.json',JSON.stringify(users))}


let checkReadlist = function(name,book,res){
    let user;
    let users= loadUsers()
        for(i = 0; i < users.length; i++){
            if (users[i].name == name){
               user = users[i]
               
                break}}
        console.log(user)
    
    
        var i;
        var flag = 1;
        for(i = 0; i < user.readlist.length; i++){
            if (user.readlist[i] == book){
                flag = 0
                break}}
        if (flag == 0){
            
            res.render('alertreadlist')}
        else{
            res.render(book)
            user.readlist.push(book)
            console.log(book + " Added")
            updateUser(user,res)}}

app.get('/alertreadlist', function(req, res){
    res.render('alertreadlist')})
          
app.get('/novel', function(req, res){
    res.render('novel')})
          
app.get('/book', function(req, res){
    res.redirect('/home')})
          
app.get('/grapes', function(req, res){
    res.render('grapes')})
          
app.get('/mockingbird', function(req, res){
    res.render('mockingbird')})
          
app.get('/poetry', function(req, res){
    res.render('poetry')}) 
                                  
app.get('/dune', function(req, res){
    res.render('dune')})
          
app.get('/sun', function(req, res){
    res.render('sun')})
                                          
          
app.get('/leaves', function(req, res){
    res.render('leaves')})
          
app.get('/fiction', function(req, res){
    res.render('fiction')})
          
app.get('/flies', function(req, res){
    res.render('flies')})
          
app.get('/searchresults', function(req, res){
    res.render('searchresults')})
          
app.post('/search', function(req, res){
  res.render('searchresults', {

ResList: loadSearch(req.body.Search)})})
          
// app.get('/readlist', function(req, res){
//   res.render('readlist', {
          
// ReadList: loadreadlist(req)})})
          

app.get('/readlist', function(req, res){
  console.log(loadreadlist(req))
  res.render('readlist', { ReadList: loadreadlist(req)}     )})

app.get('/testRoute', function(req, res){
  res.send(loadreadlist(req))})
        