var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('index', { title: 'PATRIC', request: req, response: res });
});

/* GET about page. */
router.get('/about', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/about', { title: 'PATRIC', request: req, response: res });
});

/* GET advisory_board page. */
router.get('/advisory_board', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/advisory_board', { title: 'PATRIC', request: req, response: res });
});

/* GET announcements page. */
router.get('/announcements', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/announcements', { title: 'PATRIC', request: req, response: res });
});

/* GET citation page. */
router.get('/citation', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/citation', { title: 'PATRIC', request: req, response: res });
});

/* GET publications page. */
router.get('/publications', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/publications', { title: 'PATRIC', request: req, response: res });
});

/* GET related resources page. */
router.get('/related-resources', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/related-resources', { title: 'PATRIC', request: req, response: res });
});

/* GET team page. */
router.get('/team', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/team', { title: 'PATRIC', request: req, response: res });
});

/* SARS-CoV-2 */
router.get('/sars-cov-2', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/sars-cov-2', { title: 'PATRIC', request: req, response: res });
});

/* SARS-CoV-2 User Guide */
router.get('/docs/user-guides/sars-cov-2', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('docs/user-guides/sars-cov-2', { title: 'PATRIC', request: req, response: res });
});

/* SARS-CoV-2 Tutorial */
router.get('/docs/tutorials/sars-cov-2', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('docs/tutorials/sars-cov-2', { title: 'PATRIC', request: req, response: res });
});

/* GET outreach page. */
router.get('/brc-calendar', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/brc-calendar', { title: 'PATRIC', request: req, response: res });
});

/* GET all searches page. */
router.get('/searches', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/searches', { title: 'PATRIC', request: req, response: res });
});

/* GET all tools & services page. */
router.get('/tools', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/tools', { title: 'PATRIC', request: req, response: res });
});

/* GET privacy policy page. */
router.get('/privacy-policy', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/privacy-policy', { title: 'PATRIC', request: req, response: res });
});

/* GET privacy policy page. */
router.get('/verify_failure', function (req, res) {
  req.applicationModule = 'p3/app/p3app';
  res.render('pages/verify_failure', { title: 'PATRIC', request: req, response: res });
});

module.exports = router;
