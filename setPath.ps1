$env:Path = (($env:Path -split ';') + ((Get-Location).ToString()+"/../../# Portable App\node-v18.12.1-win-x64")) -join ';'