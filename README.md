# Survey App



## Setup Environment

### Install Homebrew

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
```

### Install Node

#### Install nvm
Follow directions to install [nvm](https://github.com/creationix/nvm#install-script).

#### Install Node

```
nvm install v4.2.3;
nvm alias default  v4.2.3;
```

### Mysql

#### Install Mysql
```
brew install mysql;
```
#### Start mysql
```
mysql.server start;
```
#### Create mysql user
```
mysql -uroot;
CREATE DATABASE survey;
GRANT ALL ON survey.* TO 'survey-user'@'localhost' IDENTIFIED BY 'password';
exit;
```
### Install Webpack
```
npm install webpack -g;
```
### Install ESLint
```
npm install -g eslint;
```

### Install Dependencies

```
npm install;
```

### Reseed
```
npm run reseed;
```

## Start Build

You have to run both webpack and the node server. Also, make sure mysql is running.

### Node
```
npm run start;
```

### Webpack
```
npm run develop;
```

## Run Server
As long as you have built the project before, you only have to run node and have mysql running.
```
npm run start;
```

## ESLint
We are using airbnb's [styleguide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for our linting.

```
npm run eslint;
```

## Usage

### Admin Users

There are two admin users `admin` and `admin2`. Both have the password `password`.

- Once you have the server running, visit [http://localhost:3000](http://localhost:3000) in your browser
- When you first start the app, you should login as one of the admin
- Once you are logged in, click on "Create A Question"
- Fill in your question, and add some answers
- Click "Create Question"
- Repeat at least a couple times
- Click on "Questions" in the navigation
- Here you can view questions you created
- Click on a question
- Here you can see a list of your answers, along with the number of responses, and the percent of responses each answer receives

### Customers

- Once you have the server running, visit [http://localhost:3000](http://localhost:3000) in your browser
- Click on "Login As Guest"
- If an admin has added a questions, you will see a random question
- Select an answer and click "Submit Answer"
- Click on "Next Question" to answer another
- Repeat until really bored, or until there are no more questions

## Session

Survey app is using [session-file-store](https://github.com/valery-barysok/session-file-store) as a quick way to persist storage. Session-file-store can be quite buggy. If it kills the node server, just restart it!
