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
const things = ['chips', 'tacos', 'cheese']

//bodyparser middleware
app.use(bodyParser());

// how the hell do I link css?
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
    // console.log(body.thing);
    ctx.redirect('/add');

    await stuffModel.add(body.thing); //add stuff to db 

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
        title: 'Login user'
    });
}

//log into user
async function getLogin(ctx) {
    let getUsername = await userModel.getUser(admin);
    console.log(getUsername);
}



//router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('server started...'));