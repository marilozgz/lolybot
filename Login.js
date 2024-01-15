const { Page } = require("playwright")
const fs = require("fs")

const config = JSON.parse(fs.readFileSync("config.json", "utf8"))

class Login {
  async login(page) {
    try {
      const url = "https://rewards.bing.com/signin"
      const emailSelector = "#i0116"
      const passwordSelector = "#i0118"
      const submitButtonSelector = "#idSIButton9"

      await page.goto(url)
      await page.waitForSelector(emailSelector)
      await page.type(emailSelector, config.email)
      await page.click(submitButtonSelector)
      await page.waitForSelector(passwordSelector)
      await page.type(passwordSelector, config.password)
      await page.click(submitButtonSelector)
      await page.waitForTimeout(1000)
      await page.click(submitButtonSelector)
      this.log("Logged in successfully")
    } catch (error) {
      this.log("An error occurred: " + error)
      throw error
    }
  }

  log(message) {
    console.log(message)
  }
}

module.exports = Login
