import {createClient, RedisClientType} from 'redis';

const getConnectedClient = (): Promise<RedisClientType> => {
  return new Promise((resolve) => {
    const returnClient = () => {
      const client = createClient({
        socket: {
          host: 'cache',
          port: 6379
        }
      });
      client.on('error', err => console.log('Redis Client Error', err));
      client.connect();

      if (client.isReady) {
        resolve(client as RedisClientType);
      } else {
        setTimeout(returnClient, 200);
      }
    }

    returnClient();
  })
}
export {
  getConnectedClient
};
