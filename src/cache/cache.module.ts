import { CacheModule as BaseCacheModule, Inject, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { CONFIG } from '../../constants';
import { Config, ConfigModule } from '../config/config.module';

@Module({
  imports: [
    BaseCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: Config) => {
        return {
          store: redisStore,
          host: config.redisHost,
          port: config.redisPort,
        };
      },
      inject: [CONFIG],
    }),
  ],
  exports: [BaseCacheModule],
})
export class CacheModule {}
