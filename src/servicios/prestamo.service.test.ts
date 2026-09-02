//  prestamo.service.test.ts  —  pruebas del Service (paso 7 del PDF)

// 'node:test' es el test runner que viene incluido en node
// 'describe' agrupa pruebas relacionadas bajo un mismo
// 'it' declara una prueba individual.
import { describe, it } from 'node:test';

import assert from 'node:assert/strict';

import { PrestamoService } from './prestamo.service.js';
import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

//  arrange: arma un service nuevo con un repositorio vacio.
function crearServicio(): PrestamoService {
  const repositorio = new InMemoryPrestamoRepository();
  return new PrestamoService(repositorio);
}

describe('PrestamoService', () => {
  // prueba 1: camino feliz
  it('crea un prestamo valido y lo deja en estado activo', async () => {
    // arrange: servicio limpio
    const servicio = crearServicio();

    // act: crear un prestamo con datos validos
    const prestamo = await servicio.crear({
      libroId: 'LIB-0001',
      socioId: 'S-100',
      ejemplares: [1, 2],
    });

    // assert: lo que devuelve 'crear' debe tener folio generado,
    // estado 'activo' y los mismos datos que mandamos.
    assert.equal(prestamo.estado, 'activo');
    assert.equal(prestamo.libroId, 'LIB-0001');
    assert.equal(prestamo.socioId, 'S-100');
    assert.deepEqual(prestamo.ejemplares, [1, 2]);
    assert.ok(prestamo.folio.length > 0);
  });

  // prueba 2: ejemplar duplicado (rregla de negocio)
  it('rechaza un ejemplar que ya esta prestado', async () => {
    // arrange: servicio limpio + un prestamo ya existente sobre el ejemplar 5
    const servicio = crearServicio();
    await servicio.crear({
      libroId: 'LIB-0002',
      socioId: 'S-200',
      ejemplares: [5],
    });

    // act + assert: 'assert.rejects' espera que la promesa
    // que le pasamossea error, y ademas revisa que el error sea
    // una instancia de EjemplarPrestadoError. si 'crear' no lanza error, esta prueba falla.
    await assert.rejects(
      () =>
        servicio.crear({
          libroId: 'LIB-0002',
          socioId: 'S-201',
          ejemplares: [5, 6], // el 5 ya esta prestado
        }),
      EjemplarPrestadoError,
    );
  });
});
