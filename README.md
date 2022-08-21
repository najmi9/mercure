
### Usefull Commands

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



### How it works?
- `PublishTokenProvider::getJwt()` provider used by the mercure bundle to create a signed JWT with key *MERCURE_PUBLISHER_JWT_KEY*, is used by the bundle to push updates to the mercure server.

- `SubscriptionTokenProvider::getJwt()` provider used to generate programmatically JWT tokens signed  by the key *MERCURE_SUBSCRIBER_JWT_KEY*, this token is used on the client side to subscribe to private updates.

- I used the Symfony Messenger component to dispatch the Mercure Update asynchronously, so you need to run the worker:
    ```bash
        symfony console messenger:consumer async -vv
    ```
    To consume the messages.
