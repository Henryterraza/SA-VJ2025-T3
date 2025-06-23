const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: false }); // limpio y controlado
});


afterAll(async () => {
  await sequelize.close();
});

describe('API CIs', () => {
  let createdCIId;

  test('POST /cis - crear un CI', async () => {
    const response = await request(app)
      .post('/cis')
      .send({
        name: "ServidorApp01",
        description: "Servidor de aplicaciones empresariales",
        ci_type_id: 1,
        serial_number: "SN12345",
        version: "v1.0",
        acquisition_date: "2022-01-01",
        current_state: "Activo",
        physical_location: "Sala 1",
        owner: "Infraestructura",
        change_date: "2022-01-10",
        change_description: "Instalación inicial",
        related_docs: "[Enlace a Manual](url)",
        incident_links: "[Incidente1](url)",
        security_level_id: 1,
        compliance_level_id: 1,
        config_state: "Aprobado",
        license_number: "LIC123",
        expiration_date: "2024-01-01",
        environment_id: 3
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('ServidorApp01');
    createdCIId = response.body.id;
  });

  test('GET /cis/:id - obtener CI creado', async () => {
    const response = await request(app).get(`/cis/${createdCIId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(createdCIId);
    expect(response.body.name).toBe('ServidorApp01');
  });

  test('PUT /cis/:id - actualizar CI', async () => {
    const response = await request(app)
      .put(`/cis/${createdCIId}`)
      .send({ current_state: 'Inactivo' });
    expect(response.statusCode).toBe(200);
    expect(response.body.current_state).toBe('Inactivo');
  });

  test('DELETE /cis/:id - eliminar CI', async () => {
    const response = await request(app).delete(`/cis/${createdCIId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('CI deleted');
  });

  test('GET /cis/:id - CI no encontrado después de eliminar', async () => {
    const response = await request(app).get(`/cis/${createdCIId}`);
    expect(response.statusCode).toBe(404);
  });
});
