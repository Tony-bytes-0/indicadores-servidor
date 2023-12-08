import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
export const DataSourceConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: Boolean(process.env.DB_SYNC),
  logging: Boolean(process.env.DB_LOGGING),
  entities: ['dist/**/*.entity{.ts,.js}'],
});
