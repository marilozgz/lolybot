const playwright = require("playwright")
const Login = require("./Login")
const realizarBusquedas = require("./searchBing")

;(async () => {
  const browser = await playwright.chromium.launch({ headless: false })
  const page = await browser.newPage()
  const login = new Login()

  try {
    await login.login(page)
    await realizarBusquedas(page)
  } catch (error) {
    console.error("Error during login:", error)
  } finally {
    await page.waitForTimeout(5000)
  }
})()
