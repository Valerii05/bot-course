module.exports = {
     shopOption : {
        reply_markup: JSON.stringify({
            inline_keyboard:[
                [{text: 'Купити', callback_data: `chair`}]
            ]
        })
    }
}