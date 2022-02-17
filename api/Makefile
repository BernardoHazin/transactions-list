
export RUNNING_IN_DOCKER = $(shell if [ -f /proc/1/cgroup ]; then grep docker /proc/1/cgroup -qa; echo $$?; else echo 1; fi)

EXEC := docker-compose exec api
PRISMA_SCHEMA_PATH := ./src/main/prisma/schema.prisma
DATABASE_CONTAINER_NAME := transaction_db_container

exec_%:
ifeq ($(RUNNING_IN_DOCKER),0)
	$(CMD)
else
	$(EXEC) $(CMD)
endif

.PHONY: in_host in_docker
in_host:
	@if [ "$(RUNNING_IN_DOCKER)" -eq 0 ]; then echo "[ERROR] Does not work in Docker"; exit 1; fi
in_docker:
	@if [ "$(RUNNING_IN_DOCKER)" -eq 1 ]; then echo "[ERROR] Only works in Docker"; exit 1; fi

up: in_host down
	@docker-compose up --build -d

down: in_host
	@docker-compose down --remove-orphans

logs: in_host
	@docker-compose logs -t -f

add: CMD = yarn add $(dependencies)
add: exec_add

remove: CMD = yarn remove $(dependencies)
remove: exec_add

# Update prisma schema
generate: in_host
	@yarn prisma generate --schema=$(PRISMA_SCHEMA_PATH)

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
