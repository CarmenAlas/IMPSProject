const helpers = require('handlebars');

// Este helper nos permite comparar 2 valores en la plantilla handlebars
helpers.registerHelper('eq', function (a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this); // Utilizamos un if ternario
});

// Helper para formato de la fecha


helpers.registerHelper('formatDate', function (date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
});

module.exports = helpers;
