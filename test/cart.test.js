const { Builder, Browser, By, until } = require('selenium-webdriver')
const { assert } = require('chai')

describe('Test the cart functionality', () => {
  it('Empty state', async () => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()

    try {
      await driver.get('https://demo-kt.trungtinpham.com/')

      await driver.wait(
        until.elementLocated(
          By.xpath(
            '//*[@id="__next"]/div/div[1]/div/div[1]/div[3]/nav/ul/li[1]/button'
          )
        )
      )

      const cartButton = driver.findElement(
        By.xpath(
          '//*[@id="__next"]/div/div[1]/div/div[1]/div[3]/nav/ul/li[1]/button'
        )
      )

      // Click the card butotn
      await cartButton.click()

      // Wait until the text rendered
      await driver.wait(
        until.elementLocated(
          By.xpath(
            '//*[@id="__next"]/div/div[2]/div/section/div/div/div/div/div/h2'
          )
        )
      )

      const expectedText = 'Your cart is empty'
      // Get actual rendered text and compare with the expected text
      const actualText = await driver
        .findElement(
          By.xpath(
            '//*[@id="__next"]/div/div[2]/div/section/div/div/div/div/div/h2'
          )
        )
        .getText()

      assert.strictEqual(actualText, expectedText)
    } finally {
      await driver.quit()
    }
  })
})
