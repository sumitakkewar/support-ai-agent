up-dev:
	docker-compose -f docker-compose.override.yml up --build -d

up-prod:
	docker-compose -f docker-compose.yml up --build -d

build-prod:
	docker-compose -f docker-compose.yml build

down:
	docker-compose down --remove-orphans --volumes
