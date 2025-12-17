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

Config the JWT_SECRET env variable (you can use [JWT Secret Key Generator](https://jwtsecrets.com/) for example)

Start the server

```bash
  npm run start
```


## API Reference

#### Template

```http
  GET /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `example` | `string` | **Required**. Your example |

#### Create a new account

```http
  GET /auth/login
```

| Body        | Type     | Description                          | Constraints                                                         |
| :---------- | :------- | :----------------------------------- | :------------------------------------------------------------------ |
| `firstName` | `string` | **Required**. First name of the user | *Must be at most 31 characters long*                                |
| `lastName`  | `string` | **Required**. Last name of the user  | *Must be at most 63 characters long*                                |
| `email`     | `string` | **Required**. email of the user      | *Must be a valid email adress format*                               |
| `password`  | `string` | **Required**. password of the user   | *Must be at least 8 characters long and at most 63 characters long* |
| `role`      | `string` | *Optionnal*. Role of the user        | *Must be either ADMIN or USER. Will be USER if not provided*        |

## Authors
- @[AstatePNG](https://github.com/AstatePNG)
- @[Colin2005H](https://github.com/Colin2005H)
- @[Paul8710](https://github.com/Paul8710)