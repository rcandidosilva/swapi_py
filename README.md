## Project Structure

Node is required for generation and recommended for development. `package.json` is always generated for a better development experience with prettier, commit hooks, scripts and so on.

In the project root, PyHipster generates configuration files for tools like git, prettier, eslint, husk, and others that are well known and you can find references in the web.

`/src/*` structure follows default Python structure.

- `.yo-rc.json` - Yeoman configuration file
  PyHipster configuration is stored in this file at `generator-pyhipster` key.
- `.pyhipster/*.json` - PyHipster entity configuration files
- `requirements.txt` - PyHipster Python module dependencies

## Development

We use npm scripts and [Webpack](https://webpack.js.org/) as our build system for the UI. The backend build system is powered by Poetry.

Run the following command to create a blissful development experience where your browser auto-refreshes when files change in your project.

```bash
$> npm run pyhipster
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

## Testing

PyHipster generates unit and functional test cases for the default user and authority entities at project generation. To run the tests, issue the following command

```bash
$> poetry run pytest
```

## Code Coverage

```bash
$> poetry run task coverage
```

## Static Code Analysis

```bash
$> poetry run task code_quality_scan
```

## Vulnerability Analysis

```bash
$> poetry run task security_scan
```

## Code Formatting (Black)

```bash
$> poetry run task code_formatting
```

For further instructions on how to develop with PyHipster, have a look at the documentation.

[Python](https://www.python.org/)
[Node.js](https://nodejs.org/)
[Npm](https://www.npmjs.com/)
