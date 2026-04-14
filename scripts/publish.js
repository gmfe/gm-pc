const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const REGISTRY = 'https://code.guanmai.cn/api/v4/projects/695/packages/npm/'

const args = process.argv.slice(2)
let tag = 'beta'
let bump = 'prerelease'
let preid = 'beta'
let dryRun = false

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--tag':
      tag = args[++i]
      break
    case '--bump':
      bump = args[++i]
      break
    case '--preid':
      preid = args[++i]
      break
    case '--dry-run':
      dryRun = true
      break
    case '--help':
      console.log(`用法: node scripts/publish.js [选项]

选项:
  --tag <tag>       npm dist-tag (默认: beta)
  --bump <type>     版本类型: prerelease|patch|minor|major (默认: prerelease)
  --preid <id>      预发布标识: beta|alpha|rc (默认: beta)
  --dry-run         只输出不实际发布

示例:
  node scripts/publish.js                              # beta 预发布
  node scripts/publish.js --tag alpha --preid alpha    # alpha 预发布
  node scripts/publish.js --tag latest --bump patch    # 正式发布`)
      process.exit(0)
    default:
      console.log(`未知参数: ${args[i]}`)
      process.exit(1)
  }
}

const isCI = !!process.env.CI_JOB_TOKEN

console.log('===== 发布配置 =====')
console.log(`tag:      ${tag}`)
console.log(`bump:     ${bump}`)
console.log(`preid:    ${preid}`)
console.log(`registry: ${REGISTRY}`)
console.log(`环境:     ${isCI ? 'CI/CD' : '本地'}`)
console.log('====================')

if (dryRun) {
  console.log('[dry-run] 跳过实际发布')
  process.exit(0)
}

function run(cmd) {
  console.log(`\n>>> ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

function setupAuth(token) {
  run(`npm config set "@gm-pc:registry" "${REGISTRY}"`)
  run(`npm config set "//code.guanmai.cn/api/v4/projects/695/packages/npm/:_authToken" "${token}"`)
}

// 认证配置，优先级：环境变量 > CI_JOB_TOKEN > .npmrc
if (process.env.NPM_AUTH_TOKEN) {
  console.log('\n使用环境变量 NPM_AUTH_TOKEN 认证')
  setupAuth(process.env.NPM_AUTH_TOKEN)
} else if (isCI) {
  console.log('\n检测到 CI/CD 环境，使用 CI_JOB_TOKEN')
  setupAuth(process.env.CI_JOB_TOKEN)
} else {
  // 本地环境检查 .npmrc 认证配置
  const npmrcPath = path.resolve(process.cwd(), '.npmrc')
  if (!fs.existsSync(npmrcPath)) {
    console.error('\n错误: 未找到认证信息，请通过以下任一方式配置：')
    console.error('  1. 环境变量: cross-env NPM_AUTH_TOKEN=<token> yarn publish:beta')
    console.error('  2. .npmrc 文件: 在项目根目录创建 .npmrc 并配置 _authToken')
    process.exit(1)
  }
  const npmrc = fs.readFileSync(npmrcPath, 'utf-8')
  if (!npmrc.includes('_authToken')) {
    console.error('\n错误: .npmrc 中未配置 _authToken，请通过以下任一方式配置：')
    console.error('  1. 环境变量: cross-env NPM_AUTH_TOKEN=<token> yarn publish:beta')
    console.error(`  2. .npmrc: echo '//code.guanmai.cn/api/v4/projects/695/packages/npm/:_authToken=<token>' >> .npmrc`)
    process.exit(1)
  }
  console.log('\n本地环境，使用 .npmrc 中的认证配置')
}

// bump 版本
const lernaVersionExtra = isCI ? '--no-git-tag-version --no-push' : ''
run(
  `npx lerna version ${bump} --yes --force-publish --preid ${preid} --no-changelog ${lernaVersionExtra}`
)

// 发布
run(`npx lerna publish from-package --dist-tag ${tag} --registry ${REGISTRY} --yes`)

console.log('\n发布完成!')
