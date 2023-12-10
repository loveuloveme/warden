import nodemailer from 'nodemailer';
import { FileEvent } from '../watcher/types';
import Subscription from '../../database/models/Subscription';
import Mail from 'nodemailer/lib/mailer';
import { mail } from '../../config';

class Notify {
    eventNames = {
        'addDir': 'created',
        'add': 'created',
        'unlink': 'removed',
        'unlinkDir': 'removed',
        'change': 'updated'
    }

    transporter = nodemailer.createTransport(mail);

    private folderChange(event: FileEvent, sub: Subscription) {
        const getTrace = (event: FileEvent, prev = []) => {
            return [event, ...(event ? event.trace.map(e => getTrace(e)) : [])].filter(event => event).flat();
        };

        return {
            subject: `Folder ${event.file.path} has been ${this.eventNames[event.type.event]}.`,
            html: `
                <p>Trace</p>
                ${getTrace(event).map(event => `<strong>${event.file.path}</strong> has been changed -> ${this.eventNames[event.type.event]}<br />`).join('')}
            `
        }
    }

    private fileChange(event: FileEvent, sub: Subscription) {
        return {
            subject: `File ${event.file.path} has been ${this.eventNames[event.type.event]}.`,
            html: `The current file hash is <i>${event.hash}</i>`
        }
    }

    public notify(event: FileEvent, sub: Subscription) {
        let msg: Mail.Options;

        if (event.file.dir) {
            msg = this.folderChange(event, sub);
        } else {
            msg = this.fileChange(event, sub);
        }

        msg.html = `<p>${sub.anyUpdate ? 'The current subscription will not be deleted.' : 'The current subscription has been deleted.'}</p>` + msg.html;

        return this.transporter.sendMail({
            from: `"File Watcher" <${mail.auth.user}>`,
            to: 'olegpodkolzin@icloud.com',
            ...msg
        });
    }
}

export default Notify;