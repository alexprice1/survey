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
