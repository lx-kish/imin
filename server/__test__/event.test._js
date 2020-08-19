const request = require('supertest');
const express = require('express')();
const server = require('../server');

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};


describe('event middleware', () => {

    it('should return 200 on correct request', () => {
        // await request(app)
        // request(server)
        //     .get('/api/event/create')
        //     .then(response => {
        //         expect(response.statusCode).toBe(200);
        //     });

        const req = mockRequest(
            {},
            {
                hoster: '5f31d83dfa796cd05421d9ba',
                name: 'workshopp',
                industry: '123',
                skill: '456',
                capacity: '10',
                start: '08/22/2020',
                end: '08/26/2020',
                time: '14:00',
                city: 'Wellington',
                address: '21, Queen street, CDB'
            }
        );
        const res = mockResponse();
        request(server).
            post('/api/event/create/')
            // post('/api/event/create/', (req, res))
            .then(response => {
                expect(response.statusCode).toBe(200);
                // console.log(res);
                // expect(res.status).toHaveBeenCalledWith(200);
                // expect(res.json).toHaveBeenCalledWith({
                //     message: 'Wrong password'
                // });
            });


    });

});