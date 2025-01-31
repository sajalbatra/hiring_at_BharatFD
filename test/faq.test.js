const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app'); // Adjust the path to your Express app

describe('FAQ API', function () {
    let faqId;
    this.timeout(10000); 

    // Test for creating a new FAQ
    describe('POST /api/faqs', function () {
        it('should create a new FAQ', async function () {
            const response = await request(app)
                .post('/api/faqs')
                .send({
                    question: 'What is your name?',
                    answer: 'My name is Sajal.'
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('_id');
            expect(response.body.question).to.equal('What is your name?');
            expect(response.body.answer).to.equal('My name is Sajal.');
            
            faqId = response.body._id;
        }).timeout(5000); 
    });

    // Test for fetching FAQs
    describe('GET /api/faqs', function () {
        it('should fetch all FAQs in English (default)', async function () {
            const response = await request(app).get('/api/faqs');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0); 
        });

        it('should fetch FAQs in Hindi', async function () {
            const response = await request(app).get('/api/faqs?lang=hi');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0); 
        });

        it('should fetch FAQs in Bengali', async function () {
            const response = await request(app).get('/api/faqs?lang=bn');

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0); 
        });
    });

    after(async function () {
        if (faqId) {
            await request(app).delete(`/api/faqs/${faqId}`);
        }
    });
});
