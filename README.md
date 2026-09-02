# Práctica 3 — La capa de dominio con genéricos y patrones

Tópico Frontend Web: Temas Emergentes - Alejandra García Preciado 00000252444 - 02 septiembre 2026

Sistema de préstamos de biblioteca construido aplicando los patrones **DTO**, **Repository** y **Service**, con una interfaz genérica (`Repository<T, ID>`) reutilizable para cualquier entidad.

## Preguntas de reflexión
**1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?**

No, porque el Service habla con la interfaz y nunca con la base de datos. El patrón Repository sirve para que la lógica de negocio se pueda probar sin la necesidad de una base de datos. El Service depende de la interfaz.

**2. El Service recibe el repositorio como `Repository<Prestamo>`, no `InMemoryPrestamoRepository`. ¿Qué se rompía si usaban la clase concreta?**

Causa acoplamiento porque si recibiera `InMemoryPrestamoRepository` estaría "obligada" a usar su implementación real y por otro lado, no podríamos cambiar de infraestructura ni probar el Service. PrestamoService acepta cualquier cosa que cumpla con la interfaz PrestamoRepository.

**3. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?**

Se modifica un archivo yse crea uno nuevo muy parecido al de in-memory-prestamo.repository.ts pero ahora sí con una base de datos e implementando la misma interfaz PrestamoRepository. El segundo archivo sería el de main solo para cambiar la instancia.
Sobre por qué tan pocos: gracias a este patrón, el dominio está separado y no depende de detalles de infraestructura, solo de la interfaz.
