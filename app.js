const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();
const router = new KoaRouter();

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

//list of things
async function index(ctx){
    await ctx.render('index',{
        title: 'such title',
        things: things
    });
}

//show add page
async function showAdd(ctx){
    await ctx.render('add');
}
//add stuff
async function add(ctx){
const body = ctx.request.body;
things.push(body.thing);
ctx.redirect('/');
}

router.get('/test', ctx => (ctx.body = 'hello test'));

//router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('server started...'));