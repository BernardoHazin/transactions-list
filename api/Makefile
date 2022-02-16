
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

down : in_host
	@docker-compose down --remove-orphans

db-migrate: CMD = yarn prisma migrate $(PRISMA_ENV) --schema=$(PRISMA_SCHEMA_PATH)
db-migrate: db-healthcheck exec_db-migrate
db-healthcheck: in_host
	@timeout 15s bash -c "until docker exec $(DATABASE_CONTAINER_NAME) pg_isready ; do sleep 5 ; done"
