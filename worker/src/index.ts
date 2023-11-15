import {PubSubEngine} from "type-graphql";
import {PubSub} from "graphql-subscriptions";
import {announcementsUpdater, rootUpdaters, schedulesUpdater} from "./updaters";
import {announcementsOnChange, schedulesOnChange} from "./utils/updaters/onChangeFunctions";
import {config} from "dotenv-flow";

config();

async function bootstrap () {
    const pubSub: PubSubEngine = new PubSub();

    await Promise.all(rootUpdaters.map(rootUpdater => rootUpdater.update()));
    announcementsUpdater.onChange = announcementsOnChange(pubSub, announcementsUpdater.name);
    schedulesUpdater.onChange = schedulesOnChange(pubSub, schedulesUpdater.name);
}

bootstrap();