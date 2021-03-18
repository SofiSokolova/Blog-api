import { CacheModule as BaseCacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    BaseCacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6379,
        };
      },
    }),
  ],
  exports: [BaseCacheModule],
})
export class CacheModule {}
