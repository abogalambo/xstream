// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const fs = require('fs');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.host = functions.https.onRequest((req, res) => {
  const userAgent = req.headers['user-agent'].toLowerCase();
  let indexHTML = fs.readFileSync('./hosting/index.html').toString();
  const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';

  const isBot = userAgent.includes('googlebot') ||
    userAgent.includes('yahoou') ||
    userAgent.includes('bingbot') ||
    userAgent.includes('baiduspider') ||
    userAgent.includes('yandex') ||
    userAgent.includes('yeti') ||
    userAgent.includes('yodaobot') ||
    userAgent.includes('gigabot') ||
    userAgent.includes('ia_archiver') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('twitterbot') ||
    userAgent.includes('developers.google.com') ? true : false;

  if (isBot) {
    indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph());
  }

  res.status(200).send(indexHTML);
});

const imageUrl = "https://firebasestorage.googleapis.com/v0/b/x-stream-45773.appspot.com/o/stream_r8NCLTu5egzFjawodi7i%2Fsegment_1578945418226%2Fimage?alt=media&token=9cc4f9b6-ac4f-4503-8bc9-84e14ef0edc9"

const getOpenGraph = () => {
  let og = `<meta property="fb:app_id" content="524398084854004" />`;
  og += `<meta property="og:type" content="website" />`;
  og += `<meta property="og:title" content="xStream" />`;
  og += `<meta property="og:description" content="The better way to tell a story" />`;
  og += `<meta property="og:image" content="${imageUrl}" />`;
  og += `<meta property="og:url" content="https://x-stream-45773.web.app" />`;
  return og;
};