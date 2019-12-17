const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
let clients = [];
router.get('/subscribe', async (ctx, next) => {
    const promise = new Promise(function(resolve, reject) {
      clients.push(resolve);
    });
    const message = await promise;
    ctx.body = message;
  });

router.post('/publish', async (ctx, next) => {
    if (ctx.request.body.message) {
        clients.forEach((res) => {
            res(JSON.stringify(ctx.request.body.message));
        });
    
        clients = [];
        ctx.body = 200;
    };
});

app.use(router.routes());

module.exports = app;
