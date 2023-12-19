# Cloning the repo
this repo contains submodules and as such, the `--recursive` flag should be used.
for details with git submodules, refer to [https://www.git-scm.com/book/en/v2/Git-Tools-Submodules]
```sh
git clone --recursive
```
or
```sh
git clone
# incase the remote submodule uri has changed
git submodule sync --recursive
# normally:
git submodule update --init --recursive
```
# Dependencies
- npm
# How to use
## Frontend
### Setup
```sh
npm install
```
### Hot-Reload development version
```sh
npm run dev
```
### Compiled and minimized for production
```sh
npm run build
```
## Backend
### Setup
```sh
npm install
```
### Hot-Reload development version
```sh
npm start
```
### Compiled and minimized for production
nope, not implemented yet
