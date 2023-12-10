import { hashFile, hashString } from "./hash";
import { EventEmitter } from 'stream';
import fs from 'fs';

export type FileEvent = {
    type: { event: string, traceEvent: FileEvent[] };
    hash: string;
    prevHash: string;
    file: FileTreeElement;
    trace: FileEvent[];
}

interface FileEvents {
    on(name: 'change', listener: (event: FileEvent) => void): this;
}

export class FileTreeElement extends EventEmitter implements FileEvents {
    public id: string;
    public name: string;
    public path: string;
    public aPath: string;
    public hash: string | null = null;
    public dir: boolean;
    private events = [];
    public child: FileTreeElement[] = [];
    public parent: FileTreeElement | null = null;
    public updateTimeout: ReturnType<typeof setTimeout>;

    public static getFileId(path: string) {
        return hashString(path);
    }

    constructor(name: string, path: string, absolutePath: string, isDir?: boolean) {
        super();

        this.name = name;
        this.path = path;
        this.aPath = absolutePath;
        this.id = FileTreeElement.getFileId(path);
        this.dir = isDir ?? false;
    }

    public static getFileHash(path: string): Promise<string> {
        return hashFile(path);
    }


    public add(element: FileTreeElement): void {
        element.parent = this;
        this.child.push(element);
    }

    public remove(element: FileTreeElement): void {
        element.parent = null;

        this.child = this.child.filter(el => el != element);
    }

    public update(event: string, traceEvent?: FileEvent) {
        this.events.push({ event, traceEvent });

        clearTimeout(this.updateTimeout);

        this.updateTimeout = setTimeout(async () => {
            const hash = this.dir ? this.getHash() : await FileTreeElement.getFileHash(this.aPath);

            if (this.hash !== hash) {
                const event = {
                    file: this,
                    hash,
                    prevHash: this.hash,
                    type: this.events.at(-1),
                    trace: this.events.map(event => event.traceEvent)
                }

                this.emit('change', event);
                this.parent?.update('change', event);

                if (hash == null) {
                    this.parent?.remove(this);
                }
            }

            this.hash = hash;
            this.events = [];
        }, 10_000);
    }

    public async forceHash() {
        if (this.dir) {
            this.hash = this.getHash();
        } else {
            this.hash = await FileTreeElement.getFileHash(this.aPath);
        }
    }

    public getDirHash(): string {
        if (fs.existsSync(this.aPath)) {
            return hashString(this.child.reduce((prev, current) => prev + current.getHash(), this.aPath));
        }

        return null;
    }

    public getHash(): string {
        if (this.dir) {
            return this.getDirHash();
        } else {
            return this.hash;
        }
    }
}


export type ReponseFileTreeElement = {
    hash: string | null,
    id: string,
    path: string,
    child: ReponseFileTreeElement[],
    isDir: boolean;
    name: string;
};

export type FileChangeEvent = {
    fileId: string;
    filename: string;
    hash?: string | null;
    isDir: boolean;
    trace: FileChangeEvent[];
    timestamp: Date;
};

export class ServerResponse {
    constructor(
        public eventName: string,
        public data: any
    ) { }

    json(): string {
        return JSON.stringify(this);
    }
}