export RUNNING_IN_DOCKER = $(shell if [ -f /proc/1/cgroup ]; then grep docker /proc/1/cgroup -qa; echo $$?; else echo 1; fi)

.PHONY: in_host
in_host:
	@if [ "$(RUNNING_IN_DOCKER)" -eq 0 ]; then echo "[ERROR] Does not work in Docker"; exit 1; fi

up: in_host down build
	@docker-compose up -d

build: in_host
	@docker-compose build

down: in_host
	@docker-compose down --remove-orphans

logs: in_host
	@docker-compose logs -t -f
