# LAB - 02

## api - server

### Author : Hayden Cleaver

- [tests report](https://github.com/HaydenCleaver/server-deployment-practice/actions)

- [Heroku Link](https://hc-api-server.herokuapp.com/)

#### `.env` requirements

- `DATABASE_URL` for heroku deployment

#### Running the App

- Open Heroku link.
- Endpoints:
  - `\animals`
    - returns all animals stored in database
  - `\animals\:id`
    - returns one animal based upon id number
  - `\instruments`
  - `\instruments\:id`

  - 'Instruments' paths follow same conventions as 'animals' paths.

#### Tests

- Unit Tests: `npm run test`
