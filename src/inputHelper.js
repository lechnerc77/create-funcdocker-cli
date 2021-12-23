import inquirer from 'inquirer'
import { ValueHelper } from './valueHelper'

export async function completeUserInput(optionsToComplete) {

    let options = JSON.parse(JSON.stringify(optionsToComplete))

    if (options.language === '') {

        options.language = await promptForMissingLanguage(options)

    }

    if (options.lversion === '') {

        options.lversion = await promptForMissingLanguageVersion(options)

    }

    if (options.funccoreversion === '') {

        options.funccoreversion = await promptForMissingFuncCoreVersion(options)
    }

    if (options.dockerbaseimage === '') {

        options.dockerbaseimage = await promptForMissingDockerBaseImage(options)

    }

    if (options.disablefunchomepage === '') {

        options.disablefunchomepage = await promptForMissingFuncHomePage(options)

    }

    if (options.defaultport === '') {

        options.defaultport = await promptForMissingDefaultPort(options)

    }

    if (options.addmakefile === '') {

        options.addmakefile = await promptForMissingAddMakeFile(options)

    }

    if (options.addmakefile === true && options.dockerid === '') {

        options.dockerid = await promptForMissingDockerId(options)

    }

    if (options.addmakefile === true && options.appname === '') {

        options.appname = await promptForMissingAppName(options)

    }

    if (options.addmakefile === true && options.appversion === '') {

        options.appversion = await promptForMissingAppVersion(options)

    }

    return options

}

async function promptForMissingLanguage(options) {

    try {

        const questions = []

        if (!options.language) {

            const validLanguageValues = ValueHelper.getValidLanguageValues()


            questions.push({
                type: 'list',
                name: 'language',
                message: 'What language do you want to use?',
                choices: validLanguageValues,
                default: 'node'
            })
        }


        const answers = await inquirer.prompt(questions)

        return answers.language

    } catch (error) {

        console.error('Inquirer (Language Values) raised: ' + error)

    }

}

async function promptForMissingLanguageVersion(options) {

    try {

        const questions = []

        if (!options.lversion) {

            const validLanguageVersions = ValueHelper.getValidLanguageVersionsByLanguage(options.language)

            questions.push({
                type: 'list',
                name: 'lversion',
                message: 'What version of the language do you want to use?',
                choices: validLanguageVersions
            })
        }

        const answers = await inquirer.prompt(questions)

        return answers.lversion

    } catch (error) {

        console.error('Inquirer (Language Versions) raised: ' + error)

    }

}

async function promptForMissingFuncCoreVersion(options) {

    try {
        const questions = []

        if (!options.funccoreversion) {

            const validFunctionCoreVersions = ValueHelper.getValidFunctionCoreVersions()

            questions.push({
                type: 'list',
                name: 'funccoreversion',
                message: 'What version of the Azure Functions runtime do you want to use?',
                choices: validFunctionCoreVersions,
                default: '4'
            })
        }
        const answers = await inquirer.prompt(questions)

        return answers.funccoreversion

    } catch (error) {

        console.error('Inquirer (Azure Functions Core Version) raised: ' + error)

    }

}

async function promptForMissingDockerBaseImage(options) {

    try {

        const questions = []

        if (!options.dockerbaseimage) {

            const validDockerBaseImages = ValueHelper.getValidDockerBaseImagesByLanguageAndLanguageVersionAndCoreVersion(options.language, options.lversion, options.funccoreversion)

            questions.push({
                type: 'list',
                name: 'dockerbaseimage',
                message: 'What Docker base image do you want to use?',
                choices: validDockerBaseImages
            })
        }
        const answers = await inquirer.prompt(questions)

        return answers.dockerbaseimage

    } catch (error) {

        console.error('Inquirer (Docker Base Image) raised: ' + error)

    }

}

async function promptForMissingFuncHomePage(options) {

    const questions = []

    if (!options.disablefunchomepage) {

        questions.push({
            type: 'confirm',
            name: 'disablefunchomepage',
            message: 'Should the Azure Functions homepage be disabled?',
        })
    }

    const answers = await inquirer.prompt(questions)

    return answers.disablefunchomepage


}

async function promptForMissingDefaultPort(options) {

    const questions = []

    if (!options.defaultport) {

        questions.push({
            type: 'number',
            name: 'defaultport',
            message: 'Enter a value for the exposed port if you want to deviate from standard?',
            default: '80'
        })
    }

    const answers = await inquirer.prompt(questions)

    return answers.defaultport
}

async function promptForMissingAddMakeFile(options) {

    const questions = []

    if (!options.addmakefile) {

        questions.push({
            type: 'confirm',
            name: 'addmakefile',
            message: 'Should a Makefile be added?'
        })
    }

    const answers = await inquirer.prompt(questions)

    return answers.addmakefile
}

async function promptForMissingDockerId(options) {

    const questions = []

    if (!options.dockerid) {

        questions.push({
            type: 'input',
            name: 'dockerid',
            message: 'Enter a Docker ID of the container registry',
            default: '<Your Docker ID>'
        })
    }

    const answers = await inquirer.prompt(questions)

    return answers.dockerid
}

async function promptForMissingAppName(options) {

    const questions = []

    if (!options.appname) {

        questions.push({
            type: 'input',
            name: 'appname',
            message: 'Enter an application name',
            default: '<Your app name>'
        })
    }

    const answers = await inquirer.prompt(questions)

    return answers.appname
}

async function promptForMissingAppVersion(options) {

    const questions = []

    if (!options.appversion) {

        questions.push({
            type: 'input',
            name: 'appversion',
            message: 'Enter an application version',
            default: '<Your app version>'
        })
    }

    const answers = await inquirer.prompt(questions)

    return answers.appversion
}