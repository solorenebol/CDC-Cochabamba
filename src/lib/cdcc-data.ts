// Static data shared by mesas index and detail
export const MESAS = [
  {
    slug: "derechos-culturales",
    num: "01",
    titulo: "Derechos Culturales, Democracia Intercultural y Género",
    corto: "Derechos Culturales",
    descripcion:
      "Garantía del ejercicio pleno de los derechos culturales, con enfoque de género, interseccionalidad e interculturalidad activa entre lo urbano, valluno y originario.",
    proximaSesion: "25 de Octubre — 16:00",
    lugar: "Casa de la Cultura, Cercado",
    ejes: [
      "Marco de derechos culturales bolivianos",
      "Equidad de género en el sector",
      "Democracia intercultural en la gestión",
      "Protocolos contra la violencia sectorial",
    ],
  },
  {
    slug: "patrimonios",
    num: "02",
    titulo: "Patrimonios Culturales, Culturas Vivas y Transmisión de Saberes",
    corto: "Patrimonios y Culturas Vivas",
    descripcion:
      "Salvaguarda del patrimonio material e inmaterial, culturas vivas comunitarias, memoria colectiva y transmisión intergeneracional de saberes ancestrales.",
    proximaSesion: "27 de Octubre — 15:30",
    lugar: "Museo Arqueológico UMSS",
    ejes: [
      "Registro del patrimonio inmaterial",
      "Culturas vivas y portadores de saber",
      "Rutas patrimoniales provinciales",
      "Digitalización de archivos comunitarios",
    ],
  },
  {
    slug: "industrias-creativas",
    num: "03",
    titulo: "Fomento de la Diversidad, Industrias Creativas y Fondos Concursables",
    corto: "Industrias Creativas",
    descripcion:
      "Sostenibilidad económica del ecosistema: fondos concursables, incentivos a la producción cultural, festivales y circulación artística en el departamento.",
    proximaSesion: "30 de Octubre — 09:00",
    lugar: "FAM Cochabamba",
    ejes: [
      "Diseño de fondos concursables",
      "Circulación artística departamental",
      "Feria de industrias culturales",
      "Economía naranja y trabajo digno",
    ],
  },
  {
    slug: "formacion-tecnologia",
    num: "04",
    titulo: "Formación Artística, Soberanía Tecnológica y Alfabetización Digital",
    corto: "Formación y Tecnología",
    descripcion:
      "Fortalecimiento de la formación artística pública, uso ético de IA en el arte, derechos de autor en entornos digitales y alfabetización tecnológica sectorial.",
    proximaSesion: "02 de Noviembre — 17:00",
    lugar: "Universidad Mayor de San Simón",
    ejes: [
      "Currículo público de formación artística",
      "IA, derechos de autor y monetización digital",
      "Soberanía tecnológica y software libre",
      "Alfabetización digital para gestores",
    ],
  },
  {
    slug: "gobernanza",
    num: "05",
    titulo: "Gobernanza, Descentralización Territorial y Articulación con Gobiernos",
    corto: "Gobernanza Territorial",
    descripcion:
      "Cogobernanza cultural multinivel con municipios, gobernación y autonomías indígena originario campesinas. Descentralización real de recursos y decisiones.",
    proximaSesion: "05 de Noviembre — 14:00",
    lugar: "Salón Rojo — Gobernación",
    ejes: [
      "Articulación con las 16 provincias",
      "Reglamentos competenciales (Ley 031)",
      "Convenios interinstitucionales",
      "Presupuesto cultural descentralizado",
    ],
  },
] as const;

export type Mesa = (typeof MESAS)[number];

export const PROVINCIAS = [
  { nombre: "Cercado", region: "Valle Central" },
  { nombre: "Quillacollo", region: "Valle Bajo" },
  { nombre: "Punata", region: "Valle Alto" },
  { nombre: "Chapare", region: "Trópico" },
  { nombre: "Arani", region: "Valle Alto" },
  { nombre: "Arque", region: "Andina" },
  { nombre: "Ayopaya", region: "Andina" },
  { nombre: "Bolívar", region: "Andina" },
  { nombre: "Campero", region: "Cono Sur" },
  { nombre: "Capinota", region: "Valle Bajo" },
  { nombre: "Carrasco", region: "Trópico" },
  { nombre: "Esteban Arce", region: "Valle Alto" },
  { nombre: "Germán Jordán", region: "Valle Alto" },
  { nombre: "Mizque", region: "Cono Sur" },
  { nombre: "Tapacarí", region: "Andina" },
  { nombre: "Tiraque", region: "Trópico" },
] as const;

export const DISCIPLINAS = [
  "Artes Visuales",
  "Música",
  "Artes Escénicas",
  "Literatura",
  "Audiovisual y Cine",
  "Saberes Ancestrales",
  "Artesanía",
  "Danza",
  "Cultura Digital",
  "Gestión Cultural",
] as const;

export const AGENDA = [
  { fecha: "14 OCT", cat: "Artes Escénicas", titulo: "Festival de Teatro de las Naciones", lugar: "Teatro Achá, 19:00" },
  { fecha: "18 OCT", cat: "Música", titulo: "Encuentro de Sikuris Urbanos", lugar: "Casona Santiváñez, 10:00" },
  { fecha: "22 OCT", cat: "Artes Visuales", titulo: "Retrospectiva Muralismo Cochala", lugar: "Museo de la Ciudad, 15:00" },
  { fecha: "01 NOV", cat: "Saberes Ancestrales", titulo: "Todos Santos: Ofrenda y Tejido", lugar: "Plaza 14 de Septiembre" },
  { fecha: "07 NOV", cat: "Danza", titulo: "Muestra de Danzas Vallunas", lugar: "Coliseo Municipal, Punata" },
  { fecha: "15 NOV", cat: "Literatura", titulo: "Feria Editorial Plurilingüe", lugar: "Paseo El Prado" },
] as const;

export const RUTA_MANDATO = [
  { mes: "Ene 2026", hito: "Jornadas Culturales Plurinacionales", estado: "hecho" },
  { mes: "Mar 2026", hito: "Instalación de las 5 Mesas de Trabajo", estado: "hecho" },
  { mes: "Jul 2026", hito: "Cierre del primer censo RPA departamental", estado: "actual" },
  { mes: "Oct 2026", hito: "Foro Departamental de Culturas Vivas", estado: "futuro" },
  { mes: "Dic 2026", hito: "Publicación de la Política Cultural Departamental", estado: "futuro" },
] as const;
