/**
 * Created by tuukka on 9.3.2014.
 */

// node.js reitit, ohjaus angular appiin.

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendfile('index.html');
    });
    app.get('*', function (req, res) {
        res.redirect('/');
    });
};