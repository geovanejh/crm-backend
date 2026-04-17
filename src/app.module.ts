import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    // 1. Carrega as variaveis do .env e disponibiliza globalmente
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Configura a conexao com o banco de dados
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // tipo do banco
        url: configService.get<string>('DATABASE_URL'), // le a URL do .env
        autoLoadEntities: true, // carrega entities automaticamente
        synchronize: true, // cria/atualiza tabelas automaticamente
        ssl: { rejectUnauthorized: true }, // Neon exige SSL
      }),
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
