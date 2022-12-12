import {Transform} from 'stream';

const transform = async () => {
    try {
        const createRevertStringTransformStream = () => {
            return new Transform({
                transform(chunk, _, callback) {
                    const reversChunk = chunk.toString().split('').reverse().join('');
                    callback(null, reversChunk)
                }
            })
        }

        const transformStream = createRevertStringTransformStream();
        process.stdin.pipe(transformStream).pipe(process.stdout)
    } catch (error) {}
};

await transform();