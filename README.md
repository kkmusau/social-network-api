# Social Network API :left_speech_bubble:
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description :pencil:
This is an API for social network application where users can share their thought, react to friends' thoughts, 
and create a friend list. This application uses [Express.js](https://www.npmjs.com/package/express) for routing, a `MongoDB` database, the [Mongoose](https://www.npmjs.com/package/mongoose) ODM and `Moment.js` for the Date. The seed data is created using `Insomnia`.

## Demo :desktop_computer:

[![Demo](https://cdn.loom.com/sessions/thumbnails/14e8b2dae05a48208b67e031b97fa70a-with-play.gif)]https://www.loom.com/share/14e8b2dae05a48208b67e031b97fa70a)

![insomnia](https://user-images.githubusercontent.com/101844445/184450430-5b607963-8766-44e2-a786-3b2f584ba3fd.JPG)

![socialMediaapiInsomnia](https://user-images.githubusercontent.com/101844445/184450254-ffbff4c6-ae2f-4780-b811-5e521fafdfc3.JPG)


## Table of Contents :open_book:
- [Description](#description-pencil)
- [Demo](#demo-desktop_computer)
- [Installation](#installation-electricplug)
- [Usage](#usage-gear)
- [License](#license-copyright)
- [Tests](#tests-heavy_check_mark)
- [Questions](#questions-question)

## Installation :electric_plug:
* Clone the repository to use on local machine
* `Node.Js` and `MongoDB` are required for this application to work
* NPM installation for all the dependencies required


## Usage :gear:

After installing, run `npm start` and start to create seed data using Insomnia.

## License :copyright:
MIT License

Copyright (c) 2022 Kaluki Musau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Tests :heavy_check_mark:
In Insomnia, for the following API routes,

**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value



## Questions :question:
:octocat: Find me on Github: [kkmusau](https://github.com/kkmusau)
:e-mail: Email me any questions at: kkmusau@gmail.com


