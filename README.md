## Trollo, an original todo app

The typical todo app, but with trello features. Never done before!

Now seriously talking (or writing), i plan to do a trello clone with a
similar architecture that was used on the real Trello, but instead of backbone.js
i plan to use next.js, instead of CoffeeScript i will use TypeScript and i
want to throw kubernetes to the mix, for load balancing and server scalation. 

Even when there's a lot of things that i have to come up with, because the
architecture isn't explicitly described.

There is also like two articles of trello's blog talking a little about their
tech stack, their reasoning when building the app and problems they had to
solve before. I will base my project in their knowledge but i would like to
change some things to test them.

Here are the links to the blogs:

* [The Trello Tech Stack](https://blog.trello.com/the-trello-tech-stack)
* [The Trello Tech Stack 2016](https://blog.trello.com/the-trello-tech-stack)
* [Why We Chose Kafka For The Trello Socket Architecture](https://tech.trello.com/why-we-chose-kafka/) (I haven't read this yet, but i will)

## Features

In this section you will find the features that are already on production.

- Columns with lists of todos.
- Add, edit and delete columns.
- Add, edit and delete todos.
- Persistent redux state.

## TODO

- Login system
- Sub tasks inside todos
- Animations for buttons

There is a lot of features that i haven't considered yet, but i have to start
with the basics.
