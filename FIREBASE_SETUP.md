# Firebase Setup for WanderEcho Group Rooms

## Step 1 — Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `wanderecho` → Continue
3. Disable Google Analytics (optional) → **Create project**

## Step 2 — Enable Realtime Database

1. In the sidebar, click **Build → Realtime Database**
2. Click **Create Database**
3. Choose a location (e.g. `us-central1`)
4. Select **Start in test mode** (allows read/write for 30 days — lock it down later)
5. Click **Enable**

## Step 3 — Enable Anonymous Authentication

1. In the sidebar, click **Build → Authentication**
2. Click **Get started**
3. Under **Sign-in providers**, click **Anonymous** → enable it → **Save**

## Step 4 — Get your config keys

1. Click the ⚙️ gear icon → **Project settings**
2. Scroll down to **Your apps** → click the `</>` Web icon
3. Register app (name: `wanderecho-web`)
4. Copy the `firebaseConfig` object values

## Step 5 — Set up your .env file

Copy `.env.example` to `.env` and fill in your values:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 6 — Run the app

```bash
npm run dev
```

The **Rooms** page will now let you create and join live group rooms.

## Database Rules (for production)

Once testing is done, update your Realtime Database rules to:

```json
{
  "rules": {
    "rooms": {
      "$roomCode": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```
