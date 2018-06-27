const express = require('express');
const hbs = require('express-handlebars');
const i18n = require('i18n');
const app = express();

i18n.configure({
    locales: ['en', 'de'],
    cookie: 'mf-i18n-test',
    directory: __dirname + '/locales',
    defaultLocale: 'de'
})

app.use(i18n.init)

app.use(function (req, res, next) {
    var locale = 'de'
    req.setLocale(locale)
    res.locals.language = locale
    next()
})

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.cookie('mf-i18n-test', 'de', { maxAge: 900000, httpOnly: true });
    console.log(res.locals);


    console.log(i18n.getLocale());

    res.render('home', {
        text: req.__('Hello'),
        hello: req.__n('%s dog', 2),
        sheep: req.__n('Da ist eins Ship', 'Da sind %s Shipzen', 1)
    })
})


app.listen(3333, () => {
    console.log("listening on port 3333");
})
