function logDir(string) {
  console.log("%c" + string, "color: green");
}

function logDirDetails(string) {
  console.log("%c" + string, "color: #66b266");
}

function logInfo(string) {
  console.log("%c" + string, "color: blue");
};

function logInfoDetails(string) {
  console.log("%c" + string, "color: #6666ff");
}

function logData(string) {
  console.log("%c" + string, "background: #e5e5e5");
}

function logMsg(string) {
  console.log("%c" + MSG_HEADER + "%c" + string, "color: magenta", "color: black");
}
