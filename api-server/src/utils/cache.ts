import ICache from "./ICache";
import {isEqual} from "lodash";
import {getConnectedClient} from "./redisClient";

function replacer(key: string, value: any) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

function reviver(key: string, value: any) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

export default class Cache<T> implements ICache<T> {
  protected key: string = '';
  constructor(key: string) {
    this.key = key;
  }

  public async getValue(): Promise<T> {
    const client = await getConnectedClient();
    const res = JSON.parse(await client.get(this.key) || '{}', reviver);
    return new Promise<T>(resolve => resolve(res));
  }

  public async updateValue(newValue: T): Promise<boolean> {
    const client = await getConnectedClient();
    const res = JSON.parse(await client.get(this.key) || '{}', reviver);
    let isChanged = !isEqual(res, newValue);

    if (isChanged) {
      await client.set(this.key, JSON.stringify(newValue, replacer));
    }
    return new Promise<boolean>(resolve => resolve(isChanged));
  }
}