set -e

if [ $# -eq 0 ]
  then
    echo 'Please provide the version number, e.g "./publish 1.0.0"'
    exit 1
fi

VERSION=$1

rm -rf node_modules

npm i

npm run test

npm run build:umd

# bumps version without creating a tag yet:
npm --no-git-tag-version version "$VERSION"

git add package.json
git add package-lock.json

git commit -m "$VERSION"

# commits the build result (it will be pushed only on the tag):
git add -f dist
git commit -m "build for tag v$VERSION"

# tags the release and includes the build result:
git tag -a v"$VERSION" -m "$VERSION"
git push origin v"$VERSION"

npm publish
