# A (unofficial) CLI for Azure Functions Containers

## What

This CLI supports you in scaffolding the files necessary to create Azure Functions in containers. The CLI enables you to create the following files:

- `Dockerfile`
- `.dockerignore`

including several options that control the behavior of the containerized Azure Functions.

## Why

The [Azure Function Core Tools](https://github.com/Azure/azure-functions-core-tools) comprise a CLI that also creates some [basic versions](https://github.com/Azure/azure-functions-core-tools#getting-started-on-kubernetes) of the `Dockerfile` and `.dockerignore`. However, the templates are static and only reflect your runtime e.g. nodeJS. This serves as a starting point, but in most cases manual adoptions need to be made.

This CLI shall close this gap and make the experience more convenient by offering more options for the creation process.

## Installation

Install the latest version via

```shell
npm install -g @lechnerc77/create-funcdocker-cli
```

## Usage

The easiest way to start the CLI is to start the command.

```shell
create-funcdocker
```

This will guide you through some questions and based on your answers create the files needed to containerize your Azure Functions.

You can also feed-in the parameters directly into the CLI. The following parameters are available:

```shell
--help                |   -h:  Help for create-funcdocker CLI
--manually            |   -m:  Do not collect information from Azure FUnctions project 
--language            | --la:  Language used for the Azure Functions
--lversion            | --lv:  Version of the language e.g. 16 for nodeJS
--funccoreversion     | --fv:  Version of the Azure Function Runtime (3 or 4)
--dockerbaseimage     | --di:  Name of the Docker base image that shall be used 
--disablefunchomepage | --dh:  Disable the Azure Functions homepage
--defaultport         | --dp:  Override the exposed default port of your Azure Function
--addmakefile         | --am:  add a Makefile
--dockerid            | --id:  ID of your Docker account
--appname             | --an:  name of your application 
--appversion          | --av:  version of your application
```

If you provide some parameters, the remaining ones will then be fetched by the CLI in an interactive mode.

If you start the CLI in a directory that contains an Azure Functions project it will do its best to collect the information from the project settings. You can switch this off by setting the flag ` --manually | -m`

## Development and Contributions

Contributions to the CLI are highly welcome. If you want to start developing you need to execute the following steps:

1. Clone this repository
2. Navigate into the directory of the cloned repository and install the dependencies via: 
   ```shell
   npm install
   ```
3. For a convenient local execution execute
   ```shell
   npm link
   ```

You can now call the CLI via 

```shell
create-funcdocker 
```