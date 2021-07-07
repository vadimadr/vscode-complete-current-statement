// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "complete-statement" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('complete-statement.completeCurrent', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const activeEditor = vscode.window.activeTextEditor!;
		const activeSelection = activeEditor.selection.active;
		const document = activeEditor.document;
		const currentLine = activeSelection.line;

		let currentLineText = document.lineAt(currentLine).text;
		let completed = completeLinePython(currentLineText);
		replaceLineAt(currentLine, completed);
		vscode.commands.executeCommand("editor.action.insertLineAfter");
	});

	context.subscriptions.push(disposable);
}

export function completeLinePython(line: string): string {
	// trim whitespaces at end of line
	line = line.replace(/\s*$/,"");
	if (line.endsWith(",")) {
		line += " ";
	}

	line = closeBrackets(line, "(", ")");
	line = closeBrackets(line, "[", "]");
	line = closeBrackets(line, "{", "}");


	const stmtRegex = /\s*(def|class|if|for|with) .*/m;
	let isStatement = stmtRegex.exec(line) !== null;
	if (isStatement && !line.endsWith(":")) {
		line += ":";
	}
	return line;
}

export function closeBrackets(line: string, openBracket: string, clseBracket: string): string {
	let numOpen = countSubstring(line, openBracket);
	let numClose = countSubstring(line, clseBracket);
	if (numOpen > numClose) {
		return line + clseBracket.repeat(numOpen - numClose);
	}
	return line;
}

export function countSubstring(str: string, sub: string): number {
    return str.split(sub).length - 1
}  

export function replaceLineAt(lineNumber: number, replaceWith: string) {
	const activeEditor = vscode.window.activeTextEditor!;
	const document = activeEditor.document;
	activeEditor.edit(editor => {
		let lineRange = document.lineAt(lineNumber).range;
		editor.replace(lineRange, replaceWith);
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
