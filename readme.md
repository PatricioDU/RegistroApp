# RegistroAppDino

Aplicación móvil de registro de asistencia estudiantil con escaneo QR, mapa de ruta a la sede, foro de publicaciones y soporte multiidioma.

## Descripción

RegistroAppDino es una aplicación híbrida desarrollada para gestionar la asistencia en clases dentro del contexto educativo de DUOC UC. El estudiante puede crear su cuenta, iniciar sesión y registrar su asistencia escaneando un código QR que entrega el docente al inicio de cada sesión, recibiendo confirmación inmediata de si el ingreso fue correcto o no.

Además del flujo de asistencia, la app incluye un mapa interactivo que muestra la ubicación actual del usuario y traza una ruta hasta la sede, un foro con publicaciones institucionales consumido desde una API simulada, y un selector de idioma que soporta español, inglés y mapudungun. Los datos del usuario se persisten localmente mediante SQLite, lo que permite operar sin conexión continua a internet.

## Tecnologías

- Angular 18
- Ionic 8
- Capacitor
- TypeScript
- SQLite (via @capacitor-community/sqlite)
- html5-qrcode / jsqr (escaneo de QR)
- Leaflet + OpenStreetMap (mapa interactivo)
- @ngx-translate (soporte multiidioma: ES, EN, ARN)
- Angular Material 18
- JSON Server (API simulada para foro y usuarios)

## Uso

### Requisitos previos

- Node.js 18 o superior
- npm
- Android Studio (para ejecutar en dispositivo o emulador Android)
- Ionic CLI:

```bash
npm install -g @ionic/cli
```

- Angular CLI:

```bash
npm install -g @angular/cli
```

### Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/PatricioDU/RegistroAppDino.git
cd RegistroAppDino
npm install
```

### Ejecución en el navegador

Para probar la app rápidamente sin necesidad de un dispositivo móvil:

```bash
npm start
```

La aplicación queda disponible en `http://localhost:4200`. Ten en cuenta que algunas funcionalidades como el escaneo de QR con cámara o la geolocalización tienen limitaciones en el navegador y funcionan mejor en un dispositivo real.

### API simulada (JSON Server)

El foro y los datos de usuarios se sirven desde un JSON Server local. Ábrelo en una terminal aparte antes de usar esas secciones de la app:

```bash
npx json-server --watch _JSON-SERVER/dbposts.json
```

### Ejecutar en Android

#### 1. Activar modo desarrollador en el celular

Ve a **Ajustes > Sistema > Acerca del teléfono** y toca el campo **Número de compilación** siete veces seguidas hasta que aparezca el mensaje de confirmación. Luego entra a **Opciones de desarrollador** (que ahora aparece en Ajustes) y activa **Depuración USB**.

Conecta el celular al computador con un cable de datos (no de carga) y confirma la solicitud de autorización que aparece en la pantalla del celular.

#### 2. Verificar que el dispositivo es reconocido

```bash
adb devices
```

Deberías ver el ID de tu dispositivo en la lista. Si aparece como `unauthorized`, desconecta y vuelve a conectar el cable aceptando el permiso en el celular.

#### 3. Configurar Gradle

Abre el archivo `android/gradle/wrapper/gradle-wrapper.properties` y asegúrate de que la versión de Gradle sea la 8.9:

```
distributionUrl=https\://services.gradle.org/distributions/gradle-8.9-all.zip
```

Esto evita el error `Running Gradle build - failed!` que suele aparecer si la versión no coincide con la instalada en Android Studio.

#### 4. Compilar y sincronizar

```bash
ionic build
npx cap sync android
```

#### 5. Ejecutar en el dispositivo

Con live reload para ver los cambios en tiempo real (reemplaza la IP por la de tu computador y el target por el ID de tu celular):

```bash
ionic cap run android -l --external --host=192.168.x.x --port=8100 --target TU_DEVICE_ID
```

O sin live reload, donde la app te pregunta en qué dispositivo o emulador quieres instalarla:

```bash
ionic cap run android
```

#### 6. Depurar desde el navegador

Con la app corriendo en el celular, abre Chrome en el computador y entra a:

```
chrome://inspect/#devices
```

Allí aparecerá tu dispositivo y podrás inspeccionar la app como si fuera una página web.

## Flujo de uso

Cuando el estudiante abre la app por primera vez, accede a la pantalla de ingreso donde puede iniciar sesión o crear una cuenta nueva. El registro solicita datos personales como nombre, apellido, nivel educacional, fecha de nacimiento, dirección y una pregunta secreta para la recuperación de contraseña.

Una vez dentro, el estudiante ve sus clases asignadas y puede escanear el código QR que entrega el docente al inicio de cada sesión. La app valida el código y muestra una pantalla de confirmación indicando si el registro fue exitoso o si hubo algún problema.

Desde el menú también puede consultar el mapa, que detecta su ubicación actual y traza la ruta hasta la sede de DUOC UC. Si olvidó su contraseña, puede recuperarla ingresando su correo y respondiendo la pregunta secreta que configuró al registrarse.
