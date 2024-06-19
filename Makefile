re: start

lint:
	npm run lint

fix:
	npm run lint:fix

test:
	npm run test

update:
	npm run test:update

build:
	npm run build

start:
	npm run start

fresh:
	rm -rf node_modules/
	npm ci