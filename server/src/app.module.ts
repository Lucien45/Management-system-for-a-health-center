import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        console.log(nodeEnv);
        const isDev = nodeEnv === 'developpement';
        return {
          type: 'mongodb',
          url: configService.get<string>('DB_HOST'),
          database: configService.get<string>('DB_NAME'),
          useUnifiedTopology: true,
          useNewUrlParser: true,
          entities: ['dist/**/*.entity{.js,.ts}'],
          autoLoadEntities: true,
          synchronize: isDev,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
