## Application requirements
> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document
are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

### Original requirements (from Magnus' email)
- [x] The application MUST support multiple lists of tasks
- [x] The user MUST be able to create new lists
- [x] A list MUST consist of `[0..n]` tasks
- [x] The user MUST be able to create a new task
- [x] The user MUST be able to delete a task
- [x] The user MUST be able to mark a task as completed
- [x] Data MUST be persisted across sessions
- [x] The application SHOULD be made using vanilla JS and HTML
- [ ] Pre- and/or post processing of CSS MAY be used
- [x] CSS frameworks MUST NOT be used
- [x] Unit tests SHOULD be a part of the development workflow

### My requirements/specs
A few requirements were not in the original description, and some I just added for the heck of it. They are:

- [x] When adding lists/tasks, the user SHOULD maintain a good flow
- [x] The application SHOULD be developed mobile first
- [ ] The user MUST be able to edit the list name
- [ ] The user MUST be able to edit the task description
- [x] The user SHOULD be able to navigate to a specific list
- [x] The application SHOULD not use any external libraries/modules. Development tools are ok
- [ ] Functional tests SHOULD be used
- [x] Less MUST always be more(ish))

## Developer setup

### Installing
```
$ npm install
```

### Running the application
```
$ npm start
```
The application is exposed at [http://localhost:1337](http://localhost:1337), and it likes it there.

### Testing the application
```
$ npm test
```

### Continuous development/testing
```
$ npm run watch
or
$ npm run watch -- -R min
```

### Building the application (for "production"
```
$ npm build
```

### Deploying the application
This script only works for (git) authorised developers.
It deploys the `public/` folder to Github Pages.
```
$ npm run deploy
```