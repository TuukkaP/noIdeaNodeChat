/**
 * Created by tuukka on 4.3.2014.
 */
'use strict';

var server = require('../server.js');
//var io = require('socket.io-client')
//    , assert = require('assert')
//    , expect = require('expect.js');
//
//exports.server = {
//    setUp: function(done) {
//        socket = io.connect('http://localhost/', {
//            'reconnection delay' : 0
//            , 'reopen delay' : 0
//            , 'force new connection' : true
//        });
//        socket.on('connect', function() {
//            console.log('worked...');
//            done();
//        });
//        socket.on('disconnect', function() {
//            console.log('disconnected...');
//        })
//    }
//    'no args': function(test) {
//        test.expect(1);
//        // tests here
//        test.equal(noideanodechat.awesome(), 'awesome', 'should be awesome.');
//        test.done();
//    }
//};


var io = require('socket.io-client'), assert = require('assert'), expect = require('expect.js');

describe('Chat with', function () {

    var socket;

    before(function () {
        // Setup
        socket = io.connect('http://localhost:3000', {
            'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
        });

        socket.on('connect', function () {
            socket.emit('joinChat', "tester1");
            console.log('1. test client connected');

        });

    });

    after(function (done) {
        // Cleanup
        socket.on('disconnect', function () {
            console.log('socket1 disconnected...');
        });
        if (socket.socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('one user works ', function () {

        it('userList is correct', function (done) {
            socket.on('userList', function (data) {
                console.log(data);
                expect(Object.keys(data).length).to.be.equal(1);
                done();
            });
        });

        it('messages are send and received', function(done) {
            socket.emit('chatToServer', "Message");
            socket.on('chatToClient', function (time, username, msg) {
                expect(username).to.be.equal('tester1');
                expect(msg).to.be.equal('Message');
                done();
            });
        });
    });
});

describe('Chat with', function () {

    var socket;
    var socket2;
    var log = [];
    var log2 = [];

    beforeEach(function () {
        socket = io.connect('http://localhost:3000', {
            'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
        });
        socket.on('connect', function () {
            socket.emit('joinChat', "tester1");
            console.log('1. test client connected');
        });
        socket.on('chatToClient', function (time, username, msg) {
            log.push( (time +' '+ username + ' ' + msg) );
        });
        socket.on('userList', function (data) {
            log.push( data );
//            expect(Object.keys(data).length).to.be.equal(2)
//            done();
        });
        socket2 = io.connect('http://localhost:3000', {
            'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
        });
        socket2.on('connect', function () {
            socket2.emit('joinChat', "tester2");
            console.log('2. test client connected');
        });
        socket2.on('userList', function (data) {
            log2.push( data );
//            expect(Object.keys(data).length).to.be.equal(2)
//            done();
        });
//        socket2 = io.connect('http://localhost:3000', {
//            'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
//        });
//        socket2.on('connect', function () {
//            socket2.emit('joinChat', "tester2");
//            console.log('2. test client connected');
//            socket2.emit('chatToServer', "Message");
//            socket.emit('chatToServer', "Message");
//        });
        socket2.on('chatToClient', function (time, username, msg) {
            log2.push( (time +' '+ username + ' ' + msg) );
        });
//        socket2 = io.connect('http://localhost:3000', {
//            'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
//        });
//        socket2.on('connect', function () {
//            socket2.emit('joinChat', "tester2");
//            console.log('2. test client connected');
//
//        });
    });

    afterEach(function (done) {
        // Cleanup
        console.log(log);
        console.log(log2);
        socket.on('disconnect', function () {
            console.log('socket1 disconnected...');
        });
        socket2.on('disconnect', function() {
            console.log('socket2 disconnected...');
        });
        if (socket.socket.connected || socket2.socket.connected) {
            console.log('disconnecting...');
            socket2.disconnect();
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('two users works ', function () {

        it('userList is correct', function (done) {
//            console.log(log);
//            console.log(log2);
//            socket2 = io.connect('http://localhost:3000', {
//                'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
//            });
//            socket2.on('connect', function () {
//                socket2.emit('joinChat', "tester2");
//                console.log('2. test client connected');
//
//            });
//            socket2.on('userList', function (data) {
//                console.log(data);
//                expect(Object.keys(data).length).to.be.equal(2)
//                done();
//            });
        });

//        it('messages are broadcasted from tester1 to tester2', function (done) {
//            socket2 = io.connect('http://localhost:3000', {
//                'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
//            });
//            socket2.on('connect', function () {
//                socket2.emit('joinChat', "tester2");
//                console.log('2. test client connected');
//                socket2.emit('chatToServer', "Message");
//                socket.emit('chatToServer', "Message");
//            });
//            socket2.on('chatToClient', function (time, username, msg) {
//                log2.push( (time +' '+ username + ' ' + msg) );
//            });
//            socket.emit('chatToServer', "Message");
//
//            socket2.on('chatToClient', function (time, username, msg) {
//                console.log(time +' '+ username + ' ' + msg);
//                expect(username).to.be.equal('tester1');
//                expect(msg).to.be.equal('Message');
//                done();
//            });
//            console.log(log);
//            console.log(log2);
//            socket.emit('chatToServer', "Message");
//        });

//        it('messages are broadcasted', function (done) {
//            socket2 = io.connect('http://localhost:3000', {
//                'reconnection delay': 0, 'reopen delay': 0, 'force new connection': true
//            });
//            socket2.on('connect', function () {
//                socket2.emit('joinChat', "tester2");
//                console.log('2. test client connected');
//            });
//            socket.on('chatToClient', function (time, username, msg) {
//                console.log(time +' '+ username + ' ' + msg);
//            });
//            socket2.emit('chatToServer', "Message");
//            console.log(msg);
//            console.log(msg2);
//            socket.on('chatToClient', function (time, username, msg) {
//                console.log(time +' '+ username + ' ' + msg);
//                expect(username).to.be.equal('tester1');
//                expect(msg).to.be.equal('Message');
//                done();
//            });
//        });
    });
});