# dynamic-menu
A dynamic web application that takes a json file to render unlimited nested menu items. Built on React and Redux, and tested using Jest and Enzyme.

## Installation
Download/pull the repo, then run "npm install" to download all the dependecies. When finish, run "npm run build" to build the dist folder. Alternatively, run "npm watch" to start a development server with the compiled module and listen for changes at: http://localhost:8000/ 
If your 8000 port is in use, change the port in the devServer setting in webpack.config.js and run again.

## Test
Run "npm test" to run the unit tests. If you have the development server running, you can also run "npm run test:watch" in a separate terminal to watch the changes and run the tests when the source code is changed.

## References and notes
* This project is built using a boilerplate: https://github.com/marcnuri-demo/react-webpack-babel-sass-boilerplate/tree/v2.0.0
* For demonstration purpose, only 2 types of form fields were defined so far: text and dropdown. 
* Assum that the json data file will be in the correct format. No json validation is added at this stage.
