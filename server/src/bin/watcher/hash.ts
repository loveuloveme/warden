import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export const hashFile = (filePath: string): Promise<string | null> => {
    return new Promise((resolve) => {
        const fileDescriptor = createReadStream(filePath);

        const hash = createHash('sha1').setEncoding('hex');

        fileDescriptor.on('error', () => {
            resolve(null);
        });

        fileDescriptor.on('end', () => {
            hash.end();

            resolve(hash.read());
        });

        fileDescriptor.pipe(hash);
    });
};

export const hashString = (str: string): string => {
    return createHash('md5').update(str).digest('hex');
}