import { createIssue, listIssues, listOpenIssues, printHead, printIssue } from './modules/issue'
import { init } from './modules/init'

init()
const args = process.argv

if (args.length < 3) {
  console.log('No command specified.')
  process.exit(1)
}

switch (args[2]) {
  case 'create':
    if (args.length < 4) {
      console.log('Argument missing: create <name>')
      process.exit(1)
    }
    createIssue(args[3])
    break
  case 'ls':
  case 'la':
  case 'list':
    if ((args.length >= 4 && args[3] === 'all') || args[2] === 'la') {
      const issues = listIssues()

      if (issues.length === 0) {
        console.log('No issues found.')
        process.exit(0)
      }

      printHead()
      issues.forEach((issue) => printIssue(issue))
    } else {
      const issues = listOpenIssues()

      if (issues.length === 0) {
        console.log('No issues found.')
        process.exit(0)
      }

      printHead()
      issues.forEach((issue) => printIssue(issue))
    }
    break
}
