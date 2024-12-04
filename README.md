# 🎅 SECRET SANTA

Welcome to **Secret Santa**: a simple **React app** that lets you organize a Secret Santa event. Add participants, and the app will randomly assign a Secret Santa to each person! 🎁

The page is hosted on your **GitHub Pages** and **automatically deployed** using **GitHub Actions**. Modern-day Christmas magic! ✨

## 🎄 Install
To get started, install the dependencies by running:

```javascript
npm install
```

## 🎁 How to use

### 1. Add participants

Open the `script/shuffle.js` file and add the participants' names to the `participants` constant.

Example:
```javascript
const participants = [
  "John Doe",
  "Jane Doe",
  "Santa Claus",
  "Rudolph",
  "Frosty the Snowman",
];
```

### 2. Shuffle the Participants (Where the christmas Magic happen! ✨)

Once the participants are added, you need to run the shuffle() function to mix up the names and assign a Secret Santa to each person.

There is 2 possibilities:

#### - **Locally**
```bash
# Run the shuffle function locally
npm run shuffle

# in the terminal you will have the result of participant/password:
🫥 John Doe 
🔐 gift2024 

🫥 Jane Doe 
🔐 christmas2024 

🫥 Santa Claus 
🔐 snowman2024 

🫥 Rudolph 
🔐 noel2024 

🫥 Frosty the Snowman 
🔐 snow2024 
```

#### - Or online **via GitHub Actions**
If you prefer to run the shuffle on the live website, here’s how to do it:

1. Go to **Actions** tabs:

![image](https://github.com/user-attachments/assets/fe0f574a-b844-473b-a234-4ad02b3df55a)

2. Choose the **🔀 Shuffle** workflow

![image](https://github.com/user-attachments/assets/5b124886-ba1e-434f-9d58-c9b6441200e8)

3. Run the workflow by clicking on **Run Workflow**

![image](https://github.com/user-attachments/assets/adae1b67-1f79-4a3a-8383-52d98c348f8e)

4. After the workflow finishes, check the **logs** to see the participant/password pairs:

![image](https://github.com/user-attachments/assets/26e5ddde-15c1-4f48-86ca-a001f3343dc8)
![image](https://github.com/user-attachments/assets/11667541-ea9a-47f7-a856-f65956482fa5)



### 3. Deploy

The page is hosted on your github pages and is automatically deployed with github actions. You can access the page here: *https://<your-github-account>/secret-santa/*
Everytime you push to the `main` branch the page will be automatically deployed.

:warning: **Important Note**: Everytime you add a participant, you need to run the script Shuffle locally OR via the workflow in order to integrate the new one.

## 🤶 Happy Holidays

You're all set to host your Secret Santa event! 🎉🎅

Feel free to fork and use this repo for your secret santa event and do not hesitate to PR ! 🎄🎁
