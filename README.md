# Word Trainer Plus

Application allows you to store foreign words and expressions, and also it helps to remember them by doing excercises.

## Setup and run

### Installation
First install [node.js](http://nodejs.org/) and [mongodb](https://www.mongodb.org/downloads). Then:
```sh
npm install
```
### Running in production mode
```sh
npm run start
```
then open [http://localhost:3000/](http://localhost:3000/) in your browser

### Running in development mode
(mostly to allow hot-reloading of React components)
```sh
npm run start:dev
```

### Rebuilding production files
```sh
npm run build
```

## Technologies

React for the view layer
Bootstrap (with react-bootstrap) for front-end
PassportJS for authentication (using a Local Strategy)
Redux to handle our state
React Router for routing client-side
Node.js with Express for handling server requests (REST and page requests)
MongoDB for our database, with Mongoose handling our schema
Webpack to bundle our client-side code (hot reloading using webpack-dev-middleware and webpack-hot-middleware)
Heroku as hosting service
Git as VCS
