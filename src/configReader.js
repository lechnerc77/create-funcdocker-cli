import { readFile } from 'fs/promises'
import { ValueHelper } from './valueHelper'

export async function fetchOptionsFromSettings(options) {

    let optionsWorkarea = JSON.parse(JSON.stringify(options))
    let vsCodeSettings
    let localSettings

    try {
        vsCodeSettings = await readFile('./.vscode/settings.json', 'utf8')
        localSettings = await readFile('./local.settings.json', 'utf8')
    } catch (error) {
        // we silently leave the method as we could not open the corresponding files
        return optionsWorkarea
    }

    const regex = /azureFunctions./gmi
    const subst = `azureFunctions`

    const vsCodeSettingsRepl = vsCodeSettings.replace(regex, subst)

    const vsCodeSettingsJSON = JSON.parse(vsCodeSettingsRepl)

    const localSettingsJSON = JSON.parse(localSettings)


    //Transfer the language from "FUNCTIONS_WORKER_RUNTIME"
    if (optionsWorkarea.language === '') {

        optionsWorkarea.language = localSettingsJSON.Values.FUNCTIONS_WORKER_RUNTIME

        if (optionsWorkarea.language === 'dotnet-isolated') {

            optionsWorkarea.language = ValueHelper.languageDotNet

        }

    }

    /* Transfer the language version
    Scripting: The version may be part of local.settings.json "FUNCTIONS_WORKER_RUNTIME_VERSION", but remove ~!
    dotnet: Can be extracted from vscode/settings.json: "azureFunctions.deploySubpath" "bin/Release/net5.0/publish", or bin/Release/net6.0/publish
    node and python .... no idea
    */
    if (optionsWorkarea.lversion === '') {
        if (localSettingsJSON.Values.FUNCTIONS_WORKER_RUNTIME_VERSION) {

            optionsWorkarea.lversion = localSettingsJSON.Values.FUNCTIONS_WORKER_RUNTIME_VERSION.replace('~', '')

            if (optionsWorkarea.language === ValueHelper.languagePowerShell) {

                optionsWorkarea.lversion = ValueHelper.languagePowerShell + ' ' + optionsWorkarea.lversion
            }

        } else if (optionsWorkarea.language === ValueHelper.languageDotNet) {

            let rawLversion = vsCodeSettingsJSON.azureFunctionsdeploySubpath.split('/')[2]

            switch (rawLversion) {
                case 'netcoreapp3.1':
                    optionsWorkarea.lversion = ValueHelper.dotNetVersion31core
                    break
                case 'net5.0':
                    optionsWorkarea.lversion = ValueHelper.dotNetVersion5iso
                    break
                case 'net6.0':
                    if (localSettingsJSON.Values.FUNCTIONS_WORKER_RUNTIME === 'dotnet-isolated') {

                        optionsWorkarea.lversion = ValueHelper.dotNetVersion6iso

                    }
                    else {

                        optionsWorkarea.lversion = ValueHelper.dotNetVersion6inproc
                    }
                    break
            }

        }
    }

    // Transfer the Azure Functions Runtime version from .vscode/settings.json => "azureFunctions.projectRuntime" ~4 || ~3 ; remove '~'
    if (optionsWorkarea.funccoreversion === '') {

        optionsWorkarea.funccoreversion = vsCodeSettingsJSON.azureFunctionsprojectRuntime.replace('~', '')

    }

    return optionsWorkarea

}