const TelegramAPI = require('node-telegram-bot-api');
const {parse} = require("nodemon/lib/cli");
const base = require("./base.json");
const token = `5584082077:AAGEA5w1y7WPwpX-8lJN7iWX3snWDCniJ1I`;

const bot = new TelegramAPI(token,{polling: true})
const data_base = require('./base.json');
const chats = {}

const {shopOption} = require('./option');


let goods  ={
    title : ""
}

const start = () => {
    bot.setMyCommands([
        {command : `/start` , description: `Початкове Вітання`},
        {command : `/goods` , description: `Товари`},
        {command : `/services` , description: `Послуги`},
        {command : `/contact` , description: `Контакти`},
        {command : `/info` , description: `Інформація`},
    ])

    bot.on('message',  async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start'){
            await bot.sendSticker(chatId,`assets/hi.webp`);
            return  bot.sendMessage(chatId, `Привіт, ${msg.from.first_name}. \nВітаю в Telegram-боті BonITCom !`);
        }
        if (text === `/goods`){
           await bot.sendMessage(chatId, `ТОВАРИ`);
            for (let i = 0 ; i < data_base.chairs.length; i++){
                chats[i] = data_base.chairs[i].title;
                await  bot.sendPhoto(chatId,  data_base.chairs[i].image);
                await bot.sendMessage(chatId, `${data_base.chairs[i].title} \nЦіна:  ${data_base.chairs[i].price+"грн"}  \n${"Артикур: " + data_base.chairs[i].articles}`, shopOption);
            }
           return;
        }

        if (text === `/services`){
            return  bot.sendMessage(chatId, `ПОСЛУГИ\n\nДаний Бот надає послуги по перегляду товарів, з можливістю замовлення\n Для замовлення телефонуйте на контактиний номер та уточнуйте за наявність по артикулю.`);
        }
        if (text === `/contact`){
            return  bot.sendMessage(chatId, `КОНТАКТИ\n\nДиректор: +380534569824\nСекретарь: +380948531284\nВідділ замовлень: +380961239847\n\n Бажаємо Вам Гарного Дня!`);
        }

        if (text === `/info`){
            return  bot.sendMessage(chatId, `ІНФОРМАЦІЯ\n\n${msg.from.first_name}, цей бот створений для уявного магазину меблів.\nПрограма розроблена на замовлення від BondItCom.`);
        }

        return  bot.sendMessage(chatId, `Вибачте, Ваша команда не зрозуміла. Спробуйте ще раз !`)
    })

    bot.on(`callback_query`, msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        let goods = data;

        bot.sendMessage(chatId, goods );

    })

}


start();

