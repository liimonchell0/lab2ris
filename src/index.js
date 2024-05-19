import { homedir } from 'os';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--Lidiya='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Lidiya';

const printWorkingDirectory = () => {
    const homeDirectory = homedir();
    console.log(`You are currently in ${homeDirectory}`);
};

const exitHandler = () => {
    printWorkingDirectory();
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
};

console.log(`Welcome to the File Manager, ${username}!`);
printWorkingDirectory();

// Обработчик для Ctrl+C
process.on('SIGINT', exitHandler);

// Обработчик для команды .exit
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input === '.exit') {
        exitHandler();
    }
});
