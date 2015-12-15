# Survey

# Install Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Install node

# Install mysql
brew update && brew update
brew install mysql

# Start mysql
mysql.server start

# Install Webpack
npm install webpack -g

# Install ESLint
npm install -g eslint

# Configure Mysql
mysql -uroot
CREATE DATABASE survey;
GRANT ALL ON survey.* TO 'survey-user'@'localhost' IDENTIFIED BY 'password';
exit;

# How to login as survey-user
mysql -u survey-user -p
# Enter 'password' as the password


