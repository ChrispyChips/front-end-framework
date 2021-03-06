# front-end-framework
Front end framework that builds using SASS / Bootstrap / ES6 and gives a dist folder with static compressed files

# Commands
**npm run watch**

This command takes assets from app/assets and compiles them into a temp folder. Decompiling SCSS and ES6 syntaxes. Instantiates and runs browsersynch, you will see the localhost open on your default browser.

**npm run buildDist**
* npm run buildDist (Builds project files into dist folder)
* npm run buildDocs (Builds project files into docs folder)

**npm run previewDist**
* Preview distribution folder, even if 'dist' is 'docs' this will work

**gulp styles**
* Might be necessary on first compile but when temp folders created shouldnt be necessary again.

**gulp scripts**
* Might be necessary on first compile but when temp folders created shouldnt be necessary again.

# Folder structures
#### Images
* add images to assets/images and reference them in files likewise
* ie: href="assets/images/favicon.png"

#### scss
* Recommended to make use of "modules" folders within assets/scripts as well as in assets/styles then import them to the relevant base file. 
* assets/styles/modules/navigation.scss (some styles in here)
* assets/styles/styles.scss ( @import 'modules/navigation'; )

#### JS
* make use of modules
* create new file in /app/assets/scripts/modules
* navigate to /app/assets/scripts/App.js and include it as follows: 
* require('./modules/test.js');

# Get started quick
**Navigate to project folder and run the following command**
* npm install (wait for it to finish)
* npm run watch (After seeing this open your localhost browser end the session with CTRL + C in terminal)

**Once local development is complete go ahead and run build tasks**
* npm run buildDocs / npm run buildDist
* npm run previewDist !(not previewDocs)!
* upload dist or docs folder to your server of choice
