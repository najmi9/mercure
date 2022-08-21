
```bash
docker compose up -d
composer install
yarn install
yarn build
```

```bash
symfony console doctrine:database:create
symfony console doctrine:schema:update
symfony serve -d
symfony console messenger:consumer async
```

* Mercure Debugging Tool URL: http://127.0.0.1:9191/.well-known/mercure/ui/
