import arg from 'arg'
import { Listr } from 'listr2'
import chalk from 'chalk'
import { completeUserInput } from './inputHelper'
import { writeDockerFile, writeDockerIgnoreFile, writeMakeFile, writeFilesInDryRunMode, writeKubernetesDeploymentFile } from './writer'
import { validateOptions, hasInputValidationFailed } from './inputValidator'
import { getHelpText } from './helpTextUtil'
import { fetchOptionsFromSettings } from './configReader'

export async function cli(args) {

    let optionsFromCli

    try {
        optionsFromCli = parseArgumentsIntoOptions(args)
    } catch (error) {
        console.log('\nThere was an error parsing the arguments: ' + chalk.red(error.message))
        console.log('\n---------------------------------------- \n')
        console.log(chalk.yellow.bold('Check the help text below for more information:'))
        console.log(getHelpText())
        return
    }

    if (optionsFromCli.help) {

        console.log(getHelpText())
        return

    }

    else {
        try {

            let optionsAfterValidation = validateOptions(optionsFromCli)

            if (hasInputValidationFailed(optionsFromCli, optionsAfterValidation)) {
                console.log(chalk.red('Input validation failed'), '- We will guide you through the process')
            }


            let optionsAfterUserInput

            if (optionsAfterValidation.manually === true) {

                optionsAfterUserInput = await completeUserInput(optionsAfterValidation)

            }

            else {

                let optionsAfterPrefill = await fetchOptionsFromSettings(optionsAfterValidation)

                optionsAfterUserInput = await completeUserInput(optionsAfterPrefill)

            }

            if (optionsAfterUserInput.dryrun === true) {

                writeFilesInDryRunMode(optionsAfterUserInput)

            }
            else {

                let taskArray = getTaskArrayByOptions(optionsAfterUserInput)

                const tasks = new Listr(taskArray)

                await tasks.run()

            }

            console.log(chalk.green('DONE'), '- All files have been generated')

        } catch (e) {
            console.error(e)
        }


    }
}

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--language': String,
            '--lversion': String,
            '--funccoreversion': String,
            '--dockerbaseimage': String,
            '--disablefunchomepage': Boolean,
            '--defaultport': String,
            '--addmakefile': Boolean,
            '--dockerid': String,
            '--appname': String,
            '--appversion': String,
            '--kubernetes': Boolean,
            '--help': Boolean,
            '--manually': Boolean,
            '--dryrun': Boolean,
            '--la': '--language',
            '--lv': '--lversion',
            '--fv': '--funccoreversion',
            '--di': '--dockerbaseimage',
            '--dh': '--disablefunchomepage',
            '--dp': '--defaultport',
            '--am': '--addmakefile',
            '--id': '--dockerid',
            '--an': '--appname',
            '--av': '--appversion',
            '--k': '--kubernetes',
            '-h': '--help',
            '-m': '--manually',
            '-d': '--dryrun'
        },
        {
            argv: rawArgs.slice(2)
        }
    )

    return {
        language: args['--language'] || '',
        lversion: args['--lversion'] || '',
        funccoreversion: args['--funccoreversion'] || '',
        dockerbaseimage: args['--dockerbaseimage'] || '',
        disablefunchomepage: args['--funchomepage'] || '',
        defaultport: args['--defaultport'] || '',
        addmakefile: args['--addmakefile'] || '',
        dockerid: args['--dockerid'] || '',
        appname: args['--appname'] || '',
        appversion: args['--appversion'] || '',
        kubernetes: args['--kubernetes'] || '',
        help: args['--help'] || false,
        manually: args['--manually'] || false,
        dryrun: args['--dryrun'] || false
    }
}

function getTaskArrayByOptions(options) {

    let taskArray = [
        {
            title: 'Create Dockerfile',
            task: async (_, task) => { await writeDockerFile(options) }
        },
        {
            title: 'Create .dockerignore file',
            task: async (_, task) => { await writeDockerIgnoreFile(options) }
        }
    ]

    if (options.addmakefile) {
        taskArray.push({
            title: 'Create Makefile',
            task: async (_, task) => { await writeMakeFile(options) }
        })
    }

    if (options.kubernetes) {
        taskArray.push({
            title: 'Create Kubernetes deployment file',
            task: async (_, task) => { await writeKubernetesDeploymentFile(options) }
        })
    }

    return taskArray
}