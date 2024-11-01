import { showAlert, showAlertError } from "../tools/message-functions";

export class Clase {

  static jsonDinoExample =
    `{    "sede": "Alonso Ovalle",
         "idAsignatura": "PGY4121",
         "seccion": "001D",
         "nombreAsignatura": "Aplicaciones Móviles",
         "nombreProfesor": "Cristián Gómez Vega",
         "dia": "2022-08-09",
         "bloqueInicio": 7,
         "horaFin": "15:15" 
         "bloqueTermino": 9,
         "horaInicio": "13:00",
    }`;

    static jsonDinoEmpty =
    `{
      "sede": "",
      "idAsignatura": "",
      "seccion": "",
      "nombreAsignatura": "",
      "nombreProfesor": "",
      "dia": "",
      "bloqueInicio": "",
      "horaFin": "",
      "bloqueTermino": "",
      "horaInicio": "",
    }`;

    sede = '';
    idAsignatura = '';
    seccion = '';
    nombreAsignatura = '';
    nombreProfesor = '';
    dia = '';
    bloqueInicio = '';
    horaFin = '';
    bloqueTermino = '';
    horaInicio = '';

    constructor() { }

    public static getnewClase(
      sede: string,
      idAsignatura: string,
      seccion: string,
      nombreAsignatura: string,
      nombreProfesor: string,
      dia: string,
      bloqueInicio: string,
      horaFin: string,
      bloqueTermino: string,
      horaInicio: string
    ) {
      const clase = new Clase();
      clase.sede = sede;
      clase.idAsignatura = idAsignatura;
      clase.seccion = seccion;
      clase.nombreAsignatura = nombreAsignatura;
      clase.nombreProfesor = nombreProfesor;
      clase.dia = dia;
      clase.bloqueInicio = bloqueInicio;
      clase.horaFin = horaFin;
      clase.bloqueTermino = bloqueTermino;
      clase.horaInicio = horaInicio;
      return clase;
    }

    static isValidclaseQrCode(qr: string) {
    
      if (qr === '') return false;
  
      try {
        const json = JSON.parse(qr);
  
        if ( json.sede       !== undefined
          && json.idAsignatura     !== undefined
          && json.seccion     !== undefined
          && json.nombreAsignatura     !== undefined
          && json.nombreProfesor       !== undefined
          && json.dia     !== undefined
          && json.bloqueInicio !== undefined
          && json.horaFin      !== undefined
          && json.bloqueTermino      !== undefined
          && json.horaInicio      !== undefined)
        {
          return true;
        }
      } catch(error) { }
  
      showAlert('El código QR escaneado no corresponde a un dinosaurio');
      return false;
    }
}  
