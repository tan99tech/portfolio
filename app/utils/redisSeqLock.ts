import Redis from 'ioredis';
import { setTimeout } from 'timers/promises';

class RedisSeqLock {
  private redis: Redis;
  private seqLock: string;

  constructor(redisClient: Redis, seqLock: string = 'seqLock') {
    this.redis = redisClient;
    this.seqLock = seqLock;
  }
 
  /**
   * Function to check and update the seqLock atomically
   * @returns {Promise<boolean>} - Increase the value by 1 and return true if the seqLock was even and return false, otherwise
   */
  private async acquireSeqLock(): Promise<boolean> {
    // Define the Lua script
    const script = `
    local key = KEYS[1]
    local current_value = redis.call('GET', key)

    if tonumber(current_value) then
      current_value = tonumber(current_value)

      if current_value % 2 == 0 then
          redis.call('SET', key, current_value + 1)
          return true
      else
          return false
      end
    else
        redis.call('SET', key, 1)
        return true
    end
    `;
    // Execute the Lua script using eval
    const acquired: boolean = await this.redis.eval(script, 1, this.seqLock) as boolean;
    return acquired;
  }

  async read<T, P extends any[]>(readFunction: (...params: P) => Promise<T>, ...params: P): Promise<T>  {
    while (true) {
      const seqStart = parseInt(await this.redis.get(this.seqLock) || '0', 10);
      if (seqStart % 2 === 1) {
        // Writer is active, retry
        console.log('Reading Locked');
        await setTimeout(10);
        continue;
      }

      const data = await readFunction(...params);

      const seqEnd = parseInt(await this.redis.get(this.seqLock) || '0', 10);
      if (seqStart === seqEnd) {
        return data; // No write occurred during read
      }
    }
  }

  async write<T, P extends any[]>(writeFunction: (...params: P) => Promise<T>, ...params: P): Promise<T> {
    while(true) {
      const lockAcquired = await this.acquireSeqLock();
      if (lockAcquired) {
        const result = await writeFunction(...params);
        // await this.redis.incr('thisSeqLock'); // End write
        await this.redis.incr(this.seqLock); // End write
        return result;
      } else {
        console.log('Writing Locked');
        await setTimeout(10); // Wait and retry if lock is not acquired
      }
    }
  }
}

export {
  RedisSeqLock,
};