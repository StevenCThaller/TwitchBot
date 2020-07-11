const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

let rawOpts = fs.readFileSync('opts.json');
const opts = JSON.parse(rawOpts);

app.use(express.static(path.join(__dirname, '/static')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({extended: true}));

const tmi = require('tmi.js');


const onConnectedHandler = (addr, port) => console.log(`* Connected to ${addr}:${port}`)

const onMessageHandler = (target, context, msg, self) => {
    if(self) return;

    const command = msg.trim().toLowerCase();

    if(command === "!deaths"){
        opts.deaths == 1 ? 
        client.say(target, `${opts.user} has died ${opts.deaths} time!`)
        :
        client.say(target, `${opts.user} has died ${opts.deaths} times!`)
    }
    else if(command === "!goal") {
        opts.user[opts.user.length-1] == 's' ?
        client.say(target, `${opts.user}' goal is currently to reach ${opts.goal} followers!`)
        :
        client.say(target, `${opts.user}'s goal is currently to reach ${opts.goal} followers!`);
    }
}

const client = new tmi.client(opts)


app.get('/', (req,res) => {
    res.render('dashboard', { user: opts.user, deaths: opts.deaths, pizzas: opts.pizzas, goal: opts.goal })
})

app.post('/death', (req,res) => {
    opts.deaths++;
    // The extra options in the JSON.stringify save the json file in a formatted manner,
    // rather than one long annoying string
    fs.writeFileSync('opts.json', JSON.stringify(opts, null, 2));
    client.say(opts.channels[0], `AGAIN?! Salt has now died ${opts.deaths} times.`);
    res.redirect('/');
})

app.post('/setdeaths', (req,res) => {
    // I found that if I entered a number into the field,
    // It got saved into json as a string version of the number.
    // So I wrapped the data from req.body in parseInt so it
    // saves into the JSON file as a number.
    opts.deaths = parseInt(req.body['deaths']);
    // The extra options in the JSON.stringify save the json file in a formatted manner,
    // rather than one long annoying string
    fs.writeFileSync('opts.json', JSON.stringify(opts, null, 2));
    client.say(opts.channels[0], `Starting counter at ${opts.deaths} deaths!`);
    res.redirect('/');
})

app.post('/setgoal', (req,res) => {
    // I found that if I entered a number into the field,
    // It got saved into json as a string version of the number.
    // So I wrapped the data from req.body in parseInt so it
    // saves into the JSON file as a number.
    opts.goal = parseInt(req.body['goal']);
    // The extra options in the JSON.stringify save the json file in a formatted manner,
    // rather than one long annoying string
    fs.writeFileSync('opts.json', JSON.stringify(opts, null, 2));
    res.redirect('/');
})

app.listen( 8000, () => {
    console.log("Up and running.");
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);
    client.connect();
});