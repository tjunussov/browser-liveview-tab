'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // TODO: collect all errors and send feedback
  const disposable = vscode.commands.registerCommand('extension.browserliveview', () => {
    vscode.window.showInputBox({
      prompt: 'Enter a site url. Example: http://localhost',
      value: 'http://',
      ignoreFocusOut: true,
      placeHolder: 'Site url',
      validateInput: (value: string): string => {
        // TODO: need validate
        return '';
      }
    }).then(url => {
      if (url) {
        const panel = vscode.window.createWebviewPanel(
          'Browser LiveView',
          'Browser LiveView',
          vscode.ViewColumn.One,
          {}
        );
        panel.webview.html = getWebviewContent(url);
      } else {
        vscode.window.showInformationMessage('The url can be specified! Do nothing');
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
}

/**
 * Get web content by URL
 */
function getWebviewContent(url: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL</title>
</head>
<body>
    <iframe src="${url}" style="width: 100%; height: 100%; min-height: 0px; border-width: 0px; overflow: auto;"/>
</body>
</html>`;
}
