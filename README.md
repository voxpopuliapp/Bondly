# Bondly (Expo SDK 54)

This project is pinned to **Expo SDK 54** and is intended to run in **Expo Go SDK 54**.

## Start

```bash
npm install
npx expo start -c
```

If you previously ran this project on SDK 53, clear old artifacts first:

```bash
rm -rf node_modules .expo
npm install
npx expo start -c
```

## Verify SDK version

```bash
node -e "console.log(require('./package.json').dependencies.expo)"
```

Expected output should be in the `~54.x.x` range.
