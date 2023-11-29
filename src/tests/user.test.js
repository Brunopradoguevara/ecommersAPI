const request = require('supertest');
const app = require('../app');

let id;
let token;



test('POST /users debe de crear un usuario', async () => {
    const user = {
        firstName: "Bruno",
        lastName: "Prado",
        email: "bruno1@gmail.com",
        password: "bruno1234",
        phone: "1234567890"
    };
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});


test('POST /users/login', async () => {
    const user = {
        email: 'bruno1@gmail.com',
        password: 'bruno1234'
    }
    const res = await request(app).post('/users/login').send(user)
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('POST /users/login debe de retornar credenciales incorrectas', async () => {
    const user = {
        email: 'bruno1@gmail.com',
        password: 'bruno123'
    }
    const res = await request(app).post('/users/login').send(user)

    expect(res.status).toBe(401);
});

test('GET /users debe de retornar todos los users', async () => {
    const res = await request(app).get('/users')
    .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id debe de actualiza el user', async () => {
    const user = {
        firstName: "Abraham"
    };
    const res = await request(app).put(`/users/${id}`)
    .send(user)
    .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});


test('DELETE /users/:id debe de eliminar el user', async () => {
    const res = await request(app).delete(`/users/${id}`)
    .set('Authorization',`Bearer ${token}`);

    expect(res.status).toBe(204);
});

