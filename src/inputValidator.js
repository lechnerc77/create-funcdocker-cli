import { ValueHelper } from './valueHelper'

export function validateOptions(optionsToValidate) {

    let validatedOptions = JSON.parse(JSON.stringify(optionsToValidate))

    if (validatedOptions.language !== '') {

        const isLanguageValid = validateLanguage(validatedOptions)

        if (isLanguageValid === false) {

            validatedOptions.language = ''
            // if language is invalid, so is the language version
            validatedOptions.lversion = ''

        }

    }

    if (validatedOptions.lversion !== '') {

        const isLversionValid = validateLanguageVersion(validatedOptions)

        if (isLversionValid === false) {

            validatedOptions.lversion = ''

        }
    }

    if (validatedOptions.funccoreversion !== '') {

        const isFunccoreversionValid = validateFuncCoreVersion(validatedOptions)

        if (isFunccoreversionValid === false) {

            validatedOptions.funccoreversion = ''

        }
    }

    if (validatedOptions.dockerbaseimage !== '') {

        const isDockerbaseimageValid = validateDockerBaseImage(validatedOptions)

        if (isDockerbaseimageValid === false) {

            validatedOptions.dockerbaseimage = ''

        }
    }


    return validatedOptions
}

export function hasInputValidationFailed(optionsFromCLi, optionsAfterValidation) {

    return JSON.stringify(optionsFromCLi) !== JSON.stringify(optionsAfterValidation)
}

function validateLanguage(options) {

    const validLanguageValues = ValueHelper.getValidLanguageValues()

    const isLanguageValid = validLanguageValues.includes(options.language)

    return isLanguageValid
}

function validateLanguageVersion(options) {

    const validLanguageVersionsByLanguage = ValueHelper.getValidLanguageVersionsByLanguage(options.language)

    const isLversionValid = validLanguageVersionsByLanguage.includes(options.lversion)

    return isLversionValid
}

function validateFuncCoreVersion(options) {

    const validFunctionCoreVersions = ValueHelper.getValidFunctionCoreVersions()

    const isFunccoreversionValid = validFunctionCoreVersions.includes(options.funccoreversion)

    return isFunccoreversionValid
}


function validateDockerBaseImage(options) {

    let isDockerbaseimageValid = false

    if (options.language !== '' && options.lversion !== '' && options.funccoreversion !== '') {

        const validDockerBaseImagesByLanguageAndLanguageVersionAndCoreVersion = ValueHelper.getValidDockerBaseImagesByLanguageAndLanguageVersionAndCoreVersion(options.language, options.lversion, options.funccoreversion)

        isDockerbaseimageValid = validDockerBaseImagesByLanguageAndLanguageVersionAndCoreVersion.includes(options.dockerbaseimage)

    }

    return isDockerbaseimageValid
}