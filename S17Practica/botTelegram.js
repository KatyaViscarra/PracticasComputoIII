const { Telegraf } = require("telegraf");
const { brotliCompress } = require("zlib");
const bot = new Telegraf("5346741522:AAGSZo_Dn3tbf7E15sglfJS3pECVumOQ0PU");

bot.start((ctx) => {
    ctx.reply(`Bienvenido a Programación Computacional IV - Grupo A1 ${ctx.from.first_name}`)
});

//comando personalizado
bot.command(['saludar', 'saludo', 'comando'], (ctx) => {
    ctx.reply("Comando personalizado")
});

//escuchar
bot.on('sticker', (ctx) => {
    ctx.reply("Haz enviado un sticker :)")
});

//iniciar el bot
bot.launch();