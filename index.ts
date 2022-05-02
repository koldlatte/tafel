import {
  createIssue,
  listIssues,
  listOpenIssues,
  printHead,
  printIssue,
} from "./modules/issue";

const args = process.argv;

if (args.length < 3) {
  console.log("No command specified.");
  process.exit(1);
}

switch (args[2]) {
  case "create":
    if (args.length < 4) {
      console.log("Argument missing: create <name>");
      process.exit(1);
    }
    createIssue(args[3]);
    break;
  case "ls":
  case "list":
    if (args.length >= 4 && args[3] === "all") {
      const issues = listIssues();

      printHead();
      issues.forEach((issue) => printIssue(issue));
    } else {
      const issues = listOpenIssues();

      printHead();
      issues.forEach((issue) => printIssue(issue));
    }
    break;
}
