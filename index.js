const express = require('express');
const app = express();

//use data.users to pull data
const data = require('./data');

app.use('/static', express.static('public'));

//configuring our view layer
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//pulling data into index with key:value. Referencing
//in index with key.
app.get('/', (req, res) => {
  res.render('index', {robots: data});
});

app.get('/profile/:name', (req, res) => {
  let robotName = req.params.name;
  let targetItem;
  data.users.forEach((item) => {
    if (item.name == robotName) {
      targetItem = item;
    }
  });
  res.render('profile', {robot: targetItem});
});


//crank that local server UP. TO THE MAX. POWER OVERWHELMING.
app.listen(3000, () => {
  console.log('Application now running on port 3000');
});
