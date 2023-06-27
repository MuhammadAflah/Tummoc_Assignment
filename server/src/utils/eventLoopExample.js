const fs = require("fs");

// Create a function to read a file and return its contents.
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Create a function to process the contents of a file.
const processFile = (data) => {
  console.log(JSON.parse(data));
};

// Create an event loop that will read a file, process its contents, and then print the results.
const eventLoop = () => {
  // Click the "RUN" button to learn how this works!
  logA();
  readFile("data.json").then((data) => processFile(data));
  setTimeout(logB, 0);
  setImmediate(logD);

  logC();
};

// Start the event loop.
eventLoop();

function logA() {
  console.log("A");
}
function logB() {
  console.log("B");
}

function logC() {
  console.log("C");
}

function logD() {
  console.log("immediatly execute");
}
