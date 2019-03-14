//entry point of the file reflected in the package.json, calling app.js
const express = require('express');
// grabbing data from the data.json file const data = require('./data.json');
const app = express();
const PORT = 3000;

app.use(express.json());

//configuration of the PostgreSQL connection.
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'bayevents',
    //contraseña --- nel pastel
    port: 5432,
});

// testing get ROUTE
app.get('/bar', (req, res) => {
res.redirect('http://theicecreambarsf.com/')//to redirect to a website
});

/////////////////// GET / PUT / POST / DELETE - ARE ALL HTTP VERBS ///////////////////
//Print the whats happening message on the homepage
app.get('/', async(req, res) => {
    const quePasaCalabaza = await res.send('WELCOME TO MY EVENTONICA PAGE, WE HAVE COFFEE & donuts');
});

//Send a GET request to /events to GET all events / Read a list of events
app.get('/events',  (req, res) => {
   //const events = await getEvents('/events');

    //calling pool ("database bayevents, table events" and Selecting all from events & order by id)
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error){
            console.log(`you have an error!!`);
        }
        res.json(results.rows)
    })
    //res.json(data.events);//a page of functions
});

//Send a GET request to GET a single event by id/ to Read a specific id
app.get('/events/:id', (req, res) => {
    //turns string into a integer
        const id = parseInt(req.params.id)

    //$1 is a numbered placeholder- token - to prevent someone editing your db -
    //which PostgreSQL uses natively instead of the ? placeholder 
        pool.query('SELECT * FROM events WHERE id=$1', [id], (error, results) => {
            res.json(results.rows)
        })
});

// Send a POST request to /newEvent to CREATE a new event
app.post('/events',  (req, response) => {
    //requiring the name from the body, etc. 
    const {name, description, location } = req.body

    pool.query('INSERT INTO events (name, description, location) VALUES ($1, $2, $3) RETURNING id', 
    [name, description, location], (error, result) => {
        if (error) {
            console.log(`you have an error!!`);
          }
          
          response.json({
              ...req.body,
              id: result.rows[0].id,
          })
        })
    }); 

//PUT is to update something you already have in the event system by id
app.put('/events/:id', (req, res) => {
    //turns string into a integer
    const id = parseInt(req.params.id)
    const { name, description, location } = req.body

    pool.query(
        'UPDATE events SET name = $1, description = $2, location = $3 WHERE id = $4',
        [name, description, location, id], //array here, what is happening?
        (error, res) => {
            if (error) {
                console.log(`you have an error!!`);
            }
            res.json(`An event was updated with id: ${id}`)
          }
        )
});

//DELETE data in your system - respond with data updated or simple message
app.delete('/events/:id', (req, res) => {
    //turns string into a integer
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(`you have an error!!`);
          }
          res.json(`User deleted ID: ${id}`)
        })
    //res.send(`a DELETE request with /event route on PORT ${PORT}`);
});

//listening for PORT
app.listen(PORT, () => {
    console.log(`Your server is running on app listening on PORT ${PORT}, have a marshmallow`);
    console.log("It's on"); //will print out data in the terminal waaajajajaja
});





/*

////////////// VERSION ONE -hard coded database from file //////////////////////////////

//entry point of the file reflected in the package.json, calling app.js
const express = require('express');
const data = require('./data.json');

const app = express();
const PORT = 3000;

app.use(express.json());

//Print the whats happening message on the page
app.get('/', async(req, res) => {
    const what = await res.send('WELCOME TO MY EVENTONICA PAGE');
});

// GET / PUT / POST / DELETE - ARE ALL HTTP VERBS


//Send a GET request to /events to Read a list of events
app.get('/events', async (req, res) => {
   //const events = await getEvents('/events');

    res.json(data.events);//a page of functions
});

//Send a GET request to individual /event  by id-  to Read a specific id
app.get('/events/:id', async(req, res) => {
    //specificId to find individual id in data
    var found = data.events.find(function(specificId) {
        return req.params.id === specificId.id;
      });
      res.json(found);
});


// Send a POST request to /newEvent to CREATE a new event
app.post('/events', async (req, res) => {
    //requiring the name from the body, etc. 
    let newEvent = {
        name: req.body.name,
        description: req.body.description, 
        location: req.body.location, 
        id: req.body.id 
    };
    data.events.push(newEvent);
    res.json(data.events);
    
});

//PUT is to update something you already have in the event system by id
app.put('/events/:id', (req, res) => {
     let find = data.events.find(function(specific){
         return req.params.id == specific.id; //
     });
     find.name = req.body.name;
     find.description = req.body.description;
     find.location = req.body.location;
    //res.send(`a PUT request with /event route on PORT ${PORT}`);
    res.json(data.events);
});

//DELETE data in your system - respond with data updated or simple message
app.delete('/events/:id', (req, res) => {
    let find = data.events.find(function(specific){
        return req.params.id == specific.id;
    })
    let itemDeleted = data.events.splice(find, 1);
    res.json(itemDeleted);
    //res.send(`a DELETE request with /event route on PORT ${PORT}`);
});

//listening for PORT
app.listen(PORT, () => {
    console.log(`Your server is running on app listening on PORT ${PORT}`);
    console.log(data); //will print out data in the terminal waaajajajaja
});


/////////////////////////END OF VERSION ONE ////////////////////
















Failed code that did not work!!



    //string now..
    //console.log(req.params.id);
    //variable anEvent will hold the params that were converted into numbers
    //let anEvent = await Number(req.params.id);
  

    //}
    //console.log(anEvent);
    //console.log(data[anEvent]);
    //res.json(data.events[anEvent]);
    //res.json(data[anEvent]);
   // let anEvent = findId(req.params.id){

 /*
    ids = events.filter(function (id){
    data.events.id === id;
    });

});*/




