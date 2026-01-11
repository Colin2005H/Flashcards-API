# Flashcards-API

This project provide a functionnal API to create flashcards for revision linked to users profile.

## Run Locally
Clone the project

```bash
  git clone https://github.com/Colin2005H/Flashcards-API.git
```

Go to the project directory

```bash
  cd Flashcards-API
```

Install dependencies

```bash
  npm install
```

Copy the .env.template file to a .env file

```bash
  cp .env .env.template
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

To generate a valid variable, you can use [JWT Secret Key Generator](https://jwtsecrets.com/)

## Set up database

Create the database

```bash
  npm run db:push
```

Seed the database with default data

```bash
  npm run db:seed
```

Open the browser client for the database

```bash
  npm run db:studio
```

## Deployment

To deploy this project run

```bash
  npm run dev
```

## API Reference

### Account

#### Create a new account

```http
  POST /auth/register
```
![Public Status Badge](https://img.shields.io/badge/connection%20status-public-green?style=flat&logo=bitrise)

| Body        | Type     | Description                          | Constraints                                                         |
| :---------- | :------- | :----------------------------------- | :------------------------------------------------------------------ |
| `firstName` | `string` | **Required**. First name of the user | *Must be at most 31 characters long*                                |
| `lastName`  | `string` | **Required**. Last name of the user  | *Must be at most 63 characters long*                                |
| `email`     | `string` | **Required**. email of the user      | *Must be a valid email adress format*                               |
| `password`  | `string` | **Required**. Password of the user   | *Must be at least 8 characters long and at most 63 characters long* |
| `role`      | `string` | *Optional*. Role of the user         | *Must be either ADMIN or USER. Will be USER by default*             |

#### Login an existing account

```http
  POST /auth/login
```
![Public Status Badge](https://img.shields.io/badge/connection%20status-public-green?style=flat&logo=bitrise)

| Body        | Type     | Description                          | Constraints                                                         |
| :---------- | :------- | :----------------------------------- | :------------------------------------------------------------------ |
| `email`     | `string` | **Required**. email of the user      | *Must be a valid email adress format*                               |
| `password`  | `string` | **Required**. password of the user   | *Must be at least 8 characters long and at most 63 characters long* |

#### Get information about the account currently logged-in

```http
  GET /auth/info
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

### Flashcard

#### Create a flashcard

