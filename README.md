# 🎅 SECRET SANTA

## 🎄 Description

This is a simple react page that allows you to create a secret santa event. You can add participants and then the page will randomly assign a secret santa to each participant. Everything is host on github pages and automatically deployed with github actions.

## 🎁 How to use

### 1. Add participants

add the name of the participants in the `participants` const in the `script/shuffle.js` file.

```javascript
const participants = [
  "John Doe",
  "Jane Doe",
  "Santa Claus",
  "Rudolph",
  "Frosty the Snowman",
];
```

### 2. Shuffle

In order to create an pair of participants you need to run the `shuffle` function in the `script/shuffle.js` file.

```bash
# Run the shuffle function locally
node script/shuffle.js
```

### 3. Deploy

The page is hosted on github pages and is automatically deployed with github actions. You can access the page [here](https://<your-github-account>/secret-santa/).
Everytime you push to the `main` branch the page will be automatically deployed.

:warning: **Note**: The page is hosted on the `gh-pages` branch.
:warning: **Note**: You need to run the action `Shuffle` on github at least once after adding participants !

## 🤶 Happy Holidays

Feel free to use this page for your secret santa event.
