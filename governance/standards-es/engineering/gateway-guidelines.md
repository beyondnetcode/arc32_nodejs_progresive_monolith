# ðŸ›¡ï¸ GuÃ­a de ConfiguraciÃ³n de Plugins de Kong (Modo DB-less)

Para integrar **Kong Open Source** delante de tu **BFF de NestJS (Tier 2)**, la mejor prÃ¡ctica moderna es usar el **modo DB-less**. En lugar de almacenar la configuraciÃ³n en PostgreSQL, defines todas las rutas y plugins en un archivo YAML (`kong.yml`) que vive en tu repositorio. Esto se alinea perfectamente con la filosofÃ­a **GitOps**.

A continuaciÃ³n se detalla cÃ³mo estructurar este archivo para implementar LimitaciÃ³n de Tasa (Rate Limiting), ValidaciÃ³n JWT y Enrutamiento hacia tu BFF de NestJS.

---

## 1. Esqueleto Principal (`kong.yml`)

Este esqueleto principal define los servicios (tu backend de NestJS), las rutas (URLs expuestas) y los plugins (reglas de infraestructura).

```yaml
_format_version: "3.0"
_transform: true

services:
  - name: nestjs-bff-service
    url: http://nestjs-bff:3000  # La URL interna de tu contenedor Docker de NestJS
    routes:
      - name: public-api-route
        paths:
          - /api/v1
        strip_path: false # Mantiene /api/v1 al reenviar a NestJS

    # 2. PLUGINS APLICADOS A NIVEL DE SERVICIO
    plugins:
      # A) Rate Limiting: Protege NestJS de cargas excesivas
      - name: rate-limiting
        config:
          second: 10     # MÃ¡ximo 10 peticiones por segundo
          hour: 10000    # MÃ¡ximo 10k por hora
          policy: local   # Almacena los contadores en la memoria de Kong
          fault_tolerant: true
          hide_client_headers: false

      # B) ValidaciÃ³n JWT: Bloquea el trÃ¡fico no autenticado en el Tier 1
      - name: jwt
        config:
          claims_to_verify:
            - exp # Verifica que el token no haya expirado
          run_on_preflight: false # No requiere token para peticiones OPTIONS (CORS)
          uri_param_names:
            - jwt

      # C) CORS: Resuelve Preflights sin tocar el backend
      - name: cors
        config:
          origins:
            - "*" # Reemplazar con lista blanca como https://myapp.com
          methods:
            - GET
            - POST
            - PATCH
            - DELETE
            - OPTIONS
          headers:
            - Accept
            - Authorization
            - Content-Type
          exposed_headers:
            - X-Request-Id
          credentials: true
          max_age: 3600

# 4. CONSUMERS Y CREDENCIALES (Para validar JWTs)
# Kong necesita conocer secretos vÃ¡lidos para verificar firmas de tokens.
consumers:
  - username: app-frontend-consumer
    jwt_secrets:
      - key: "myapp-issuer"         # Coincide con el claim 'iss' dentro del JWT
        secret: "my-super-secret-key" # El mismo secreto compartido con NestJS
```

---

## 2. Flujo de Datos ArquitectÃ³nico

1. **El cliente realiza la peticiÃ³n:** `GET /api/v1/orders` con la cabecera `Authorization: Bearer <token>`.
2. **Kong intercepta (Tier 1):**
    * **Rate Limiting:** Verifica que la IP del cliente no haya excedido el lÃ­mite. Devuelve `429 Too Many Requests` inmediatamente si se viola. *NestJS nunca se entera.*
    * **CORS:** Resuelve las preflights `OPTIONS` automÃ¡ticamente.
    * **JWT:** Decodifica el token, valida la firma contra el secreto y verifica `exp`. Devuelve `401 Unauthorized` si es invÃ¡lido. *NestJS nunca se entera.*
3. **ReenvÃ­o al BFF (Tier 2):** Si las comprobaciones pasan, Kong reenvÃ­a la peticiÃ³n HTTP intacta a `http://nestjs-bff:3000/api/v1/orders`.
4. **NestJS actÃºa:** Recibe trÃ¡fico pre-validado. Solo lee la carga Ãºtil del JWT para identificar al usuario y procede con los flujos de trabajo de negocio.

---

## 3. Avanzado: Inyectando InformaciÃ³n de Usuario a NestJS

Por defecto, cuando Kong valida un JWT, puede inyectar cabeceras adicionales. Puedes configurar Kong para pasar claims en cabeceras especÃ­ficas:

```yaml
      - name: jwt
        config:
          claims_to_verify:
            - exp
          header_names:
            - X-Authenticated-Userid # Mapea un claim personalizado si se especifica
```

En tu cÃ³digo de **NestJS**, en lugar de re-validar la criptografÃ­a (desperdiciando CPU), simplemente confÃ­as en Kong y lees las cabeceras en tu AuthGuard:

```typescript
@Injectable()
export class KongAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Kong garantizÃ³ la legitimidad del token. Solo leemos los claims inyectados.
    const userId = request.headers['x-consumer-username']; 
    
    if (!userId) throw new UnauthorizedException();
    
    request.user = { id: userId };
    return true;
  }
}
```

## 4. Beneficios de esta Estrategia

* **ProtecciÃ³n a Costo Cero:** Los ataques o tokens expirados se descartan a nivel del proxy, preservando los hilos del bucle de eventos de NestJS Node.js para usuarios vÃ¡lidos reales.
* **Seguridad de Infraestructura:** Si aÃ±ades otro servicio de backend (ej. Go o Python), Kong los protege de forma idÃ©ntica sin duplicar la lÃ³gica de autenticaciÃ³n.

---
[? Volver al Índice](./README.es.md)
