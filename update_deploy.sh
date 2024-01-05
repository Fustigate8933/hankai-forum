#!/usr/bin/sh
cd frontend
npm run build
cd ..
echo creating frontend tarball
tar -cf frontend.tar frontend/dist

echo creating backend tarball
tar -cf backend.tar --exclude-vcs --exclude node_modules backend
scp *end.tar hankai:

echo update frontend?
read confirm
if [[ $confirm -eq 'y' ]] ; then
    ssh hankai rm -r frontend
    echo untarring frontend
    ssh hankai tar -xf frontend.tar frontend/dist
fi
echo update backend?
read confirm
if [[ $confirm -eq 'y' ]]; then
    ssh hankai '
sudo systemctl stop backend
rm -r backend
echo untarring backend
tar -xf backend.tar backend
cd backend
npm install
sudo systemctl start backend
sudo systemctl status backend
'
fi
