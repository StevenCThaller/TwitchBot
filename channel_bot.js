const tmi = require('tmi.js');

const opts = {
    identity: {
        // This part is kinda dumb and doesn't actually work, since they switched to oauth tokens rather than plaintext username/password
        username: "RoboSaltimus",
        // Go here to get your token: https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=dve7ifeawf0xeegigqamnvqy9qqm2y&redirect_uri=https%3A%2F%2Fstreamlabs.com%2Fchatbot-auth%3Fservice%3Dtwitch&scope=chat_login+user_read&force_verify=true
        password: "3f1txavp7erqhc2peu8spt3u68ffa1"
    },
    channels: [
        // Just toss any channel names in here. aka username of the person whose stream you want the bot to function on.
        "sir_saltimus"
    ],
    // This is just so I can keep a tally of how many Pizzas bohnny owes me.
    pizzas: 2
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);

client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler(target, context, msg, self) {
    if(self) return;

    const command = msg.trim().toLowerCase();
    // This is literally all it is. right side of the === is the stringed version of whatever command you want to trigger
    if(command === '!pizza'){
        // And whatever you wanna do
        opts.pizzas++;
        // target is gonna be #<whateverchannelnamehere> in case you wanna mess with it for some reason?
        client.say(target, `You're right, Bohnny does owe Salt a Pizza! In fact, he owes Salt ${opts.pizzas} pizzas!`);
    }
    else if(command === '!metoo'){
        client.say(target, "I hearby declare that Bohnny's Me Too statement is false and undermines those who actually suffer from these tragic issues.");
    }
    else if(command === '!litigation'){
        client.say(target, "The attorneys at Golstein Winkler and Holden will see you in court, Bohnny.");
    }
    else if(command === '!lemon'){
        client.say(target, "No u sui_genesis");
    }
    else if(command === '!reeee'){
        client.say(target, "REEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    } else if(command === '!help'){
        client.say(target, "!pizza to see how many Pizzas Bohnny owes Salt.")
    } else if(command === '!george'){
        client.say(target, "LET'S GOOOOOO");
    } else if(command === '!addDeath'){
        Math.random()
        client.say(target, "Good lord you're bad at this game, Max.");
    }

}


// And run it with node <nameofthisfile>.js (or nodemon if you're fancy)
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
