const pa11y = require('pa11y');
const mocha = require('mocha');
const path = require('path');
const chai = require('chai');
const expect = require('chai').expect;
const util = require('util');
const server = require('../server');
const config = require('../config');

const options = {
  standard: 'WCAG2AA'
};

// Pass the pa11y error to chai custom  message
const pa11yError = err => (err.length ? '\n' + util.inspect(err) : null);

const url =
  process.env.NODE_ENV === 'testing'
    ? `http://localhost:${config.PORT}`
    : 'http://example.com';

const pages = ['/','/contact', '/about'];

before(function(done) {
  server.start(done);
});

// Only need to stop the server in in watch mode
after(function() {
  server.stop();
});

describe('Pages', function() {
  pages.forEach(page => {
    it(`${url}${page} should be accessible`, function(done) {
      pa11y(url + page, options)
        .then(results => {
          expect(results.issues, pa11yError(results.issues)).to.be.empty;
        })
        .then(done, done)
        .catch(err => {
          console.log(err);
        });
    });
  });
});
