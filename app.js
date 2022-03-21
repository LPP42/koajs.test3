const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();
const router = new KoaRouter();

//trying to implement db
const stuffModel = require('./model/stuff');
//for login page
const userModel = require('./model/userLogin');

//this should be the db
const things = ['chips', 'tacos', 'cheese'];

//

//bodyparser middleware
app.use(bodyParser());
//how the hell do I link css?
app.use(serve('./public'));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: 'false',
    debug: 'false'
})

//routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);
router.get('/remove', showRemove);
router.post('/remove', remove);
router.get('/login', showLogin);
router.post('/login', getLogin);
router.get('/createUser', showCreateUser);
router.post('/createUser', createUser);
router.get('/welcomeUser', showWelcome);

//Get stuff
async function index(ctx) {
    let listOfStuff = await stuffModel.get();
    await ctx.render('index', {
        title: 'Here\'s your stuff',
        things: listOfStuff.map(a => a.name)
    });
}

//show add page
async function showAdd(ctx) {
    await ctx.render('add');
}
//add stuff
async function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    console.log(body.thing);

    if (body.thing !== null && body.thing !== "") {
        await stuffModel.add(body.thing); //add stuff to db 
    }
    ctx.redirect('/add');
}

//show remove page
async function showRemove(ctx) {
    let listOfStuff = await stuffModel.get();
    await ctx.render('remove', {
        title: 'Remove items',
        things: listOfStuff
    });
}

//remove stuff
async function remove(ctx) {
    const body = ctx.request.body;
    // console.log(ctx.request.body.idToDelete);
    await stuffModel.delete(ctx.request.body.idToDelete); //remove stuff to db 
    ctx.redirect('/remove');
}

//show login page
async function showLogin(ctx) {
    await ctx.render('login', {
        title: 'Login user',
        userName: getUsername
    });
}
let getUsername;
//log into user
let userId;
let userName;
let userPassword;
async function getLogin(ctx) {

    console.log(ctx.request.body.UserName);

    getUsername = await userModel.getUser(ctx.request.body.UserName);

    userId = (getUsername.map(a => a.userId));
    userName = (getUsername.map(a => a.userName));
    userPassword = (getUsername.map(a => a.userPassword));

    ctx.redirect('/welcomeUser');

}
//show welcome
async function showWelcome(ctx) {
    await ctx.render('welcomeUser', {
        userName: userName
    })
}

//show create user page
async function showCreateUser(ctx) {
    await ctx.render('createUser');
}

//create and add user to db
async function createUser(ctx) {
    const body = ctx.request.body;

    let firstName = ctx.request.body.firstName;
    let lastName = ctx.request.body.lastName;
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let verifyPassword = ctx.request.body.verifyPassword;




    if (firstName !== "" && firstName.length < 128 && lastName !== "" && lastName.length < 128 && username !== "" && username.length < 50 && password !== "" && password.length < 50 && password === verifyPassword) {
        await userModel.createUser(firstName, lastName, username, password);
    }
    else {
        console.log("mutchos problemos");
    }
    ctx.redirect('/login');
}


//router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('server started...'));