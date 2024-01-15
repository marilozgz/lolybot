const playwright = require("playwright")

async function realizarBusquedas(page) {
  const terminosMatematicos = [
    "Número",
    "Álgebra",
    "Geometría",
    "Cálculo",
    "Estadística",
    "Probabilidad",
    "Ecuación",
    "Función",
    "Variable",
    "Derivada",
    "Integral",
    "Triángulo",
    "Rectángulo",
    "Circunferencia",
    "Teorema",
    "Congruencia",
    "Fracción",
    "Número primo",
    "Polinomio",
    "Raíz cuadrada",
    "Logaritmo",
    "Vector",
    "Matriz",
    "Conjunto",
    "Teorema de Pitágoras",
    "Teorema de Fermat",
    "Teorema de Euler",
    "Teorema de Taylor",
    "Teorema de Bayes",
    "Teorema de Gauss"
  ]
  const peliculasAccion = [
    "Die Hard",
    "Mad Max: Fury Road",
    "The Dark Knight",
    "Gladiator",
    "John Wick",
    "The Matrix",
    "Inception",
    "Lethal Weapon",
    "Die Hard 2",
    "Kill Bill: Vol. 1",
    "Kill Bill: Vol. 2",
    "The Bourne Identity",
    "The Bourne Supremacy",
    "The Bourne Ultimatum",
    "The Bourne Legacy",
    "Rambo: First Blood",
    "Rambo: First Blood Part II",
    "Rambo III",
    "Rambo",
    "The Terminator",
    "Terminator 2: Judgment Day",
    "Terminator 3: Rise of the Machines",
    "Terminator Salvation",
    "Terminator Genisys",
    "Terminator: Dark Fate",
    "Predator",
    "Aliens",
    "Total Recall",
    "RoboCop",
    "Die Hard: With a Vengeance"
  ]
  const actoresClasicosHollywood = [
    "Humphrey Bogart",
    "Audrey Hepburn",
    "Cary Grant",
    "Ingrid Bergman",
    "Clark Gable",
    "Bette Davis",
    "James Stewart",
    "Katharine Hepburn",
    "Marlon Brando",
    "Elizabeth Taylor",
    "Gary Cooper",
    "Vivien Leigh",
    "Spencer Tracy",
    "Lauren Bacall",
    "John Wayne",
    "Greta Garbo",
    "Marilyn Monroe",
    "Gregory Peck",
    "Grace Kelly",
    "Jimmy Cagney",
    "Joan Crawford",
    "Charlie Chaplin",
    "Rita Hayworth",
    "Robert Mitchum",
    "Gene Kelly"
  ]
  const terminosMasBuscadosEspana = [
    "Tiempo",
    "Noticias",
    "Facebook",
    "YouTube",
    "Instagram",
    "WhatsApp",
    "El tiempo",
    "Correo electrónico",
    "Mapa",
    "Fútbol",
    "Real Madrid",
    "Barcelona",
    "Lotería",
    "Netflix",
    "Bankia",
    "Economía",
    "Cine",
    "Series",
    "Música",
    "Descargar música",
    "Juegos",
    "Recetas",
    "Restaurantes",
    "Viajes",
    "Comida a domicilio",
    "Comprar online",
    "Amazon",
    "Zara",
    "Ikea",
    "Fnac",
    "Hoteles",
    "Ofertas",
    "Coche",
    "Bicicleta",
    "Salud",
    "Covid-19",
    "Vacuna",
    "Educación",
    "Universidad",
    "Empleo"
  ]
  const temasDeEnfermedades = [
    "Síntomas de la gripe",
    "Tratamiento de la diabetes",
    "Prevención del cáncer",
    "Síntomas de la COVID-19",
    "Dieta saludable",
    "Enfermedades cardíacas",
    "Dolor de cabeza",
    "Remedios caseros para el resfriado",
    "Cómo dejar de fumar",
    "Prevención de enfermedades infecciosas",
    "Síntomas de la alergia",
    "Tratamiento de la hipertensión",
    "Cómo reducir el estrés",
    "Alimentación balanceada",
    "Ejercicios para perder peso",
    "Prevención de enfermedades transmitidas por vectores",
    "Dolor de espalda",
    "Síntomas de la ansiedad",
    "Tratamiento del insomnio",
    "Prevención de enfermedades de transmisión sexual",
    "Síntomas del asma",
    "Dieta para el control del colesterol",
    "Cómo prevenir el envejecimiento prematuro",
    "Síntomas de la depresión",
    "Tratamiento de la artritis",
    "Prevención de enfermedades del corazón",
    "Síntomas del Parkinson",
    "Cómo mejorar la salud mental",
    "Síntomas de la migraña",
    "Tratamiento de la osteoporosis",
    "Prevención de accidentes cerebrovasculares",
    "Síntomas del Alzheimer",
    "Cómo mantener un sistema inmunológico saludable",
    "Síntomas de la esclerosis múltiple",
    "Tratamiento del VIH/SIDA",
    "Prevención de enfermedades respiratorias",
    "Síntomas del cáncer de mama",
    "Tratamiento de la obesidad",
    "Prevención de la diabetes tipo 2"
  ]
  const terminosAleatorios = getRandomTerms(
    terminosMasBuscadosEspana.concat(
      actoresClasicosHollywood,
      temasDeEnfermedades,
      terminosMatematicos,
      peliculasAccion
    ),
    30
  )
  function getRandomTerms(termsArray, count) {
    const shuffled = termsArray.slice().sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  const totalBusquedas = 40
  const busquedasPorGrupo = 4
  const esperaEntreBusquedas = 180000 // 3 minutos en milisegundos
  const esperaEntreGrupos = 900000 //15 minutos en milisegundos

  for (let busqueda = 1; busqueda <= totalBusquedas; busqueda++) {
    if ((busqueda - 1) % busquedasPorGrupo === 0 && busqueda !== 1) {
      console.log(
        "Esperando 15 minutos antes de la siguiente serie de búsquedas..."
      )
      await page.waitForTimeout(esperaEntreGrupos)
    } else if (busqueda !== 1) {
      console.log(
        `Esperando 3 minutos antes de la siguiente búsqueda (${busqueda} de ${totalBusquedas})...`
      )
      await page.waitForTimeout(esperaEntreBusquedas)
    }

    const termino = terminosAleatorios[busqueda - 1]
    console.log(`Realizando búsqueda para: ${termino}`)

    await page.goto("https://www.bing.com")

    const searchBar = "#sb_form_q"
    await page.waitForSelector(searchBar, {
      state: "attached",
      timeout: 10_000
    })
    await page.click(searchBar)
    await page.waitForTimeout(2000)
    await page.keyboard.down("Control")
    await page.keyboard.press("A")
    await page.keyboard.press("Backspace")
    await page.keyboard.up("Control")
    await page.keyboard.type(termino)
    await page.keyboard.press("Enter")
    try {
      await page.waitForSelector("#bnp_btn_accept", { timeout: 10000 })
      const cookieBanner = await page.$("#bnp_btn_accept")

      if (cookieBanner) {
        await cookieBanner.click()
      }
    } catch {
      console.log(
        "No se encontró o no se puede interactuar con el banner de cookies."
      )
    }

    for (let i = 0; i < Math.random(500, 20000); i++) {
      await page.keyboard.press("ArrowDown")
    }
  }
}

module.exports = realizarBusquedas
