// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64", 
const APP_DIR = path.resolve(__dirname, './build/coiliiot_config_app-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './build/windows_installer');

const ICON_PATH = path.resolve(__dirname, './icon.ico');
const BGI = path.resolve(__dirname, './test.jpg');
// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'coiliiot_config_app',
    exe: 'coiliiot_config_app',
    name: 'coiliiot_config_app',
    manufacturer: 'coiliiot',
    version: '1.0.0',
    language: 0x0804,
    // Configure installer User Interface
    icon: ICON_PATH,
    ui: {
        chooseDirectory: true,
        images: {
            background: BGI,
            exclamationIcon: BGI,
            infoIcon: BGI,
            upIcon: BGI,
            newIcon: BGI,
        },
    },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){

    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});