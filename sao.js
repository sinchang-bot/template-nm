const superb = require('superb')
const camelcase = require('camelcase')

module.exports = {
  templateOptions: {
    context: {
      camelcase
    }
  },
  prompts: {
    name: {
      message: 'What is the name of the new project?',
      default: ':folderName:'
    },
    description: {
      message: 'How would you describe the new project?',
      default: `my ${superb()} project`
    },
    username: {
      message: 'What is your GitHub username?',
      default: ':gitUser:',
      store: true
    },
    email: {
      message: 'What is your GitHub email?',
      default: ':gitEmail:',
      store: true,
      validate: v => /.+@.+/.test(v)
    },
    website: {
      message: 'What is the url of your website?',
      default(answers) {
        return `https://github.com/${answers.username}`
      },
      store: true
    },
    pm: {
      message: 'Choose a package manager',
      choices: ['npm5', 'yarn'],
      type: 'list',
      default: 'npm5'
    },
    unitTest: {
      message: 'Do you need unit test?',
      type: 'confirm',
      default: false
    },
    coverage: {
      message: 'Do you want to add coverage port?',
      type: 'confirm',
      default: false,
      when: answers => answers.unitTest
    },
    eslint: {
      message: 'Choose an eslint tool',
      type: 'list',
      default: 'xo',
      choices: ['xo', 'standard', 'disable']
    },
    compile: {
      message: 'Do you need to compile ES2015 code?',
      type: 'confirm',
      default: false
    },
    cli: {
      message: 'Do you want to add a CLI?',
      type: 'confirm',
      default: false,
      when: answers => !answers.compile
    },
    twitter: {
      message: 'What is your twitter username?',
      store: true
    }
  },
  filters: {
    'test/**': 'unitTest',
    'src/**': 'compile',
    'index.js': '!compile',
    'cli.js': 'cli',
    'circle-npm5.yml': 'pm === "npm5"',
    'circle-yarn.yml': 'pm === "yarn"'
  },
  move: {
    // We keep `.gitignore` as `gitignore` in the project
    // Because when it's published to npm
    // `.gitignore` file will be ignored!
    gitignore: '.gitignore',
    'circle-*.yml': 'circle.yml'
  },
  showTip: true,
  installDependencies: true,
  gitInit: true
}
