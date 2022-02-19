
export RUNNING_IN_DOCKER = $(shell if [ -f /proc/1/cgroup ]; then grep docker /proc/1/cgroup -qa; echo $$?; else echo 1; fi)

EXEC := docker-compose exec api
RUN := docker-compose run --rm api
PRISMA_SCHEMA_PATH := ./src/main/prisma/schema.prisma
DATABASE_CONTAINER_NAME := transaction_db_container

exec_%:
ifeq ($(RUNNING_IN_DOCKER),0)
	$(CMD)
else
	$(EXEC) $(CMD)
endif

run_%: in_host
	$(RUN) $(CMD)

.PHONY: in_host in_docker
in_host:
	@if [ "$(RUNNING_IN_DOCKER)" -eq 0 ]; then echo "[ERROR] Does not work in Docker"; exit 1; fi
in_docker:
	@if [ "$(RUNNING_IN_DOCKER)" -eq 1 ]; then echo "[ERROR] Only works in Docker"; exit 1; fi

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := add remove
ifneq ($(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS)),)
  # use the rest as arguments for the command
  COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

  # ...and turn them into do-nothing targets
  $(eval $(COMMAND_ARGS):;@:)
endif

add: CMD = yarn add ${COMMAND_ARGS}
add: run_add

remove: CMD = yarn remove ${COMMAND_ARGS}
remove: run_remove

test: CMD = yarn test ${COMMAND_ARGS}
test: run_test

# Update prisma schema
prisma-generate: CMD = yarn prisma generate --schema=$(PRISMA_SCHEMA_PATH)
prisma-generate: exec_prisma-generate

# REMINDER: set prisma enviroment before execute:
# DEV: db-migrate --PRISMA_ENV=dev
# PROD: db-migrate --PRISMA_ENV=deploy
db-migrate: CMD = yarn prisma migrate $(PRISMA_ENV) --schema=$(PRISMA_SCHEMA_PATH)
db-migrate: db-healthcheck exec_db-migrate

db-populate: CMD = node ./scripts/populate.js
db-populate: db-reset exec_db-populate

db-reset: CMD = yarn prisma migrate reset --force --schema=$(PRISMA_SCHEMA_PATH)
db-reset: db-healthcheck exec_db-drop

db-healthcheck: in_host
	@timeout 15s bash -c "until docker exec $(DATABASE_CONTAINER_NAME) pg_isready ; do sleep 5 ; done"
