#!/usr/local/bin/zsh

cd /Users/hirokikojima/Project/github-pages
directory_name=$1
page_name=$2
cp script/templates/express_template.txt "pages/${directory_name}/${page_name}.vue"
touch "static/markdown/${directory_name}/${page_name}.md"
