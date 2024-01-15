const playwright = require("playwright")
const { newInjectedContext } = require("fingerprint-injector")

const Login = require("./Login")
const realizarBusquedas = require("./searchBing")
const fingerprintOptions = require("./fingerPrint")

;(async () => {
  const browser = await playwright.chromium.launch({ headless: false })
  const context = await newInjectedContext(browser, {
    fingerprintOptions: fingerprintOptions,
    newContextOptions: {
      geolocation: {
        //coordendas sevilla
        latitude: 37.3886,
        longitude: -5.9823
      }
    }
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
