#================================
#== DOCKER ENVIRONMENT
#================================
COMPOSE := docker-compose

dcb:
	${COMPOSE} build

dcbuf:
ifdef f
	${COMPOSE} up -d --build --${f}
endif

dcuf:
ifdef f
	${COMPOSE} up -d --${f}
endif

dcu:
	${COMPOSE} up -d --build

dcd:
	${COMPOSE} down

kdmig:
ifdef type
	${COMPOSE} exec app npm run ${type}
endif

kdrun:
	${COMPOSE} exec app npm run krun

#############################
# Application Teritory
#############################

NPM := npm

dev:
	${NPM} run dev

start:
	${NPM} start

startdoc:
	${NPM} start

build:
	${NPM} run build

test:
	${NPM} test

testcov:
	${NPM} run test:coverage

install: npm.o build.o

npm.o:
	${NPM} ci

build.o:
	${NPM} run build

#############################
# Typeorm Database Teritory
#############################

orsrun:
ifdef type
	${NPM} run seed:${type}
endif

orscon:
	${NPM} run seed:config

ormake:
ifdef name
	${NPM} run orm:make ${name}
endif

ormig:
ifdef type
	${NPM} run orm:${type}
endif

orlist:
	${NPM} run orm:list