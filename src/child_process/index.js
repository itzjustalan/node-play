import child_process from "child_process";

// const SHORT_COMMAND = "ls";
// const LONG_COMMAND = "ls -r";
const SHORT_COMMAND = "dir";
const LONG_COMMAND = "dir /s";
// const SHORT_COMMAND = "echo %cd%";
// const EXEC_FILE_NAME = "./exec_file.sh";
const EXEC_FILE_NAME = "./exec_file.exe";
const FORK_FILE_NAME = "./src/child_process/long_task.js";

const callback = (error, stdout, stderror) => {
  if (error) console.log("error:", error);
  else if (stdout) console.log("stdout:", stdout);
  else if (stderror) console.log("stderror:", stderror);
  //   console.log({ error, stdout, stderror });
};

const named_cb = (name) => (...data) => console.log(`${name}:`, ...data);

export const app_with_exec = () => {
  child_process.exec(SHORT_COMMAND, callback);
};

export const app_with_exec_file = () => {
  child_process.execFile(EXEC_FILE_NAME, callback);
};

export const app_with_spawn = () => {
  const command = "ls";
  const flags = ["-l", "-a", "-h", "-r"];
  const child = child_process.spawn(command, flags);

  child.once("error", named_cb("error"));
  child.stderr.once("data", named_cb("stderr"));
  child.stdout.once("data", named_cb("stdout"));
  child.on("exit", named_cb("process terminated with"));
};

export const app_with_fork = () => {
  const child = child_process.fork(FORK_FILE_NAME);
  child.once("message", named_cb("sum"));
};
