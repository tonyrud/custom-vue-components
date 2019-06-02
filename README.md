# Shareable Custom Components

Using Lerna, Storybook, and Vue to create a monorepo that allows different directories to be published as individual packages.

Create a directory in `components`, and add a `package.json` like below:

```json
{
  "name": "@tonyrud/<component-name>",
  "version": "0.0.0",
  "publishConfig": {
    "access": "public"
  }
}
```

Make changes and publish the version you would like

```js
npm run publish
```
