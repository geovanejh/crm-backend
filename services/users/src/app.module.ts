import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RefreshTokenOrmEntity } from './infrastructure/database/typeorm/entities/refresh-token.orm-entity';
import { UserOrmEntity } from './infrastructure/database/typeorm/entities/user.orm-entity';
import { UsersModule } from './users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: Number(config.get<string>('POSTGRES_PORT')),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [UserOrmEntity, RefreshTokenOrmEntity],
        migrations: [
          join(
            __dirname,
            'infrastructure',
            'database',
            'typeorm',
            'migrations',
            '*.{ts,js}',
          ),
        ],
        migrationsRun: true,
        synchronize: false,
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}
