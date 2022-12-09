const parseArgs = () => {
    process.argv.forEach((arg, index) => {
       if (arg.startsWith('--')) {
           const correctArg = arg.slice(2);
           process.stdout.write(`${correctArg} is ${process.argv[index + 1]}, `)
       }
    })
};

parseArgs();