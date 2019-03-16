#!/usr/local/bin/zsh

cd /Users/hirokikojima/Project/github-pages
page_name=$1
cp script/templates/express_template.txt "pages/express/${page_name}.vue"
touch "static/markdown/express/${page_name}.md"
