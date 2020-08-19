const request = require('supertest');
const express = require('express')();
const server = require('../server');


describe('server routes test set', () => {

    it('status route to check if it works... ', () => {
        // await request(app)
        request(server)
            .get('/status/')
            .then(response => {
                expect(response.statusCode).toBe(200);
            });

    });

});