```http
  POST /flashcard/
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Body           | Type     | Description                                          | Constraints                                     |
| :------------- | :------- | :--------------------------------------------------- | :---------------------------------------------- |
| `collectionId` | `string` | **Required**. Id of the collection of the flashcard  | *Must be a UUID*                                |
| `frontText`    | `string` | **Required**. Text on the front of the flashcard     | *Must be at most 255 characters long*           |
| `backText`     | `string` | **Required**. Text on the back of the flashcard      | *Must be at most 255 characters long*           |
| `frontURL`     | `string` | *Optional*. URL on the front of the flashcard        | *Must be at most 255 characters long*           |
| `backURL`      | `string` | *Optional*. URL on the back of the flashcard         | *Must be at most 255 characters long*           |

#### Get a flashcard by its ID

```http
  GET /flashcard/:id
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)
![Admin Status Badge](https://img.shields.io/badge/connection%20status-admin-red?style=flat&logo=bitrise)

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Required**. The id of the required flashcard |

#### Update a flashcard informations (must be a flashcard that you created)

```http
  PUT /flashcard/:id
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Required**. The id of the updated flashcard  |

| Body           | Type     | Description                                          | Constraints                                     |
| :------------- | :------- | :--------------------------------------------------- | :---------------------------------------------- |
| `collectionId` | `string` | **Required**. Id of the collection of the flashcard  | *Must be a UUID*                                |
| `frontText`    | `string` | **Required**. Text on the front of the flashcard     | *Must be at most 255 characters long*           |
| `backText`     | `string` | **Required**. Text on the back of the flashcard      | *Must be at most 255 characters long*           |
| `frontURL`     | `string` | *Optional*. URL on the front of the flashcard        | *Must be at most 255 characters long*           |
| `backURL`      | `string` | *Optional*. URL on the back of the flashcard         | *Must be at most 255 characters long*           |

#### Delete a flashcard (must be a flashcard that you created)

```http
  DELETE flashcard/:id
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Required**. The id of the updated flashcard  |

#### Add a revision to a flashcard

```http
  POST /flashcard/:id/review
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Required**. The id of the reviewed flashcard  |

| Body           | Type      | Description                          | Constraints               |
| :------------- | :-------- | :----------------------------------- | :------------------------ |
| `level`        | `integer` | **Required**. Level of the revision  | *Must be between 1 and 5* |

##### Revision's level detail

| Level | Time between each review |
| :---- | :----------------------- |
| 1     | 1 day                    |
| 2     | 2 days                   |
| 3     | 4 days                   |
| 4     | 8 days                   |
| 5     | 16 days                  |

#### Do a revision of a flashcard

```http
  PUT /flashcard/:id/review
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Required**. The id of the flashcard reviewed  |

| Body           | Type      | Description                          | Constraints               |
| :------------- | :-------- | :----------------------------------- | :------------------------ |
| `level`        | `integer` | *Optional*. Level of the revision    | *Must be between 1 and 5* |

#### Delete a revision on a flashcard

```http
  DELETE /flashcard/:id/review
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `id`      | `string` | **Required**. The id of the reviewed flashcard  |

### Collection

#### Create a new collection

```http
  POST /collection/
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Body          | Type      | Description                                   | Constraints                           |
| :------------ | :-------- | :-------------------------------------------- | :------------------------------------ |
| `title`       | `string`  | **Required**. The title of the collection     | *Must be at most 100 characters long* |
| `description` | `string`  | *Optional*. The description of the collection | *Must be at most 500 characters long* |
| `isPublic`    | `boolean` | *Optional*. If the collection is public       | *False by default*                    |

#### Get a collection by ID (must be either a public collection or a collection that you created)

```http
  GET /collection/:id
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)
![Admin Status Badge](https://img.shields.io/badge/connection%20status-admin-red?style=flat&logo=bitrise)

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `id`      | `string` | **Required**. The id of the collection to retrieve |

#### List the flashcards of a collection  (must be either a public collection or a collection that you created)

```http
  GET /collection/:id/flashcards
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                                                      |
| :-------- | :------- | :------------------------------------------------------------------------------- |
| `id`      | `string` | **Required**. The id of the collection in which the flashcards are retrieved |

#### Update collection informations (must be a collection that you created)

```http
  PUT /collection/:id
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Required**. The id of the collection to update |

| Body          | Type      | Description                                   | Constraints                           |
| :------------ | :-------- | :-------------------------------------------- | :------------------------------------ |
| `title`       | `string`  | **Required**. The title of the collection     | *Must be at most 100 characters long* |
| `description` | `string`  | *Optional*. The description of the collection | *Must be at most 500 characters long* |
| `isPublic`    | `boolean` | *Optional*. If the collection is public       | *False by default*                    |

#### Delete a collection by ID (must be a collection that you created)

```http
  GET /collection/:id
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `id`      | `string` | **Required**. The id of the collection to delete |

#### List all the collections that you own

```http
  GET /collection/my-collections
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

#### Search public collections by their title

```http
  GET /collection/public/:title
```
![Connected Status Badge](https://img.shields.io/badge/connection%20status-connected-blue?style=flat&logo=bitrise)

| Parameter | Type     | Description                      | Constraints                           |
| :-------- | :------- | :------------------------------- | :------------------------------------ |
| `title`   | `string` | **Required**. The title searched | *Must be at most 100 characters long* |

### Administration

#### List all users
![Admin Status Badge](https://img.shields.io/badge/connection%20status-admin-red?style=flat&logo=bitrise)

```http
  GET /admin/users
```

#### Get information about a specified user through their ID
![Admin Status Badge](https://img.shields.io/badge/connection%20status-admin-red?style=flat&logo=bitrise)

```http
  GET /admin/users/:userId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId`  | `string` | **Required**. The user ID  |

#### Delete a user and all their related data
![Admin Status Badge](https://img.shields.io/badge/connection%20status-admin-red?style=flat&logo=bitrise)

```http
  DELETE /admin/users/:userId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId`  | `string` | **Required**. The user ID  |

## Authors
- @[AstatePNG](https://github.com/AstatePNG)
- @[Colin2005H](https://github.com/Colin2005H)
- @[Paul8710](https://github.com/Paul8710)

## Database model

![Entity-relashionship diagram of the database](https://cdn.discordapp.com/attachments/1243257506629685359/1451119074460569600/image.png?ex=695f6173&is=695e0ff3&hm=05c991fb2b62a31c7d797dac6e1b765cb881bc5a2c85076ce3faf6d162cefc0c&)