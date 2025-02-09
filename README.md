# Project Setup Guide
---

    - Clone the Repository and navigate project folder
    - Create a `.env` file in the root directory and add the following environment variable
        * `PORT=3000`
        * `JWT_SECRET=<YOUR_JWT_SECRET>
        * DB_PASSWORD=<YOUR_DB_PASSWORD>
        * DB_NAME=<YOUR_DB_NAME>
    - Inside the `src/config` folder create a new file `config.json` and then add the follwing piece of json.

    ```
    {
        "development": {
            "username": <YOUR_DB_LOGIN_NAME>,
            "password": <YOUR_DB_PASSWORD>,
            "database": "<YOUR_DB_NAME>",
            "host": "db",
            "dialect": "mysql"
        }
    }
    ```

---

## 🐳 Start Docker Containers
Ensure Docker and Docker Compose are installed, then run:

```sh
# Build and start the containers
docker-compose up -d --build
```

This will start the database and application containers in detached mode.

---

## Run Migrations
Run the following command to create the database tables:

```sh
docker-compose exec app npx sequelize-cli db:migrate
```

This will execute all pending migrations and create necessary tables.

---

## Run Seeders (Create Admin User)
After applying migrations, insert an `Admin` user into the `Users` table:

```sh
docker-compose exec app npx sequelize-cli db:seed --seed <your-seeder-filename>.js
```

Replace `<your-seeder-filename>.js` with the actual seeder filename, e.g.:

```sh
docker-compose exec app npx sequelize-cli db:seed --seed 20250209132801-create-admin-user.js
```

This will insert an admin user into the database.

---




