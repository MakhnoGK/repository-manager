import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from '~/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        DatabaseModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'client', 'dist'),
            renderPath: '/',
            serveStaticOptions: {
                fallthrough: false,
            },
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
