// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require("path");
const os=require('os');

function capitalizeLettersBeforeFirstColon(string) {
	let temp=string.toUpperCase();
	let i=0;
    for(i=0;i<string.length;i++){
		console.log(temp);
		if(string[i]==':'){
			break;
		}
	}
	console.log(string);

	return temp.slice(0,i)+string.slice(i);
}

function convertFilePathToWindowsFormat(filepath){
	let temp="";
		for(let i=0;i<filepath.length;i++){
			if(filepath[i]=='\\'){
				temp+="//";
			}
			else{
				temp+=filepath[i];
			}
		}
		console.log(temp);

		return capitalizeLettersBeforeFirstColon(temp);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "testng-testsuite-runner" is now active!');
	console.log(os.platform());
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('testng-testsuite-runner.runtestngtestsuite', function () {

		// The code you place here will be executed every time your command is executed
		var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
   		var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
		if(os.platform()==="win32"){
			currentlyOpenTabfilePath=convertFilePathToWindowsFormat(currentlyOpenTabfilePath);
			if(vscode.window.activeTerminal==undefined){
				const terminal = vscode.window.createTerminal();
				terminal.sendText(`mvn clean && mvn test -Dname=value -Dsurefire.suiteXmlFiles=${currentlyOpenTabfilePath} -f pom.xml || mvn test -Dname=value -Dsurefire.suiteXmlFiles=${currentlyOpenTabfilePath} -f pom.xml || mvn test -Dname=value -Dsurefire.suiteXmlFiles=${currentlyOpenTabfilePath} -f pom.xml`);
			}
			else{
				const terminal=vscode.window.activeTerminal
				terminal.sendText(`mvn clean && mvn test -Dname=value -Dsurefire.suiteXmlFiles=${currentlyOpenTabfilePath} -f pom.xml || mvn test -Dname=value -Dsurefire.suiteXmlFiles=${currentlyOpenTabfilePath} -f pom.xml || mvn test -Dname=value -Dsurefire.suiteXmlFiles=${currentlyOpenTabfilePath} -f pom.xml`);
			}
			vscode.window.showInformationMessage('Running TestNg TestSuite for file '+currentlyOpenTabfilePath);
		}
		else if(process.platform==="darwin"){
			vscode.window.showInformationMessage('Support for Mac OS still pending development');
		}
		else if(process.platform==='linux'){
			vscode.window.showInformationMessage('Support for Linux OS still pending development');
		}
		// Display a message box to the user
		
	});

	

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
