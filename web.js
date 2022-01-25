const DiscordWebhook = require('discord.js').WebhookClient
const Koa = require('koa');
const app = new Koa();
const webhook = new DiscordWebhook('925019664042590219','KVdT1pdwSc8YQBazzeZhsKigohu3tCcAHJ7x1tvO8K7kq-BoNGpTQ9dgdZi9eUk1QoqS')

// response
app.use(ctx => {
  ctx.redirect('http://littlecow.gitbook.io'+ctx.url);
  webhook.send(`\`\`\`\n路徑:${ctx.url}\n請求方法:${ctx.method}\nIP:${ctx.ip}\`\`\``)
});

app.listen(30252);