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

//Helper format RG
Handlebars.registerHelper('rg', function (rg) {
    if (rg) {
        return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8, 10)}`
    } else {
        return 'Não especificado'
    }
})