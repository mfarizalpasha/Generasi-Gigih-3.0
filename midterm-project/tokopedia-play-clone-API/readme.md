# Tokopedia Play Clone API

## i. Database Structure

The database structure of the Tokopedia Play Clone API consists of one main collections: `videos` , and two related collection: `comments` and `products`.

### Video Collection

The `videos` collection stores information about videos available in the application. Each document in the collection has the following fields:

- `_id`: The unique identifier for the video.
- `videoID`: A unique identifier for the video (custom-generated).
- `thumbnailUrl`: The URL of the video's thumbnail.

### Product Collection

The `products` collection stores information about products related to videos. Each document in the collection has the following fields:

- `_id`: The unique identifier for the product.
- `productID`: A unique identifier for the product (custom-generated).
- `linkProduct`: The URL of the product's page.
- `title`: The title of the product.
- `price`: The price of the product.
- `videoID`: A reference to the video that the product is related to.

### Comment Collection

The `comments` collection stores comments for videos. Each document in the collection has the following fields:

- `_id`: The unique identifier for the comment.
- `username`: The username of the commenter.
- `comment`: The content of the comment.
- `timestamp`: The timestamp of when the comment was created.
- `videoID`: A reference to the video that the comment is related to.

## ii. API Structure

#### API Structure

##### 1. controllers/: Contains separate controller files for handling the business logic of each API endpoint. There are separate controllers for comment, product, and video. Each controller is responsible for processing incoming requests, performing necessary operations, and preparing the response data.

##### 2. models/: Includes Mongoose model files for each MongoDB collection. There are separate models for comment, product, and video. Each model represents a schema and structure for the corresponding collection. Having separate models ensures that the data is stored in a structured manner in the database.

##### 3. routes/: Consists of route files that define the API endpoints and link them to the corresponding controller functions. There are separate route files for comment, product, and video. The separation of routes allows for a modular and organized approach to manage different endpoints.

##### 4. utils/: Contains utility files, including db.js, responsible for handling the database connection setup. The utility folder allows you to manage commonly used functions and code snippets throughout the application.

##### 5. app.js: The main application file where the Express application is set up, middleware is configured, and the base URL for APIs is defined. It acts as the central configuration file for the API and ties together all the components.

##### 6. package.json: Standard Node.js package configuration file that includes dependencies, scripts, and project details. It helps manage the project and its dependencies.

##### 7. .env: Environment file for storing sensitive information like the database connection URI. Using an environment file allows you to keep sensitive information secure and separate from the codebase.

##### 8. config.js: It is a way to manage environment-specific variables, API keys, database connection URIs, and other configuration options in a centralized manner.

## iii. List API request and response

Gist link: [API Request and Response](https://gist.github.com/mfarizalpasha/46f488af9aa27988803ae3decf917c48)

## iv. How to run in local

To run the Tokopedia Play Clone API on your local machine, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Make sure you have MongoDB installed and running locally on the default port (27017).
4. Create a `.env` file at the root of the project and add your MongoDB connection URI:
   DB_URI=mongodb+srv://mfarizalpasha:gomuno52431@cluster0.fuexwnx.mongodb.net/tokopedia-play-clone-app

5. Start the API server by running `npm run dev`.
6. The API will now be available at `http://localhost:3000`.
