# Meeting Scheduler

## Table of Contents

- [Meeting Scheduler](#meeting-scheduler)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Built With](#built-with)
  - [Features](#features)
  - [Contact](#contact)
  - [Instructions to Run 🏃](#instructions-to-run-)
    - [Machine Preparation](#machine-preparation)
    - [Project Cloning](#project-cloning)
    - [Running Local Version](#running-local-version)
      - [`npm start`](#npm-start)
      - [`npm test`](#npm-test)
      - [`npm run build`](#npm-run-build)
      - [`npm run deploy`](#npm-run-deploy)
      - [`firebase emulators:start`](#firebase-emulatorsstart)

## Overview

This project main goal was to make a multi-user calendar to arrange meetings with clients.

A [live demo](https://seuronao.github.io/meeting-scheduler) is available.

### Built With

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Features

- Internationalization for easy translations to other languages, mainly portuguese.
- Authentication with email or Google identity provider.
- Each _user_ can only access its own _clients_.
- _users_ and _clients_ are stored in _Firebase Firestore_.
- CI/CD pipeline to work with GitHub Pages.

## Contact

You can find me in [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ronan-soares)

## Instructions to Run 🏃

This project was bootstrapped with [Create React App](https://create-react-app.dev/).
Hence, many scripts are the same.

### Machine Preparation

In order to emulate Firebase Backend locally you will need: [OpenJDK](https://openjdk.org/), [Firebase Tools](https://firebase.google.com/docs/emulator-suite), [Node.js](https://nodejs.org/en/).

In _ubuntu_ to install **OpenJDK** do:

```shell
sudo apt update && sudo apt install openjdk-18-jdk -y
```

In _ubuntu_ to install **Node.js**:

```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Then do:

```shell
nvm install node
nvm use node
```

In _ubuntu_ to install **Firebase Tools**:

```shell
npm install -g firebase-tools
```

Then to configure **Firebase Tools**:

```shell
firebase login
```

### Project Cloning

Clone this repository

```shell
git clone https://github.com/SeuRonao/meeting-scheduler.git
```

Install the dependencies

```shell
npm install
```

### Running Local Version

With the above part done you can, from the root directory of the project use the following scripts:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

The app will automatically try to connect to the **Firestore Emulator**

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

**GITHUB Actions already take care of building and deploying the app** on every push/merge to the _main_ branch.
There is no need to use this script unless it is to test locally.

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run deploy`

**GITHUB Actions already take care of building and deploying the app** on every push/merge to the _main_ branch.
There is no need to use this script unless it is to test remotely something.

This builds and deploy the **CURRENT** version of the project to _gh-pages_ branch on GitHub.

#### `firebase emulators:start`

Start the emulators to allow the local app to connect.

If you want persistence between sessions of the emulation you can use

```shell
firebase emulators:start --import=dummy_data --export-on-exit
```
