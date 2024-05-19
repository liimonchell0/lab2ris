import { homedir } from 'os';
import { readdir, stat } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--Lidiya='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Guest';

const homeDirectory = homedir();
let currentWorkingDirectory = homeDirectory;

const printWorkingDirectory = () => {
    console.log(`You are currently in ${currentWorkingDirectory}`);
};

const exitHandler = () => {
    printWorkingDirectory();
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
};

console.log(`Welcome to the File Manager, ${username}!`);
printWorkingDirectory();

const handleInput = (input) => {
    const [command, ...params] = input.split(' ');

    switch (command) {
        case 'pwd':
            printWorkingDirectory();
            break;
        case 'ls':
            listFiles(params[0] || currentWorkingDirectory);
            break;
        case 'cd':
            changeDirectory(params[0]);
            break;
        case 'exit':
            exitHandler();
            break;
        default:
            console.log('Invalid input');
    }
};

const listFiles = (directoryPath) => {
    readdir(directoryPath, (err, files) => {
        if (err) {
            console.log('Operation failed');
            return;
        }
        console.log(files.join('\n'));
    });
};

const changeDirectory = (targetDirectory) => {
    if (!targetDirectory) {
        console.log('Invalid input');
        return;
    }

    const newPath = resolve(currentWorkingDirectory, targetDirectory);
    if (!newPath.startsWith(homeDirectory)) {
        console.log('Invalid input');
        return;
    }

    stat(newPath, (err, stats) => {
        if (err || !stats.isDirectory()) {
            console.log('Operation failed');
            return;
        }
        currentWorkingDirectory = newPath;
        printWorkingDirectory();
    });
};

process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    const input = data.trim();
    handleInput(input);
});
