'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('API Server', () => {
  test('handles invalid request', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  test('handles errors', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('bad route');
  });
  test('handles root path', async ()=> {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Home Path');
  });
  test('handles create request', async() => {
    let responseOne = await request.post('/animals').send({
      name: 'TestDog',
      age: 9,
      type: 'Dog',
    });
    let responseTwo = await request.post('/animals').send({
      name: 'TestCat',
      age: 5,
      type: 'Cat',
    });
    expect(responseOne.status).toEqual(200);
    expect(responseOne.body.name).toEqual('TestDog');
    expect(responseOne.body.age).toEqual(9);
    expect(responseOne.body.type).toEqual('Dog');
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.name).toEqual('TestCat');
    expect(responseTwo.body.age).toEqual(5);
    expect(responseTwo.body.type).toEqual('Cat');
  });
  test('handles read all request', async ()=> {
    let response = await request.get('/animals');
    expect(response.body.length).toBe(2);

    expect(response.body[0].name).toEqual('TestDog');
    expect(response.body[0].age).toEqual(9);
    expect(response.body[0].type).toEqual('Dog');
    expect(response.body[1].name).toEqual('TestCat');
    expect(response.body[1].age).toEqual(5);
    expect(response.body[1].type).toEqual('Cat');
  });
  test('handles single read request', async ()=> {
    let response = await request.get('/animals/1');

    expect(response.body.name).toEqual('TestDog');
    expect(response.body.age).toEqual(9);
    expect(response.body.type).toEqual('Dog');
  });
  test('handles update request', async ()=> {
    let response = await request.put('/animals/1').send({
      name: 'TestDog-2',
      age: 9,
      type: 'Dog',
    });
    expect(response.body.name).toEqual('TestDog-2');
    expect(response.body.age).toEqual(9);
    expect(response.body.type).toEqual('Dog');
  });
  test('handles delete request', async ()=> {
    await request.delete('/animals/1');
    let response = await request.get('/animals');

    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toEqual('TestCat');
    expect(response.body[0].age).toEqual(5);
    expect(response.body[0].type).toEqual('Cat');

  });

  test('handles create request', async() => {
    let responseOne = await request.post('/instruments').send({
      name: 'Viola',
      type: 'Strings',
    });
    let responseTwo = await request.post('/instruments').send({
      name: 'Flute',
      type: 'Woodwinds',
    });
    expect(responseOne.status).toEqual(200);
    expect(responseOne.body.name).toEqual('Viola');
    expect(responseOne.body.type).toEqual('Strings');
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.name).toEqual('Flute');
    expect(responseTwo.body.type).toEqual('Woodwinds');
  });
  test('handles read all request', async ()=> {
    let response = await request.get('/instruments');
    expect(response.body.length).toBe(2);

    expect(response.body[0].name).toEqual('Viola');
    expect(response.body[0].type).toEqual('Strings');
    expect(response.body[1].name).toEqual('Flute');
    expect(response.body[1].type).toEqual('Woodwinds');
  });
  test('handles single read request', async ()=> {
    let response = await request.get('/instruments/1');

    expect(response.body.name).toEqual('Viola');
    expect(response.body.type).toEqual('Strings');
  });
  test('handles update request', async ()=> {
    let response = await request.put('/instruments/1').send({
      name: 'Viola-2',
      type: 'Strings',
    });
    expect(response.body.name).toEqual('Viola-2');
    expect(response.body.type).toEqual('Strings');
  });
  test('handles delete request', async ()=> {
    await request.delete('/instruments/1');
    let response = await request.get('/instruments');

    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toEqual('Flute');
    expect(response.body[0].type).toEqual('Woodwinds');

  });

});
