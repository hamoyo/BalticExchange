
const axios = require('axios');
const expect = require('chai').expect;

const BASE_URL = 'https://restful-booker.herokuapp.com';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
};

describe('Restful Booker API', function () {
  

  let bookingId;
  let token;

  

  beforeEach(done => setTimeout(done, 500));

  it('should generate an auth token', async function () {
    const response = await axios.post(`${BASE_URL}/auth`, {
      username: "admin",
      password: "password123"
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('token');
    token = response.data.token;
  });
  
  
  it('missing required fields shouldnot create a new booking', async function () {
    const response = await axios.post(`${BASE_URL}/booking`, {
      firstname: "John",
      additionalneeds: "Breakfast"
    }, {
      headers: headers
    });

    expect(response.status).to.equal(501);
    expect(response.data).to.have.property('bookingid');
    bookingId = response.data.bookingid;
  });
  
  it('should create a new booking', async function () {
    const response = await axios.post(`${BASE_URL}/booking`, {
      firstname: "John",
      lastname: "Doe",
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-07-15",
        checkout: "2025-07-20"
      },
      additionalneeds: "Breakfast"
    }, {
      headers: headers
    });

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('bookingid');
    bookingId = response.data.bookingid;
  });

  it('should retrieve a booking by ID', async function () {
    const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
      headers: headers
    });
    expect(response.status).to.equal(200);
    expect(response.data.firstname).to.equal('John');
  });
  
  it('without token shouldnot update the booking ', async function () {
    const response = await axios.put(`${BASE_URL}/booking/${bookingId}`, {
      firstname: "Jane",
      lastname: "Doe",
      totalprice: 200,
      depositpaid: false,
      bookingdates: {
        checkin: "2025-08-01",
        checkout: "2025-08-05"
      },
      additionalneeds: "None"
    });

    expect(response.status).to.equal(405);
    expect(response.data.firstname).to.equal('Jane');
  });

  it('should update the booking with token', async function () {
    const response = await axios.put(`${BASE_URL}/booking/${bookingId}`, {
      firstname: "Jane",
      lastname: "Doe",
      totalprice: 200,
      depositpaid: false,
      bookingdates: {
        checkin: "2025-08-01",
        checkout: "2025-08-05"
      },
      additionalneeds: "None"
    }, { 
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Cookie': `token=${token}`
      }
    });

    expect(response.status).to.equal(200);
    expect(response.data.firstname).to.equal('Jane');
  });

  it('should delete the booking', async function () {
    const response = await axios.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(response.status).to.be.oneOf([200, 201]);
  });

});
