const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const { assert } = require('chai')

describe('Test the search functionality', () => {
  it('Empty state', async () => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()

    try {
      await driver.get('https://demo-kt.trungtinpham.com/')
      await driver.findElement(By.id('search')).sendKeys('abc', Key.RETURN)
      await driver.wait(until.urlContains('search?q=abc'), 1500)

      await driver.wait(
        until.elementLocated(
          By.xpath('//div[@id="__next"]/div/main/div/div/div[2]/div[1]/span[2]')
        )
      )

      const expectedText = 'There are no products that match "abc"'

      const actualText = await driver
        .findElement(
          By.xpath('//div[@id="__next"]/div/main/div/div/div[2]/div[1]/span[2]')
        )
        .getText()

      assert.strictEqual(actualText, expectedText)
    } finally {
      await driver.quit()
    }
  })

  it('Should have 1 item', async () => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()

    try {
      await driver.get('https://demo-kt.trungtinpham.com/')
      await driver
        .findElement(By.id('search'))
        .sendKeys('fashion tea', Key.RETURN)
      await driver.wait(until.urlContains('search?q=fashion+tea'), 1500)

      await driver.wait(
        until.elementLocated(
          By.xpath('//*[@id="__next"]/div/main/div/div/div[2]/div[2]/a')
        )
      )

      const elements = await driver.findElements(
        By.xpath('//*[@id="__next"]/div/main/div/div/div[2]/div[2]/a')
      )
      const actual = elements.length
      const expected = 1

      assert.strictEqual(actual, expected)
    } finally {
      await driver.quit()
    }
  })
})
