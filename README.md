# Flashcards-API

This project provide a functionnal API to create flashcards for revision with users profile.

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

## Deployment

To deploy this project run

```bash
  npm run dev
```

## API Reference

### Account

#### Create a new account

```http
  GET /auth/register
```

| Body        | Type     | Description                          | Constraints                                                         |
| :---------- | :------- | :----------------------------------- | :------------------------------------------------------------------ |
| `firstName` | `string` | **Required**. First name of the user | *Must be at most 31 characters long*                                |
| `lastName`  | `string` | **Required**. Last name of the user  | *Must be at most 63 characters long*                                |
| `email`     | `string` | **Required**. email of the user      | *Must be a valid email adress format*                               |
| `password`  | `string` | **Required**. password of the user   | *Must be at least 8 characters long and at most 63 characters long* |
| `role`      | `string` | *Optionnal*. Role of the user        | *Must be either ADMIN or USER. Will be USER if not provided*        |

#### Login an existing account

```http
  GET /auth/login
```

| Body        | Type     | Description                          | Constraints                                                         |
| :---------- | :------- | :----------------------------------- | :------------------------------------------------------------------ |
| `email`     | `string` | **Required**. email of the user      | *Must be a valid email adress format*                               |
| `password`  | `string` | **Required**. password of the user   | *Must be at least 8 characters long and at most 63 characters long* |

### Flashcard



### Collection

#### Template

```http
  GET /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `example` | `string` | **Required**. Your example |

## Authors
- @[AstatePNG](https://github.com/AstatePNG)
- @[Colin2005H](https://github.com/Colin2005H)
- @[Paul8710](https://github.com/Paul8710)

## Database model

![Entity-relashionship diagram of the database](https://media.discordapp.net/attachments/1243257506629685359/1451119074460569600/image.png?ex=69450373&is=6943b1f3&hm=c9e753b44b7a966a6589bc460d1c0c8b8d30aea4633d27fa0296fa66b39d0df2&=&format=webp&quality=lossless)