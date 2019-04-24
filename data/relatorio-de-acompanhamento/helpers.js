Handlebars.registerHelper('dataAcompanhamento', function (dn) {
    const ano = dn.slice(0, 4)
    const mes = dn.slice(5, 7)
    const dia = dn.slice(8, 10)
    return `${dia}/${mes}/${ano}`
})