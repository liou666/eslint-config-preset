import { app, BrowserWindow, ipcMain } from 'electron'
interface Greet {

}
console.log(BrowserWindow, app, ipcMain)
function add(a, b) {
  if (a > 10)
    return a

  return a + b
}

const arr = ['foo', 'bar']

async function f() {
  return Promise.resolve(1)
}
f().then(console.log).catch(console.error)
