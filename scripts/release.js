import { execSync } from 'child_process'
import { readFileSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'

const pack = process.argv[2] || 'packages'
const packFileName = process.argv[3] || 'package.json'

const shell = (cmd) => {
  return execSync(cmd, { stdio: 'inherit' })
}
const log = (logs) => {
  return console.info(`[INFO]: ${logs}`)
}

const recursiveFindFile = (dir, target, exclusive = ['node_modules']) => {
  const files = readdirSync(dir)
  for (const file of files) {
    if (exclusive.includes(file)) continue
    if (statSync(resolve(dir, './', file)).isDirectory()) {
      return recursiveFindFile(resolve(dir, './', file), target)
    }
    else {
      if (file === target)
        return resolve(dir, './', target)
    }
  }
}

const getVersion = () => {
  const data = readFileSync(
    recursiveFindFile(pack, packFileName)
    , { encoding: 'utf-8' })
  const { version } = JSON.parse(data)
  return `v${version}`
}

const main = () => {
  log('CHANGESET')
  shell('npx changeset')
  shell('npx changeset version')

  const version = getVersion()

  log('GIT ADD')
  shell('git add .')

  log('GIT COMMIT')
  shell(`git commit -m "release version ${version}"`)

  log('GIT TAG')
  shell(`pnpm version ${version} --allow-same-version`)

  log('GIT PUSH')
  shell('git push')
  shell(`git push origin ${version}`)

  log('PUBLISH')
  shell('pnpm publish  -r --access public')
}

main()

