# complete-statement README

Enables "Complete Current Statement" aciton from Idea/PyCharm/... in VsCode!

It finishes statement on the current line (i.e. adds missing brackets or colons) and moves cursors to the next line

Work in progress: **Currently works only with Python**

## Extension Settings

Define keybinding for `completeCurrent` action in `keybindings.json` file:
```json
  {
    "key": "cmd+enter",
    "command": "complete-statement.completeCurrent",
    "when": "editorTextFocus && !editorReadonly"
  }
```