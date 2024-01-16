const playwright = require("playwright")
const { newInjectedContext } = require("fingerprint-injector")

const Login = require("./Login")
const realizarBusquedas = require("./searchBing")
const generateFingerprint = require("./fingerPrint")
const config = require("./config.json") // Asegúrate de tener esta línea si config.json no está ya importado

;(async () => {
  const browser = await playwright.chromium.launch({ headless: false })

  const fingerprintOptions = generateFingerprint()
  console.log(fingerprintOptions)

  let contextOptions = {
    fingerprintOptions: fingerprintOptions,
    geolocation: {
      // Coordenadas de Sevilla
      latitude: 37.3886,
      longitude: -5.9823
    }
  }

  if (config.isMobile) {
    const mobileViewport = { width: 375, height: 667 } // Ejemplo de dimensiones para iPhone 6/7/8
    contextOptions = {
      ...contextOptions,
      viewport: mobileViewport
    }
  }

  const context = await newInjectedContext(browser, {
    fingerprintOptions: contextOptions,
    newContextOptions: contextOptions
  })

  const page = await context.newPage()
  const login = new Login()

  try {
    await login.login(page)
    await realizarBusquedas(page)
  } catch (error) {
    console.error("Error durante login:", error)
  } finally {
    await page.waitForTimeout(5000)
    await page.close()
    await context.close()
    await browser.close()
  }
})()
