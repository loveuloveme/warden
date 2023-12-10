import { Logger } from '../../Logger';
import * as chokidar from 'chokidar';
import { FileChangeEvent, FileEvent, FileTreeElement, ReponseFileTreeElement } from './types';
import { EventEmitter } from 'stream';
import path from 'path';

interface WatcherEvents {
    on(name: 'ready', listener: () => void): this;
    on(name: 'change', listener: (event: FileEvent) => void): this;
}

export class Watcher extends EventEmitter implements WatcherEvents {
    private chokidar: chokidar.FSWatcher;

    private indexingIntervalId: NodeJS.Timeout;

    private files: Map<string, FileTreeElement>;

    private rootFolder: string | null = null;
    private ready: boolean = false;

    public constructor(project: string) {
        super();

        this.files = new Map<string, FileTreeElement>();
        this.rootFolder = path.normalize(project);

        this.indexingIntervalId = setInterval(() => {
            const filesCount = Array.from(this.files.values()).length;

            Logger.info(
                `indexed ${filesCount.toLocaleString('en-US')} ${filesCount === 1 ? 'file' : 'files'}...`,
            );
        }, 5_000);

        this.chokidar = chokidar.watch(project, {
            awaitWriteFinish: false,
            followSymlinks: true,
        });

        //this.fsChange('addDir', this.rootFolder);

        this.chokidar.on('ready', async () => {
            clearInterval(this.indexingIntervalId);
            this.ready = true;

            for(let node of this.files.values()){
                if(node.dir){
                    await node.forceHash();
                }
            }

            this.emit('ready');
        });

        this.chokidar.on('all', this.fsChange.bind(this));
    }

    private async fsChange(event, filename) {
        if(this.ready){
            console.log(event, filename)
        }

        const file = this.parseFilename(filename);
        const parentId = file.dirs.at(-1) && FileTreeElement.getFileId(file.dirs.at(-1));

        const nodeId = FileTreeElement.getFileId(file.path);

        if (this.files.has(nodeId)) {
            const node = this.files.get(nodeId);
            node.update(event);

            return;
        }

        const node = new FileTreeElement(file.name, file.path, filename, event === 'addDir');
        this.files.set(node.id, node);

        node.on('change', event => {
            this.emit('change', event);
        });

        if (parentId) {
            this.files.get(parentId).add(node)
        }

        if (this.ready) {
            node.update(event);
        } else {
            if (!node.dir) {
                await node.forceHash();
            }
        }

        // // node.setWatcher(this);

        // let parentElement: FileTreeElement | undefined;

        // if (pDir) {
        //     parentElement = this.files.get(hashString(pDir));
        // }

        // await node.generateHash();

        // if (this.files.has(node.id)) {
        //     this.files.get(node.id).update(node);
        //     // this.files.delete(node.id);
        // }else{
        //     if(this.ready){
        //         node.update(node);
        //     }
        // }

        // if (event !== 'unlink' && event !== 'unlinkDir') {
        //     if (parentElement) {
        //         parentElement.add(node);
        //     }

        //     this.files.set(node.id, node);
        // } else {
        //     this.files.get(node.id).destroy();
        //     this.files.delete(node.id);
        // }
    }

    private parseFilename(filename: string) {
        const name = path.parse(filename).base;

        const filepath = filename.replace(this.rootFolder, '') || '\\';

        const dirname = [];

        while (true) {
            if (filepath == '\\') break;

            const root = path.dirname(dirname[0] ?? filepath);
            if (root == dirname[0]) {
                break;
            };

            dirname.unshift(root)
        }

        return {
            dirs: dirname,
            path: filepath,
            name
        }
    }

    public getAll(): string {
        const root = this.files.values().next().value;

        return JSON.stringify(root, (key: string, value: string) => {
            if (key == 'parent') return undefined;
            else return value;
        });
    }

    public get(dirId: string): FileTreeElement | undefined {
        const file: FileTreeElement | undefined = this.files.get(dirId);

        return file;
    }

    public getRootId(): string {
        const root = this.files.values().next().value;

        return root.id;
    }

    public toResponse(element: FileTreeElement, parseChild: boolean = true): ReponseFileTreeElement {
        const elementReponse: ReponseFileTreeElement = {
            hash: element.hash,
            id: element.id,
            path: element.path,
            child: parseChild ? element.child
                .sort((one, two) => (one.name > two.name ? -1 : 1))
                .sort(element => element.dir ? -1 : 1)
                .map(file => this.toResponse(file, false)) : [],
            isDir: element.dir,
            name: element.name
        }

        return elementReponse;
    }

    public close() {
        clearInterval(this.indexingIntervalId);

        return this.chokidar.close();
    }
}

export default Watcher;

//export const watcher: Watcher = new Watcher('C:\\Program Files\\dotnet\\sdk\\7.0.203');
