import Watcher from "./bin/watcher/Watcher";
import { FileEvent } from "./bin/watcher/types";
import { workPath } from "./config";
import { source } from "./database/source";
import notify from "./notify";
import SubscriptionService from "./services/Subscription";

const watcher = new Watcher(workPath);

watcher.on('change', async (event: FileEvent) => {
    if (!source.isInitialized) return;


    const subs = await SubscriptionService.getSubscriptions(event.file.id);

    subs.forEach(async sub => {
        if (!sub.anyUpdate) {
            await SubscriptionService.removeSubscription(sub);
        }

        await notify.notify(event, sub);
    });
});

export default watcher;