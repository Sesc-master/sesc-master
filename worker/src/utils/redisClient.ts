import {createClient, RedisClientType} from 'redis';

const client = createClient({
  socket: {
    host: 'cache',
    port: 6379
  }
});

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const getConnectedClient = (): Promise<RedisClientType> => {
  return new Promise((resolve) => {
    const returnClient = () => {
      if (client.isReady) {
        resolve(client as RedisClientType);
      } else {
        setTimeout(returnClient, 100);
      }
    }

    returnClient();
  })
}
export {
  getConnectedClient
};
