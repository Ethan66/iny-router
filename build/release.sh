#!/usr/bin/env sh
set -e
echo "请输入版本号："
read VERSION

read -p "开始发布版本号为: $VERSION - 的版本，是否确认? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build

  npm run lint
  npm run build
  if [[ `git status --porcelain` ]]; 
  then
    git add -A
    git commit -am "[release]: compile $VERSION"
  fi

  # commit
  npm version $VERSION --message "[release] $VERSION"

  # publish
  git push origin master
  git push origin refs/tags/v$VERSION

  # oooo

  if [[ $VERSION =~ [beta] ]]
  then
  # npm publish --tag beta
    node ./build/publish.js beta
  else 
  # npm publish
    node ./build/publish.js
  fi
fi
