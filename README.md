#Node Semi-Static

This is a "semi-static" (since it produces JSON instead of HTML) site generator written in Node and Angular.

###Disclaimer

This is still very much a work in progress. I would highly recommend against ever using this anywhere in production.

###How it works

Run ```gulp``` to start ```server.js```. Write posts using Markdown in ```./posts/```.  Write metadata (e.g., title, etc.) in your Markdown using YAML front-matter similar to Jekyll (h/t [meta-marked](https://github.com/j201/meta-marked/).

[Highlight.js](https://github.com/isagalaev/highlight.js) is run on the server-side to parse any code samples in your Markdown.

The server will watch for new posts and convert them into JSON.  Angular will then parse the metadata and the HTML on the client-side.

###Example

At the command line, simply run ```npm install && gulp```

In posts create a new Markdown file at ```./posts/```, e.g.,

    ---
    title: My new post
    ---

    #My new post

    This is my new post. Here is a code sample:

        var a;

        a = function(str) {
          console.log(str);
        };

        a("Hello, world!");

If the post is successfully compiled you should get a confirmation message in the command line.

Check in your browser at ```http://localhost:3000/```

###Demo

A live [demonstration is available](https://salty-gorge-5722.herokuapp.com/) on Heroku.