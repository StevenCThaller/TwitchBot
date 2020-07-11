# TwitchBot
Twitch Chatbot with a user dashboard.
<h2>Setup</h2>
<p>Basically, all you need to do for super basic use is to change the opts.json.</p>

<pre>
<code>
{
  "user": "",
  "identity": {
    "username": "",
    "password": ""
  },
  "channels": [
    ""
  ],
  "deaths": 0,
  "goal": 50,
  "connection": {},
  "options": {}
}
</code>
</pre>
<h3>What to change</h3>
<ul>
  <li>"user" is the username you want to appear on the dashboard, as well as in some of the chatbot replies.</li>
  <li>"username" in the "identity" portion does not appear to do anything? I've left it in out of sheer laziness.</li>
  <li>"password" needs to be changed to an oauth token from twitch. <a href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=dve7ifeawf0xeegigqamnvqy9qqm2y&redirect_uri=https%3A%2F%2Fstreamlabs.com%2Fchatbot-auth%3Fservice%3Dtwitch&scope=chat_login+user_read&force_verify=true">Follow this link</a> to access the token, and remove the "oauth:" portion before inputting it into the JSON file.</li>
  <li>In the "channels" array, put whichever channels you'd like your chatbot to work on. The channel name is whatever appears after https://twitch.tv/</li>
  <li>"deaths" and "goals" are just some sample things I came up with for this bot. You may add whatever you'd like as long as you can figure out the commands (shouldn't be difficult)</li>
</ul>
<br>
<h2>Dependencies</h2>
<p>This application was built with node and express primarily, so make sure you have node.js installed on your computer</p>
<p>All of them are covered in the package.json and package-lock.json, but the packages I used for this project:</p>
<ul>
  <li>fs - for reading from and writing to our json. Makes it so we can keep track of things between running the app.</li>
  <li>express - this is technically a web application, even though I'm really only building it to be run locally. This is needed for our routing and whatnot.</li>
  <li>ejs - this is our view engine, so we can use html (technically ejs) pages for the dashboard.</li>
  <li>tmi - this is how we actually interact with twitch. This is arguably the most important part.</li>
  <li>path - I was running into issues with linking the ejs files. This solved that.</li>
</ul>
<h3>To get it all running</h3>
<p>Run <code>npm install</code> to install all dependencies, and then <code>node server.js</code></p>
<p>In your browser, simply go to "localhost:8000" and you'll have access to the dashboard.</p>
