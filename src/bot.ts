import { config } from './config';

// import express, { Request, Response } from 'express'
import { Context, Telegraf } from 'telegraf'

const token = config.token
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token)
// Set the bot response

bot.command('start', (ctx) => {
  ctx.reply(`Hello ${ctx.message.chat.id}`)
})

bot.on('message', (ctx) => {
  ctx.replyWithMarkdown(`Hello, *${ctx.message.from.first_name}*!`)
  ctx.replyWithPhoto('https://picsum.photos/200/300/')
})

if (process.env.NODE_ENV === "development") {
  bot.launch();
}
else {
  bot.launch({webhook: config.webhook});
}
// Set telegram webhook
// npm install -g localtunnel && lt --port 5001
// bot.telegram.setWebhook('https://bot.6card.ru/vk')

/*
const app = express()
app.get('/', (req: Request, res: Response) => res.send('Hello World!'))
// Set the bot API endpoint
app.use(bot.webhookCallback('/vk'))
app.listen(5001, () => {
  console.log('Example app listening on port 5001!')
})

*/

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))