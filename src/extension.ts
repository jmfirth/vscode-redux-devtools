'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import RemoteDev from 'remotedev-app';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

//     // Use the console to output diagnostic information (console.log) and errors (console.error)
//     // This line of code will only be executed once when your extension is activated
//     console.log('Congratulations, your extension "vscode-redux-devtools" is now active!');

//     // The command has been defined in the package.json file
//     // The commandId parameter must match the command field in package.json
//     let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
//         // The code you place here will be executed every time your command is executed
//         console.log(vscode.window.activeTextEditor.document);
//         // Display a message box to the user
//         vscode.window.showInformationMessage('Hello World!');
//     });

//     context.subscriptions.push(disposable);
// }

export function activate(context: vscode.ExtensionContext) {

    let initUri = vscode.Uri.parse('redux-devtools://authority/home');

    const provider = {
        provideTextDocumentContent: function(uri) {
            // route: url.path === 'home'
            return `<!DOCTYPE html>
                    <html>
                        <head>
                            <title>Remote Devtools</title>
                            <style>
                                html, body, .root {
                                    width: 100%;
                                    height: 100%;
                                }
                            </style>
                        </head>
                        <body>
                            <div id="root"></div>
                       </body>
                       <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
                       <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
                       <script src="https://unpkg.com/remotedev-app@0.10.7/dist/remotedev-app.min.js"></script>
                       <script>
                         let root = document.getElementById('root');
                         ReactDOM.render(
                             React.createElement(
                                 RemoteDevApp, 
                                 {
                                    socketOptions: {
                                        hostname: 'localhost',
                                        port: 1024,
                                        autoReconnect: true
                                    }
                                 }, 
                                 'Remote Devtools'
                             ),
                             root
                         );
                       </script>
                    </html>`;
        }
    };

    let registration = vscode.workspace.registerTextDocumentContentProvider('redux-devtools', provider);

    let disposable = vscode.commands.registerCommand('extension.reduxDevtools', () => {
        return vscode.commands.executeCommand(
            'vscode.previewHtml', 
            initUri, 
            vscode.ViewColumn.Two
        ).then((success) => {
            console.log('previewing')
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    });
    
    context.subscriptions.push(disposable, registration);
}

// this method is called when your extension is deactivated
export function deactivate() {
}