const telegraph = require('telegraf');
const bradyBunch = require('../status');

const bot = new telegraph.Telegraf(process.env.TELEGRAF_BOT_TOKEN)

console.log('starting')

bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id)

    // Using context shortcut
    ctx.leaveChat()
})

bot.on('status', (ctx) => {
    const garageStatus = bradyBunch.getGarageStatus();
    console.log('here')
    ctx.telegram.sendMessage(`GarageDoor: ${garageStatus.doorClosed}`)
})

bot.on('text', (ctx) => {
    // Explicit usage
    const garageStatus = bradyBunch.getGarageStatus();
    if (ctx.message.text === "/status") {
        ctx.reply(`The garage door is ${garageStatus.doorClosed ? 'closed' : 'open'}`)
        ctx.reply(`The garage light is ${garageStatus.lightOff ? 'off' : 'on'}`)
    }
})

bot.on('callback_query', (ctx) => {
    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    // Using context shortcut
    ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
    const result = []
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

    // Using context shortcut
    ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => {
    console.log('closing bot down');
    bot.stop('SIGINT')
})
process.once('SIGTERM', () => bot.stop('SIGTERM'))
