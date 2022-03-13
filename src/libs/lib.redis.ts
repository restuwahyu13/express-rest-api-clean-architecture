import IORedis from 'ioredis'

interface IRedis {
  countCacheData(key: string): Promise<number>
  keyCacheDataExist(key: string): Promise<number>
  delCacheData(key: string): Promise<number>
  setCacheData(key: string, data: Record<string, any>[]): Promise<number>
  getCacheData(key: string): Promise<Record<string, any>[]>
}

export class Redis implements IRedis {
  private db: number

  constructor(db: number) {
    this.db = db
  }

  config(): IORedis.Redis {
    return new IORedis({
      host: process.env.REDIS_HOST as string,
      port: parseInt(process.env.REDIS_PORT as any),
      enableAutoPipelining: true,
      enableOfflineQueue: true,
      connectTimeout: 15000,
      maxRetriesPerRequest: 40,
      db: this.db
    }) as IORedis.Redis
  }

  public async countCacheData(key: string): Promise<number> {
    const res = await this.config().hgetall(key)
    return JSON.parse(res.payload).data.length
  }

  public async keyCacheDataExist(key: string): Promise<number> {
    const res = await this.config().exists(key)
    return res
  }

  public async delCacheData(key: string): Promise<number> {
    const res = await this.config().del(key)
    return res
  }

  public async setCacheData(key: string, data: Record<string, any>[]): Promise<number> {
    const res = this.config().hset(key, { payload: JSON.stringify({ data }) })
    return res
  }

  public async getCacheData(key: string): Promise<Record<string, any>[]> {
    const res = await this.config().hgetall(key)
    return JSON.parse(res.payload).data
  }
}
