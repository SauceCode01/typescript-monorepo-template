# STEP 1

mkdir express-ts-app
cd express-ts-app
npm init -y

# STEP 2: INSTALL DEPENDENCIES

npm install express
npm install -D typescript tsx @types/express @types/node

# STEP 3: CREATE TSCONFIG

npx tsc --init

# STEP 4: USE THIS CONFIG

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node"],
    "sourceMap": true
  },
  "include": ["src"]
}
```

# STEP 5: UPDATE PACKAGE.JSON

```
 {
    ...,
    "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  ...,
 }
```

## PROJECT STRUCTURE

```
express-ts-app/
├─ src/
│  ├─ index.ts
│  ├─ routes/
│  │   └─ hello.ts
├─ package.json
├─ tsconfig.json
```

# STEP 6: RUN DEV

npm run dev




# CLIENT SETUP 

npx create-next-app@latest