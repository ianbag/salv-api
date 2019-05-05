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

//Helper option Escolaridade
Handlebars.registerHelper('escolaridade', function (esc) {
    if (esc == 'FI') {
        return 'Fundamental incompleto'
    } else if (esc == 'FC') {
        return 'Fundamental completo'
    } else if (esc == 'MI') {
        return 'Médio incompleto'
    } else if (esc == 'MC') {
        return 'Médio completo'
    } else if (esc == 'SI') {
        return 'Superior incompleto'
    } else if (esc == 'SC') {
        return 'Superior completo'
    } else {
        return 'Não especificado'
    }
})

//Helper option Sexo
Handlebars.registerHelper('sexo', function (sexo) {
    if (sexo == 'M') {
        return 'Masculino'
    } else {
        return 'Feminino'
    }
})

//Helper option Estado civil
Handlebars.registerHelper('estado_civil', function (ec) {
    if (ec == 'S') {
        return 'Solteiro'
    } else if (ec == 'C') {
        return 'Casado'
    } else if (ec == 'D') {
        return 'Divorciado'
    } else {
        return 'Viúvo'
    }
})

//Helper option Religião
Handlebars.registerHelper('religiao', function (religiao) {
    if (religiao == 'CAT') {
        return 'Católico'
    } else if (religiao == 'EVG') {
        return 'Evangélico'
    } else if (religiao == 'ESP') {
        return 'Espirita'
    } else if (religiao == 'UBC') {
        return 'Umbanda e Candomblé'
    } else if (religiao == 'OUT') {
        return 'Outras religiões'
    } else if (religiao == 'SRG') {
        return 'Sem religião'
    } else {
        return 'Não especificado'
    }
})

//Helper option Situação INSS
Handlebars.registerHelper('situacao_inss', function (st_inss) {
    if (st_inss == 'AIV') {
        return 'Aposentado por invalidez'
    } else if (st_inss == 'BPC') {
        return 'Beneficio de prestação continuada'
    } else if (st_inss == 'AID') {
        return 'Aposentado por idade'
    } else {
        return 'Não especificado'
    }
})

//Helper format Telefone
Handlebars.registerHelper('telefone', function (telefones) {
    if (telefones) {
        var telefone = telefones.toString()
        if (telefone.length == '9') {
            return `${telefone.substr(0, 5)}-${telefone.substr(5, 4)}`
        } else {
            return `${telefone.substr(0, 4)}-${telefone.substr(4, 4)}`
        }
    }
})