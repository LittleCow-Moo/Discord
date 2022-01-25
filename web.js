const DiscordWebhook = require('discord.js').WebhookClient
const Koa = require('koa');
const app = new Koa();
const webhook = new DiscordWebhook('Re','moved')

// response
app.use(ctx => {
  ctx.redirect('http://littlecow.gitbook.io'+ctx.url);
  webhook.send(`\`\`\`\n路徑:${ctx.url}\n請求方法:${ctx.method}\nIP:${ctx.ip}\`\`\``)
});

app.listen(30252);
