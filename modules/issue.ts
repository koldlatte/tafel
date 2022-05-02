import * as fs from 'fs'
import * as path from 'path'
import * as YAML from 'yaml'

type IssuePriority = 'low' | 'medium' | 'high'
type IssueStatus = 'active' | 'done' | 'onhold'

export interface Issue {
  id: number
  name: string
  deadline: string
  progress: number
  priority: IssuePriority
  status: IssueStatus
}

export function listIssues(): Issue[] {
  const issueIds: string[] = fs.readdirSync('issues')
  const issues: Issue[] = issueIds.map((issueId) => readIssue(issueId))

  return issues
}

export function listOpenIssues(): Issue[] {
  const issues = listIssues()

  const openIssues: Issue[] = issues.filter((issue) => issue.progress !== 100)

  return openIssues
}

function readIssue(issueId: string): Issue {
  const p = path.resolve('issues', issueId, 'issue.yml')
  const data = fs.readFileSync(p, 'utf-8')
  const issue = YAML.parse(data)
  return issue as Issue
}

export function nextIssueId() {
  const issues = listIssues()

  const issueIds = issues.map((issue) => issue.id)
  const max = Math.max(...issueIds, 0)

  return max + 1
}

interface IssueOptions {
  deadline?: string
  priority?: IssuePriority
  status?: IssueStatus
}

export function createIssue(name: string, options?: IssueOptions) {
  const defaults: IssueOptions = {
    deadline: '',
    priority: 'low',
    status: 'active',
  }
  const { deadline, priority, status } = { ...defaults, ...options }

  const issue: Issue = {
    id: nextIssueId(),
    name,
    deadline,
    progress: 0,
    priority,
    status,
  }

  mkIssueDir(issue)
  createIssueFile(issue)
}

function mkIssueDir(issue: Issue) {
  const p = path.resolve('issues', issue.id.toString())
  fs.mkdirSync(p)
}

function createIssueFile(issue: Issue) {
  const p = path.resolve('issues', issue.id.toString(), 'issue.yml')
  fs.writeFileSync(p, YAML.stringify(issue), 'utf-8')
}

export function printHead() {
  const name = 'Name'.padEnd(20, ' ')
  const progress = '%'.padStart(5, ' ')
  const priority = 'Prio'.padStart(6, ' ')
  const status = 'Status'.padStart(6, ' ')
  const deadline = 'Deadline'.padEnd(20, ' ')
  console.log(`${name}  ${progress}  ${priority}  ${status}  ${deadline}`)
  console.log(
    `${'-'.repeat(20)}  ${'-'.repeat(5)}  ${'-'.repeat(6)}  ${'-'.repeat(6)}  ${'-'.repeat(20)}`
  )
}

export function printIssue(issue: Issue) {
  const name = issue.name.padEnd(20, ' ')
  const progress = issue.progress.toString().padStart(3, ' ')
  const priority = issue.priority.padStart(6, ' ')
  const status = issue.status.padStart(6, ' ')
  const deadline = issue.deadline.padEnd(20, ' ')
  console.log(`${name}  ${progress} %  ${priority}  ${status}  ${deadline}`)
}
