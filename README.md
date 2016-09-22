# ack-aws-s3-universal
Library to perform AWS S3 in a universal manner between both NodeJs and Web Browsers with focus on with optional KmsParams

A wrapper for aws-sdk, aws-sdk-js, node-s3-encryption-client, and crypto

[DEMO PAGE](https://ackerapple.github.io/ack-aws-s3-universal/)

> GOAL: To provide one package that facilitates both the web and node-server enviroment.

### Table of Contents
- [Installation](#installation)
    - [Short-Hand Installation](#short-hand-installation)
    - [Detailed Installation](#detailed-installation)
        - [Global Install Dependencies](#global-install-dependencies)
        - [GIT Checkout](#git-checkout)
        - [Node Package Manager Install](#node-package-manager-install)
        - [Javascript Package Manager Install](#javascript-package-manager-install)
    - [Launch Browser Test](#launch-browser-test)
    - [Build for Deployment](#build-for-deployment)
- [Documentation](#documentation)

## Installation
### Short-Hand Installation
If you've done this before or just want an installation overview, read the following.

Create a project folder called "ack-aws-s3-universal" and then begin to run commands against it.

> In a command terminal, type the following, one command after another:

```
npm install pug-cli jspm@beta ionic-serve -g

git clone "https://github.com/ackerapple/ack-aws-s3-universal.git"

npm install

jspm install
```

> After running the above, if you encounter any error related to invalid access. Please read the [GIT Checkout](#git-checkout) portion of this guide.


### Detailed Installation
Requires NodeJs to be pre-installed. All install commands are run in a command line terminal.

#### Global Install Dependencies
Some functionality that is depended on, must be installed at the Operating System level.

> In a command terminal, type the following:

```
npm install pug-cli jspm@beta ionic-serve -g
```

#### GIT Checkout
> In a command terminal, type the following:

```
git clone "https://github.com/ackerapple/ack-aws-s3-universal.git"
```

>> Now, private repositories will to be checked out.
>> Authenticated access maybe required.
>> You can set your jspm private repo access to be the same as your github

> In a command terminal, type the following, only if you want github to act as your jspm credentials:

```
jspm registry config github
```


#### Node Package Manager Install
> In a command terminal, type the following:

```
npm install
```

#### Javascript Package Manager Install
> In a command terminal, type the following:

```
jspm install
```

### Launch Browser Test
> In a command terminal, type the following:

```
npm test
```

### Build for Deployment
> In a command terminal, type the following:

```
npm run build
```

## Documentation

### passhash( word )
Transmit password securly using the following functionality
```
import passhash from "ack-aws-s3-universal/passhash"

passhash('user password')
```