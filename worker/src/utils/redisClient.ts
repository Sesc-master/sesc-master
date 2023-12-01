import {createClient, RedisClientType} from 'redis';

const getConnectedClient = async (): Promise<RedisClientType> => {
  const client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6379
    }
  });
  client.on('error', err => console.log('Redis Client Error', err));
  await client.connect();

  return client as RedisClientType;
}

export {
  getConnectedClient
};
