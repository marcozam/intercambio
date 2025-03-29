// Importa el tipo de sangre
// Checklist de lo que ya se realizo
// Notificacion de proxima cita

export const Estudios: any = {
  glucosa: {
    descripcion: 'Glucosa en ayuno'
  },
  grupoSanguineo: {
    descripcion: 'Grupo sanguíneo y Factor Rh',
    nota: 'En pacientes Rh(-) solicitar Coombs indirecto y Anticuerpos Irregulares par ción Biometría hemática (BH) completa',
  },
  EGO: {
    descripcion: 'Examen General de Orina (EGO)',
  },
  urocultivo: {
    descripcion: 'Urocultivo',
  },
  VDRL: {
    descripcion: 'VDRL (de contar con el recurso y/o referencia a segundo nivel)',
  },
  VIH: {
    descripcion: 'Detección de VIH y Hepatitis B (de contar con el recurso y/o referencia a segundo nivel) Creatinina',
  },
  acidoUrico: {
    descripcion: 'Ácido Úrico',
  },
  citologia: {
    descripcion: 'Citología cervicovaginal (vigencia menor de un año)',
  },
  BH: {
    descripcion: 'Biometría hemática',
  },
  TC: {
    descripcion: 'Tiempos decoagulación',
  },
};

export const Consultas = [
  {
    descripcion: '1er Consulta',
    inicio: 0,
    fin: 8,
    estudios: [
      Estudios.glucosa,
      Estudios.grupoSanguineo,
      Estudios.EGO,
      Estudios.urocultivo,
      Estudios.VDRL,
      Estudios.VIH,
      Estudios.acidoUrico,
      Estudios.citologia,
    ],
  },
  {
    descripcion: '2da Consulta',
    inicio: 9,
    fin: 16
  },
  {
    descripcion: '3er Consulta',
    inicio: 17,
    fin: 21,
    estudios: [
      Estudios.BH,
      Estudios.EGO,
      Estudios.urocultivo,
    ],
  },
  {
    descripcion: '4ta Consulta',
    inicio: 22,
    fin: 27
  },
  {
    descripcion: '5ta Consulta',
    inicio: 28,
    fin: 31
  },
  {
    descripcion: '6ta Consulta',
    inicio: 32,
    fin: 35,
    estudios: [
      Estudios.BH,
      Estudios.TC,
    ],
  },
  {
    descripcion: '7ma Consulta',
    inicio: 36,
    fin: 36
  },
  {
    descripcion: '8va Consulta',
    inicio: 37,
    fin: 41
  },
];