# Github repository manager

Test assignment at Universe

## Stack

- NestJS
- React
- PostgreSQL

## Requirements

- Docker
- docker-compose

## Starting project

Clone the repository

`git clone https://github.com/MakhnoGK/repository-manager`

Start the project

## Production mode

```shell
cd repository-manager
docker-compose up --build
```

Project will be available at `http://localhost:3000`

## Development mode

Requirements:
- Node.js >= 22.14.0

```shell
cd repository-manager
npm install
npm run start:dev
```

UI will be available at `http://localhost:5437` and API at `http://localhost:3000`

## Future plans

- Add tasks queue for better error handling of third-pary API requests
