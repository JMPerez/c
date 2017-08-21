const { basename } = require('path');
const fs = require('fs');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const compression = require('compression');
const accepts = require('accepts');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const auth = require('./auth');
const api = require('./api');
const glob = require('glob');

// Get the supported languages by looking for translations in the `lang/` dir.
const languages = glob.sync('./lang/*.json').map(f => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = fs.readFileSync(localeDataFile, 'utf8');
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = locale => {
  return require(`../lang/${locale}.json`);
};

nextApp.prepare().then(() => {
  app.use(compression());
  app.use(cookieParser());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  // needed to parse refresh_token
  app.use(
    bodyParser.json({
      limit: 1024
    })
  );

  // auth router
  app.use('/auth', auth);

  app.use('/api', api(io));

  app.get('*', (req, res) => {
    const accept = accepts(req);
    const locale = accept.language(/*dev ? ['en'] : */ languages);
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    req.messages = /*dev ? {} :*/ getMessages(locale);
    console.log({
      locale: req.locale,
      messages: req.messages
    });
    return nextHandler(req, res);
  });

  server.listen(process.env.PORT || 3000, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});
