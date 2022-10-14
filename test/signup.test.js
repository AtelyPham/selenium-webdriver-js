const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const { assert } = require('chai')

describe('Test the search functionality', () => {
  it('Error when not valid email', async () => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()

    try {
      await driver.get('https://demo-kt.trungtinpham.com/')

      const avatarPath =
        '//*[@id="__next"]/div/div[1]/div/div[1]/div[3]/nav/ul/li[2]/button'
      const avatarXPath = By.xpath(avatarPath)
      await driver.wait(until.elementLocated(avatarXPath))
      const avaBtn = await driver.findElement(avatarXPath)
      await avaBtn.click()

      const signupLinkPath =
        '//*[@id="__next"]/div/div[2]/div/div/form/div[2]/div/a'
      const signupLinkXPath = By.xpath(signupLinkPath)
      await driver.wait(until.elementLocated(signupLinkXPath))
      const signupLink = await driver.findElement(signupLinkXPath)
      await signupLink.click()

      const signupBtnPath =
        '//*[@id="__next"]/div/div[2]/div/div/form/div[2]/div/button'
      const signupBtnXPath = By.xpath(signupBtnPath)
      await driver.wait(until.elementLocated(signupBtnXPath))
      const signupBtn = await driver.findElement(signupBtnXPath)
      await signupBtn.click()

      const signupErrorPath =
        '//*[@id="__next"]/div/div[2]/div/div/form/div[2]/div[1]'
      const signupErrorXPath = By.xpath(signupErrorPath)
      await driver.wait(until.elementLocated(signupErrorXPath))

      const errorText = await driver.findElement(signupErrorXPath).getText()
      const expectedErrorText =
        'A first name, last name, email and password are required to signup'

      assert.strictEqual(errorText, expectedErrorText)
    } finally {
      await driver.quit()
    }
  })
})
