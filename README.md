# weather-app

App used to fetch weather created with node. Used with yargs.

Include address flag in terminal and then address when searching for location.

Ex: node app.js -a '804 s meadow st richmond'

Need to create config.js file and add in the following:

module.exports = {
weatherApiKey: 'YOUR_KEY_HERE',
mapQuestApiKey: 'YOUR_KEY_HERE'
};
