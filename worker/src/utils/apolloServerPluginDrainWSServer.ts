import {Disposable} from "graphql-ws";

export default function ApolloServerPluginDrainWSServer(WSServer: Disposable) {
    return {
        async serverWillStart() {
            return {
                async drainServer() {
                    await WSServer.dispose();
                },
            };
        },
    }
}