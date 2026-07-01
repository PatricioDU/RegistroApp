# RegistroApp

Aplicación móvil para el registro de asistencia estudiantil mediante escaneo de códigos QR.

## Descripción

RegistroApp es una aplicación híbrida orientada a facilitar el control de asistencia en el ámbito educativo. Los estudiantes pueden iniciar sesión con sus credenciales, consultar sus clases asignadas, escanear un código QR para registrar su ingreso y revisar su información personal desde la misma app.

La aplicación funciona tanto en el navegador web como instalada en dispositivos Android, gracias al uso de Capacitor como puente nativo. Los datos se almacenan de forma local mediante SQLite, lo que permite operar sin conexión continua a internet. Además incorpora geolocalización como validación adicional de presencia durante el registro de asistencia.

## Tecnologías

- Angular 18
- Ionic 8
- Capacitor
- TypeScript
- SQLite (via @capacitor-community/sqlite)
- html5-qrcode / jsqr (escaneo de QR y códigos de barras)
- Leaflet (mapas)
- Angular Material 18
- JSON Server (mock API para desarrollo local)

## Uso

### Requisitos previos

- Node.js 18 o superior
- npm
- Ionic CLI instalado globalmente:

```bash
npm install -g @ionic/cli
```

- Angular CLI instalado globalmente:

```bash
npm install -g @angular/cli
```

### Instalación

```bash
git clone https://github.com/PatricioDU/RegistroApp.git
cd RegistroApp
npm install
```

### Ejecución en el navegador

```bash
npm start
```

La aplicación queda disponible en `http://localhost:4200`.

### API de desarrollo (JSON Server)

El proyecto incluye una carpeta `_JSON-SERVER/` con datos de prueba. Para levantar el servidor simulado en paralelo:

```bash
npx json-server --watch _JSON-SERVER/db.json
```

### Compilar y ejecutar en Android

Asegúrate de tener Android Studio instalado y configurado antes de continuar.

```bash
npm run build
npx cap sync android
npx cap open android
```

Desde Android Studio puedes ejecutar la app en un emulador o en un dispositivo físico conectado.
