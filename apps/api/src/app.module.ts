import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from '~/database/database.module';
import { RepositoriesModule } from '~/repositories/repositories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

const STATIC_ASSETS_PATH =
    process.env.NODE_ENV !== 'production'
        ? join(__dirname, '..', '..', 'client', 'dist')
        : join(__dirname, '..', 'client', 'dist');

@Module({
    imports: [
        DatabaseModule,
        ServeStaticModule.forRoot({
            rootPath: STATIC_ASSETS_PATH,
        }),
        AuthModule,
        RepositoriesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
