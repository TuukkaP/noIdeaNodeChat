/**
 * Created by tuukka on 4.3.2014.
 */

'use strict';

var server = require('../server.js');
var io = require('socket.io-client'), assert = require('assert'), expect = require('expect.js');

describe('server', function () {

    var socket;
    var socket2;

    beforeEach(function () {
        socket = io.connect('http://localhost:3000', {
            'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
        });
        socket2 = io.connect('http://localhost:3000', {
            'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
        });
    });


    afterEach(function () {
            console.log('disconnecting...');
            socket.disconnect();
            socket2.disconnect();
    });

    describe('test', function () {
        it('userList is correct', function (done) {
            socket.on('userList', function (data) {
                console.log(data);
                expect(Object.keys(data).length).to.be.equal(1);
                expect(data['tester1']).to.be.equal('tester1');
            });
            socket.emit('joinChat', "tester1");
            setTimeout(function () {
                done();
            }, 100);
        });


        it('user gets connection message from SERVER', function (done) {
            socket.on('chatToClient', function (time, username, msg) {
                console.log(time + ' ' + username + ' ' + msg);
                expect(username).to.be.equal('SERVER');
                expect(msg).to.be.equal(' you have connected');
            });
            socket.emit('joinChat', "tester1");
            setTimeout(function () {
                done();
            }, 100);
        });

        it('user gets own message broadcasted back', function (done) {
            var i = 0;
            socket.on('chatToClient', function (time, username, msg) {
                console.log(time + ' ' + username + ' ' + msg);
                if (i == 1) {
                    expect(username).to.be.equal('tester1');
                    expect(msg).to.be.equal('message');
                }
                i++;
            });
            socket.emit('joinChat', "tester1");
            socket.emit('chatToServer', "message");
            setTimeout(function () {
                done();
            }, 100);
        });

        it('two users get correct userList', function (done) {
            var i = 0;
            socket.on('userList', function (data) {
                console.log(data);
                if (i==1) {
                    expect(Object.keys(data).length).to.be.equal(2);
                    expect(data['tester1']).to.be.equal('tester1');
                    expect(data['tester2']).to.be.equal('tester2');
                }
            });
            socket.emit('joinChat', "tester1");
            socket2.emit('joinChat', "tester2");
            setTimeout(function () {
                done();
            }, 100);
        });

        it('both users get connection messages', function (done) {
            var i = 0;
            var j = 0;
            socket.on('chatToClient', function (time, username, msg) {
                console.log(i + ' ' + time + ' ' + username + ' ' + msg);
                if (i == 1) {
                    expect(username).to.be.equal('SERVER');
                    expect(msg).to.be.equal('tester2 has connected');
                }
                i++;
            });

            socket2.on('chatToClient', function (time, username, msg) {
                console.log(j + ' ' + time + ' ' + username + ' ' + msg);
                if (j == 1) {
                    expect(username).to.be.equal('SERVER');
                    expect(msg).to.be.equal(' you have connected');
                }
                j++;
            });
            socket.emit('joinChat', "tester1");
            socket2.emit('joinChat', "tester2");
            setTimeout(function () {
                done();
            }, 100);
        });

        it('both users see each others messages', function (done) {
            var i = 0;
            var j = 0;
            socket.on('chatToClient', function (time, username, msg) {
                console.log(i + ' ' + time + ' ' + username + ' ' + msg);
                if (i == 3) {
                    expect(username).to.be.equal('tester2');
                    expect(msg).to.be.equal('tester2 message');
                }
                i++;
            });

            socket2.on('chatToClient', function (time, username, msg) {
                console.log(j + ' ' + time + ' ' + username + ' ' + msg);
                if (j == 2) {
                    expect(username).to.be.equal('tester1');
                    expect(msg).to.be.equal('tester1 message');
                }
                j++;
            });
            socket.emit('joinChat', "tester1");
            socket2.emit('joinChat', "tester2");
            setTimeout(function () {
                socket.emit('chatToServer', "tester1 message");
            }, 50);
            setTimeout(function () {
                socket2.emit('chatToServer', "tester2 message");
            }, 100);

            setTimeout(function () {
                done();
            }, 200);
        });

        it('tester1 sees tester2s messages and disconnect notification', function (done) {
            var i = 0;
            var j = 0;
            socket.on('chatToClient', function (time, username, msg) {
                console.log(i + ' ' + time + ' ' + username + ' ' + msg);
                if (i ==3) {
                    expect(username).to.be.equal('tester2');
                    expect(msg).to.be.equal('tester2 message');
                }
                if (i ==4) {
                    expect(username).to.be.equal('tester2');
                    expect(msg).to.be.equal('disconnected');
                }
                i++;
            });
            socket.emit('joinChat', "tester1");
            socket2.emit('joinChat', "tester2");
            setTimeout(function () {
                socket.emit('chatToServer', "tester1 message");
            }, 50);
            setTimeout(function () {
                socket2.emit('chatToServer', "tester2 message");
                socket2.disconnect();
            }, 100);

            setTimeout(function () {
                done();
            }, 200);
        });
    });
});