export class ValueHelper {

    //Supported languages
    static languageNode = 'node'
    static languagePython = 'python'
    static languageDotNet = 'dotnet'
    static languagePowerShell = 'powershell'
    //static languageJava = 'java'

    //Supported language versions
    static nodeVersion14 = '14'
    static nodeVersion16 = '16'

    static pythonVersion38 = '3.8'
    static pythonVersion39 = '3.9'

    static dotNetVersion31core = 'dotnetcore 3.1'
    static dotNetVersion5iso = 'dotnet 5.0 (isolated)'
    static dotNetVersion6iso = 'dotnet 6 (isolated)'
    static dotNetVersion6inproc = 'dotnet 6 (in process)'

    static powerShellVersion6 = 'powershell 6'
    static powerShellVersion7 = 'powershell 7'

    //Supported Azure Functions Core Versions
    static funcCoreVersion3 = '3'
    static funcCoreVersion4 = '4'


    static getValidLanguageValues() {
        return [
            ValueHelper.languageNode,
            ValueHelper.languagePython,
            ValueHelper.languageDotNet,
            ValueHelper.languagePowerShell
        ]
    }

    static getValidLanguageVersionsByLanguage(language) {
        switch (language) {
            case this.languageNode:
                return [this.nodeVersion14, this.nodeVersion16]
            case this.languagePython:
                return [this.pythonVersion38, this.pythonVersion39]
            case this.languageDotNet:
                return [this.dotNetVersion31core, this.dotNetVersion5iso, this.dotNetVersion6iso, this.dotNetVersion6inproc]
            case this.languagePowerShell:
                return [this.powerShellVersion6, this.powerShellVersion7]
        }
    }


    static getValidFunctionCoreVersions() {
        return [this.funcCoreVersion3, this.funcCoreVersion4]
    }


    static getValidDockerBaseImagesByLanguageAndLanguageVersionAndCoreVersion(language, languageVersion, coreVersion) {

        if (language === this.languageNode && languageVersion === this.nodeVersion14) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['3.0-node14', '3.0-node14-slim', '3.0-node14-appservice', '3.0-node14-core-tools']
                case this.funcCoreVersion4:
                    return ['4-node14', '4-node14-slim', '4-node14-appservice', '4-node14-core-tools']
            }
        }
        else if (language === this.languageNode && languageVersion === this.nodeVersion16) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['none available']
                case this.funcCoreVersion4:
                    return ['4-node16', '4-node16-slim', '4-node16-appservice', '4-node16-core-tools']
            }
        }
        else if (language === this.languagePython && languageVersion === this.pythonVersion38) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['3.0-python3.8', '3.0-python3.8-slim', '3.0-python3.8-appservice', '3.0-python3.8-core-tools', '3.0-python3.8-buildenv']
                case this.funcCoreVersion4:
                    return ['4-python3.8', '4-python3.8-slim', '4-python3.8-appservice', '4-python3.8-core-tools', '4-python3.8-buildenv']
            }
        }
        else if (language === this.languagePython && languageVersion === this.pythonVersion39) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['3.0-python3.9', '3.0-python3.9-slim', '3.0-python3.9-appservice', '3.0-python3.9-core-tools', '3.0-python3.9-buildenv']
                case this.funcCoreVersion4:
                    return ['4-python3.9', '4-python3.9-slim', '4-python3.9-appservice', '4-python3.9-core-tools', '4-python3.9-buildenv']
            }
        }

        else if (language === this.languageDotNet && (languageVersion === this.dotNetVersion31core || languageVersion === this.dotNetVersion6inproc)) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['3.0', '3.0-slim', '3.0-dotnet3-appservice', '3.0-dotnet3-core-tools']
                case this.funcCoreVersion4:
                    return ['4', '4-slim', '4-dotnet3-appservice', '4-dotnet6-core-tools']
            }
        }
        else if (language === this.languageDotNet && (languageVersion === this.dotNetVersion5iso || languageVersion === this.dotNetVersion6iso)) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['3.0', '3.0-dotnet-isolated5.0-slim', '3.0-dotnet-isolated5.0-appservice', '3.0-dotnet-isolated5.0-core-tools']
                case this.funcCoreVersion4:
                    return ['4', '4-dotnet-isolated5.0-slim', '4-dotnet-isolated5.0-appservice', '4-dotnet-isolated6.0-core-tools']
            }
        }

        else if (language === this.languagePowerShell && languageVersion === this.powerShellVersion6) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['3.0-powershell6', '3.0-powershell6-slim', '3.0-powershell6-appservice', '3.0-powershell6-core-tools']
                case this.funcCoreVersion4:
                    return ['4-powershell6', '4-powershell6-slim', '4-powershell6-appservice', '4-powershell6-core-tools']
            }
        }
        else if (language === this.languagePowerShell && languageVersion === this.powerShellVersion7) {
            switch (coreVersion) {
                case this.funcCoreVersion3:
                    return ['3.0-powershell7', '3.0-powershell7-slim', '3.0-powershell7-appservice', '3.0-powershell7-core-tools']
                case this.funcCoreVersion4:
                    return ['4-powershell7', '4-powershell7-slim', '4-powershell7-appservice', '4-powershell7-core-tools']
            }
        }
        /*  else if (language === 'java' && languageVersion === 'java 8') {
              switch (coreVersion) {
                  case this.funcCoreVersion3:
                      return ['3.0-java8', '3.0-java8-slim', '3.0-java8-appservice', '3.0-java8-core-tools']
                  case this.funcCoreVersion4:
                      return ['4-java8', '4-java8-slim', '4-java8-appservice', '4-java8-core-tools']
              }
          }
          else if (language === 'java' && languageVersion === 'java 11') {
              switch (coreVersion) {
                  case this.funcCoreVersion3:
                      return ['3.0-java11', '3.0-java11-slim', '3.0-java11-appservice', '3.0-java11-core-tools']
                  case this.funcCoreVersion4:
                      return ['4-java11', '4-java11-slim', '4-java11-appservice', '4-java11-core-tools']
              }
          }
      */


    }

    static getValidBaseImagePathByLanguageAndLanguageVersion(language, languageVersion) {

        if (language === this.languageNode) {
            return 'mcr.microsoft.com/azure-functions/node'
        }
        else if (language === this.languagePython) {
            return 'mcr.microsoft.com/azure-functions/python'
        }
        else if (language === this.languageDotNet && (languageVersion === this.dotNetVersion31core || languageVersion === this.dotNetVersion6inproc)) {
            return 'mcr.microsoft.com/azure-functions/dotnet'
        }
        else if (language === this.languageDotNet && (languageVersion === this.dotNetVersion5iso || languageVersion === this.dotNetVersion6iso)) {
            return 'dotnet5.0mcr.microsoft.com/azure-functions/dotnet-isolated'
        }
        else if (language === this.languagePowerShell) {
            return 'mcr.microsoft.com/azure-functions/powershell'
        }
        /*
                else if (language === 'java') {
            return 'mcr.microsoft.com/azure-functions/java'
        }
        */

    }

}








