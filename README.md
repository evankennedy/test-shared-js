# Test Shared JS

This repository is my personal testing grounds for code sharing in Javascript-based projects.

## Goals

- Enable code sharing via Git submodules
- Enable code sharing via Github packages
- Create an easy way to develop this repository in tandem with other repositories that will use the shared code.

## Structure

All packages are held within the `packages` directory. Within there, each package is held within individual directories.

## Caveats

Currently, we need to have a `subpackage/package.json` directory. Once Typescript supports the `exports` property of the `package.json`, we will be able to omit this and the `postBuild` script that creates them.
