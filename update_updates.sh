#!/bin/bash

# Obtén la versión del último release de GitHub
version=$(curl --silent "https://api.github.com/repos/dcontt00/buleria-helper/releases/latest" | jq -r .tag_name)
echo "Version: $version"
# Genera el enlace de actualización
update_link="https://github.com/dcontt00/buleria-helper/releases/download/${version}/buleria_helper-${version}.xpi"
echo "Update link: $update_link"
# Actualiza el archivo JSON
jq --arg version "$version" --arg update_link "$update_link" \
'.addons["buleriahelper@dcontt00"].updates |= [{ "version": $version, "update_link": $update_link }] + .' updates.json > tmp.json && mv tmp.json updates.json