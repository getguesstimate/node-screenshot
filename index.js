const fs = require('fs')
const screenshotPromise = require('screenshot-promise')
const webshot = require('webshot')
const node_server_screenshot = require("node-server-screenshot")
const screenshot_stream = require('screenshot-stream')
const electron_screenshot_service = require('electron-screenshot-service')

const url = 'https://www.getguesstimate.com/models/7525'
const renderDelay = 40 // seconds

//screenshotPromise(url, '1024x768', {crop: true, delay: renderDelay}).then(buf => {
//      fs.writeFileSync('screenshotPromise.png', buf)
//})
//
//webshot(url, 'webshot.png', {renderDelay: renderDelay}, () => {})
//
////node_server_screenshot.fromURL(url, 'node_server_screenshot.png', {waitMiliseconds: renderDelay*1000}, () => {})
//
//var stream = screenshot_stream(url, '1024x768', {crop: true, delay: renderDelay})
//
//stream.pipe(fs.createWriteStream('screenshot_stream.png'))

exports.handler = (event, context, callback) => {
  console.log('start')
  electron_screenshot_service({
    url: url,
    width: 1024,
    height: 768,
  }).then(img => {
    console.log('got ', img.data.length, 'data points')
    context.succeed(JSON.stringify(img.data))
    electron_screenshot_service.close()
  }).catch(e => {
    console.log('Error!', e)
    context.fail(e)
  })
}
