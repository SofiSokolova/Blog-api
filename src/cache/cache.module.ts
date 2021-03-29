import { CacheModule as BaseCacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { Config, ConfigModule } from '../config/config.module';
import { CONFIG } from '../inject-tokens';

@Module({
  imports: [
    BaseCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: Config) => {
        return {
          store: redisStore,
          host: config.redis.redisHost,
          port: config.redis.redisPort,
        };
      },
      inject: [CONFIG],
    }),
  ],
  exports: [BaseCacheModule],
})
export class CacheModule {}
