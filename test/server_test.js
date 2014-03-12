/**
 * Created by tuukka on 4.3.2014.
 */

//'use strict';

//var server = require('../server.js');
//var ioc = require('socket.io-client'), assert = require('assert'), expect = require('expect.js'), http = require('http').Server, io = require("socket.io");
//
//// creates a socket.io client for the given server
//function client(srv, nsp, opts){
//    if ('object' == typeof nsp) {
//        opts = nsp;
//        nsp = null;
//    }
//    var addr = srv.address();
//    if (!addr) addr = srv.listen().address();
//    var url = 'ws://' + addr.address + ':' + addr.port + (nsp || '');
//    return ioc(url, opts);
//}
//
//describe('socket', function () {
//
//    var sio;
//    var socket2;
//    var server;
//
//    before(function () {
//        server = http();
//        sio = io(server);
//    });
//
//    describe('userList', function() {
//       it('has correct amoount', function(done) {
//           server.listen(function(){
//               var socket1 = client(server, { multiplex: false });
//               var socket2 = client(server, { multiplex: false });
//               var i = 0;
//               socket.on('userList', function(data) {
//                    if (i == 1) {
//                        expect(data.length).to.equal(2);
//                    }
//               });
//           });
//       });
//    });
//});