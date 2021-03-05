import { token } from './config';

import express, { Request, Response } from 'express'
import { Telegraf } from 'telegraf'

// const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token)
// Set the bot response
bot.on('text', (ctx) => ctx.replyWithHTML('<b>Hello</b>'))

// Set telegram webhook
// npm install -g localtunnel && lt --port 5001
bot.telegram.setWebhook('https://bot.6card.ru/vk')

const app = express()
app.get('/', (req: Request, res: Response) => res.send('Hello World!'))
// Set the bot API endpoint
app.use(bot.webhookCallback('/vk'))
app.listen(5001, () => {
  console.log('Example app listening on port 5001!')
})