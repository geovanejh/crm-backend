import 'dotenv/config';
import { DataSource } from 'typeorm';
import { RefreshTokenOrmEntity } from './entities/refresh-token.orm-entity';
import { UserOrmEntity } from './entities/user.orm-entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserOrmEntity, RefreshTokenOrmEntity],
  migrations: ['src/infrastructure/database/typeorm/migrations/*.ts'],
  synchronize: false,
});
