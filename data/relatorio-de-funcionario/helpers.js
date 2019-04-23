const Handlebars = require('handlebars')

//rg
Handlebars.registerHelper('rg', function (rg) {
    if (rg) {
        return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8, 10)}`
    } else {
        return 'Não especificado'
    }

})

//cpf
Handlebars.registerHelper('cpf', function (cpf) {
    if (cpf) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 12)}`
    } else {
        return 'Não especificado'
    }

})

//sexo
Handlebars.registerHelper('sexo', function (sexo) {
    if (sexo == 'M') {
        return 'Masculino'
    } else {
        return 'Feminino'
    }
})

//estado civil
Handlebars.registerHelper('estadoCivil', function (ec) {
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

//data de nascimento
Handlebars.registerHelper('dataNascimento', function (dn) {
    const ano = dn.slice(0, 4)
    const mes = dn.slice(5, 7)
    const dia = dn.slice(8, 10)
    return `${dia}/${mes}/${ano}`
})

//religiao
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

//escolaridade
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