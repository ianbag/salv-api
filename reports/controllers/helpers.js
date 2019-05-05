//Requires
const Handlebars = require('handlebars')

//Helper format CPF
Handlebars.registerHelper('cpf', function (cpf) {
    if (cpf) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 12)}`
    } else {
        return 'Não especificado'
    }
})