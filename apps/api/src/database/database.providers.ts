import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'repository-manager',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            });

            return dataSource.initialize();
        },
    },
];
