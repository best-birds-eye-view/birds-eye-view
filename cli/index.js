const request = require('superagent');
const Game = require('./game');
const emoji = require('./emoji');
const server = 'https://better-birds-eye-view.herokuapp.com';
const colors = require('colors'); // eslint-disable-line


console.log(`\n\n\n\nHi, welcome to Bird's eye view! ${emoji.bird[1]} \n\n`.blue.bold); // eslint-disable-line


let token = '';

const service = {
    signUp(userData) {
        return request.post(`${server}/api/auth/signup`)
            .send(userData)
            .then(({ body }) => {
                token = body.token;
                return body;
            });
    },
    signIn(userData) {
        return request.post(`${server}/api/auth/signin`)
            .send(userData)
            .then(({ body }) => {
                token = body.token;
                return body;
            });
    },
    getInitialDesc(userId) {
        return request.get(`${server}/api/users/${userId}/intro`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body;
            });
    },
    getUserCoords(userId) {
        return request.get(`${server}/api/users/${userId}/coords`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body;
            });
    },
    updateUserIfSquareExists(userId, x, y) {
        return request.put(`${server}/api/users/${userId}/square`)
            .send({ x: x, y: y })
            .set('Authorization', token)
            .then(({ body }) => {
                return body;
            });
    },
    getSquareInfo(currentLevel, currentSquare) { // TODO: write
        return request.get(`${server}/api/levels/${currentLevel}/squares/${currentSquare}`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body; // return populated info about everything in square
            });
    },
    addItem(userId, item) {
        return request.post(`${server}/api/users/${userId}/inventory`)
            .set('Authorization', token)
            .send({ item: item })
            .then(({ body }) => {
                return body;
            });
    },
    getInventory(userId) {
        return request.get(`${server}/api/users/${userId}/inventory`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body;
            });
    },
    deleteInventory(userId, itemId) {
        return request.delete(`${server}/api/users/${userId}/inventory/${itemId}`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body;
            });
    },
    getRandomHazard() { // TODO: write
        return request.get(`${server}/api/hazards`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body; // return $sample { size: 1 }
            });
    },
    getLevel(userId) {
        return request.get(`${server}/api/users/${userId}/level`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body;
            });
    },
    updateUserIfLevelExists(userId) {
        return request.put(`${server}/api/users/${userId}/level`)
            .set('Authorization', token)
            .then(({ body }) => {
                return body; // return something like { updated: false } if no more levels (so they can win!)
            });
    }
};

const game = new Game(service);
game.start();
