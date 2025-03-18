# Snipman CLI

https://www.npmjs.com/package/snipman

Snipman is a simple command-line tool for managing code snippets efficiently. It allows users to store, retrieve, and manage snippets in an organized way using folders and names.

## Features

### 1. Greeting Commands

#### `greet`

Prints a stylized greeting message.

```sh
snipman greet
```

#### `ask`

Prompts the user for their name and greets them personally.

```sh
snipman ask
```

### 2. Snippet Management

#### `add`

Prompts the user to input a snippet, including its folder, name, and code, and then saves it.

```sh
snipman add
```

#### `ls`

Lists all stored snippets. Supports filtering by folder and snippet name.

```sh
snipman ls
snipman ls -f folder_name
snipman ls -n snippet_name
```

#### `rm`

Removes snippets. Supports removing all snippets, a specific folder, or a specific snippet.

```sh
snipman rm -a         # Delete all snippets
snipman rm -f folder  # Delete a specific folder
snipman rm -n name    # Delete a specific snippet
```

## Usage

Run `snipman --help` to see available commands.

```sh
snipman --help
```
