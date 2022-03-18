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

//Get stuff
async function index(ctx){

    let listOfStuff =  await stuffModel.get();

    await ctx.render('index',{
        title: 'such title',
        //  things: things
        things: listOfStuff.map(a => a.name)
    });
    console.log(things);
    console.log(listOfStuff.map(a => a.name));
}

//show add page
async function showAdd(ctx){
    await ctx.render('add');
}
//add stuff
async function add(ctx){
    const body = ctx.request.body;
    things.push(body.thing);
    console.log(body.thing);
    ctx.redirect('/');

    await stuffModel.add(body.thing); //add stuff to db 

}

//show remove page
async function showRemove(ctx){
    await ctx.render('remove');
}

router.get('/test', ctx => (ctx.body = 'hello test'));

//router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('server started...'));