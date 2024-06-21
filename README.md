## Async RaceFun Chat 🚗

**Task Objectives**

- Familiarize yourself with the WebSocket connection protocol.
- Gain experience working with a connection where both the client and server applications can initiate sending messages.
- Refine and solidify your skills in asynchronous coding.
- Enhance and consolidate your skills in working with the Document Object Model (DOM) and creating markup using code.

## Key Features:

- User Authentication Page
- Main Page
  - User List
  - User Dialogue
  - Messages include the time of sending, sender's username, message delivery status, message text, and indication of whether the message has been edited. A user can edit or remove his message.
- About Page

## Technology stack

- Language: [**TypeScript**](https://www.typescriptlang.org/)
- Builder: [**Vite**](https://vitejs.dev/)
- Linters: [**ESLint**](https://eslint.org/), [**Prettier**](https://prettier.io/)
- Pre-push/Pre-commit: [**Husky**](https://typicode.github.io/husky/)

## Setup and Running Server Application for the Chat. API

**To test the app functionality, please clone [server application](https://github.com/rolling-scopes-school/fun-chat-server/tree/main) and keep the server running during functionality review.**

To use the chat server application follow these steps:

- clone the repository
- install the dependencies with npm i
- create the .env file and specify the port settings and server event log settings in it
- start the local server using npm run start
- The server runs on port 4000 and listens for messages from client applications.

In the .env.example file, you can find an example of basic parameter settings for the .env file.

To apply the modified parameters, you will need to restart the server.

Setting the Listening Port Parameters
In the created .env file, set the SERVER_PORT parameter to 4000.

If it is not possible to run the server using port 4000, you can use another port.

## [Deploy Link](https://rolling-scopes-school.github.io/tetiana-ket-JSFE2023Q4/async-race/index.html#garage)

