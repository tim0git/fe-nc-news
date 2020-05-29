## FE-NC-NEWS

Reddit web app written for frontend block review May 2020.

[Deployed Version](https://nc-news-link.netlify.app/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

**Prerequisites**

- GitHub Account
- [VS Code](https://code.visualstudio.com/) - Free. Built on open source. Runs everywhere.
- [NODE](https://nodejs.org/en/) - JavaScript runtime built on [Chrome’s V8 JavaScript engine](https://v8.dev/) .
- Netlify Account (hosted example)
- [Back End repository](https://github.com/tim0git/news-project-nc).

### instructions \*\*

- Open your code editor and cd . Into a directory that you wish to clone the project into `$ cd <directorypath>`.

- If you wish to have a new directory for this project
  `$ mkdir <filename>`.

- open a web browser and goto [GitHub - tim0git/news-project-nc: Portfolio Piece NC News](https://github.com/tim0git/fe-nc-news).

- Click on clone or download and copy the url.
  [GitHub - tim0git/news-project-nc: Portfolio Piece NC News](https://github.com/tim0git/fe-nc-news.git)

- open the console and run the command.
  `$ git clone https://github.com/tim0git/fe-nc-news.git`

To download the required node modules `run npm install` from the terminal.

To start the application locally `run npm start` in the terminal.

The application will be available on localhost:3000.

## Running scripts

**the following scripts have been provided to aide in test, dev and deployment** _step by step instructions below_

```
  "scripts":{
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

# Deploying Your NC News Front End with Netlify

## Making your own repository

If you haven’t already, you will need to make a public repo on GitHub so that a link to it can be shared on your C.V.

1. From the GitHub homepage, click the “New repository” button.
2. Give your new repo a name.
3. Make sure you **don’t** create a new `README.md` or `.gitignore` as this will conflict with your own.
4. Change the `remote` of your current project `git remote set-url origin https://github.com/your-username/your-repo-name.git`.
5. `git push origin master`.

## Redirects

Add a file, `_redirects` (no file extension) to your `public` directory.
This file should contain the redirect rule: `/* /index.html 200`.
This is telling Netlify “if a request comes in to _any_ endpoint on our base url - serve our index.html page and give a 200 status”.
We put this in the `public` directory to ensure that Webpack includes this file in the production build of the app.

## Create a Build Version

`npm run build`

This script uses Webpack and Babel to “bundle” your code into a few uglified files that can be read by most modern browsers.
Take a look inside - but don’t change anything.

## Create a Netlify Account

## Install Netfify’s CLI

`npm install netlify-cli -g`

## Deploy to a Draft URL

```bash
cd ./build
netlify deploy
```

- Authorise Netlify with GitHub, following the prompts in the browser.
- Select `Create & configure a new site`.
- Provide your choice of site name.
- Select your personal account.
- Provide a deploy path. This needs to point to your build directory and should be `.` (as we’re already in the build directory).

Your draft version should now be deployed on a url, e.g. `https://5c13ab16055b9be1725868e6--your-site-name.netlify.com`.
Test it out, make sure that everything is working as expected.

## Deploy a Production Version

`netlify deploy --prod`
Specify your build path again.
This will deploy the site to your actual url: `https://your-site-name.netlify.com`.

## Redeployment

1. Create an updated build version of your code:

```bash
npm run build
```

2. Deploy to a draft url:

```bash
cd ./build
netlify deploy
```

3. Deploy to your production url:

```bash
netlify deploy --prod
```

### Built With

- [NODE](https://nodejs.org/en/) - JavaScript runtime built on [Chrome’s V8 JavaScript engine](https://v8.dev/).
- [AXIOS](https://github.com/axios/axios/blob/master/README.md) - Promise based HTTP client for the browser and node.js.
- [moment](https://momentjs.com/) - arse, validate, manipulate, and display dates and times in JavaScript.
- [REACT](https://reactjs.org/) - A JavaScript library for building user interfaces.

### Contributing

Please read [CONTRIBUTING.md](https://github.com/tim0git/news-project-nc/graphs/contributors) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [GitHub](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags) .

### Authors

- **Timothy Doolan** - _Initial work_ - [tim0git](https://github.com/PurpleBooth)
  See also the list of [contributors](https://github.com/tim0git/news-project-nc/graphs/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/tim0git/news-project-nc/blob/master/LICENSE) file for details.

### Acknowledgments

- Inspiration - [reddit: the front page of the internet](https://www.reddit.com/)
- Northcoders - [Northcoders | The Coding Bootcamp For The North](https://northcoders.com/)
