@echo off

::update and compile deps
call mix deps.get --only prod
set MIX_ENV=prod
call mix compile

::compile assets
cd assets
call npm install
cd ..
call mix assets.deploy

::cleanup
set MIX_ENV=dev
call mix phx.digest.clean --all
