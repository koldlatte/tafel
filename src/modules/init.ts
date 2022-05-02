import * as fs from 'fs'

/**
 * Initialize
 */
export function init() {
  initDirectory()
}

/**
 * Create issues directory if it doesn't exist
 */
function initDirectory() {
  fs.existsSync('issues') || fs.mkdirSync('issues')
}
