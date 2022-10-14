import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const shell = (cmd) => {
  return execSync(cmd, { stdio: 'inherit' })
}
const log = (logs) => {
  return console.info(`[INFO]: ${logs}`)
}

const getVersion = () => {
  const data = readFileSync(resolve('./package.json'), { encoding: 'utf-8' })
  return `v${JSON.parse(data).version}`
}

const main = () => {
  log('CHANGESET')
  shell('npx changeset')
  shell('npx changeset version')

  const version = getVersion()

  log('GIT COMMIT')
  shell('git add .')
  shell(`git commit -m 'release version ${version}'`)

  log('GIT TAG')
  shell(`git tag ${version}`)

  log('GIT PUSH')
  shell('git push')
  shell(`git push origin ${version}`)

  log('PUBLISH')
  shell('pnpm publish  -r --access public')
}

main()
