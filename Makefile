# Color definitions
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

# Load environment variables from .env file
-include .env
export

#############
# Help
#############
.PHONY: help
help: ## Display all available commands in this Makefile
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'
	@echo ""
	
#############
# Dependencies
#############
.PHONY: install
install: ## Install project dependencies
	@echo "${YELLOW}Installing dependencies...${RESET}"
	@npm install
	@echo "${GREEN}✅ Dependencies installed successfully!${RESET}"

#############
# Development
#############
.PHONY: dev
dev: ## Start development server
	@echo "${YELLOW}Starting development server...${RESET}"
	@npm run dev

## Build
.PHONY: build
build: ## Build for production environment
	@echo "${YELLOW}Building production bundle...${RESET}"
	@npm run build
	@echo "${GREEN}✅ Build completed successfully!${RESET}"

#############
# Code Quality
#############
.PHONY: format
format: ## Format code using prettier
	@echo "${YELLOW}Formatting code...${RESET}"
	@npm run format
	@echo "${GREEN}✅ Code formatting completed!${RESET}"

.PHONY: lint
lint: ## Lint and automatically fix code
	@echo "${YELLOW}Running linter...${RESET}"
	@npm run lint:fix
	@echo "${GREEN}✅ Linting completed!${RESET}"

.PHONY: format-check
format-check: ## Check code formatting without fixing
	@echo "${YELLOW}Checking code formatting...${RESET}"
	@npm run check
	@echo "${GREEN}✅ Format check completed!${RESET}"

.PHONY: lint-check
lint-check: ## Check for linting errors
	@echo "${YELLOW}Checking for linting errors...${RESET}"
	@npm run lint
	@echo "${GREEN}✅ Lint check completed!${RESET}"

.PHONY: fix
fix: format lint ## Fix code formatting and linting errors

.PHONY: check
check: format-check lint-check ## Run all checks (same as in GitHub Actions workflow)

#############
# Testing
#############
.PHONY: test
test: ## Run tests
	@echo "${YELLOW}Running tests...${RESET}"
	@npm test

.PHONY: test-watch
test-watch: ## Run tests in watch mode
	@echo "${YELLOW}Starting tests in watch mode...${RESET}"
	@npm test -- --watch

.PHONY: test-coverage
test-coverage: ## Run tests with coverage report
	@echo "${YELLOW}Running test coverage...${RESET}"
	@npm test -- --coverage

#############
# Cleanup
#############
.PHONY: clean
clean: ## Remove build artifacts and dependencies
	@echo "${YELLOW}Cleaning up...${RESET}"
	@rm -rf node_modules build .react-router
	@echo "${GREEN}✅ Cleanup completed!${RESET}"

.DEFAULT_GOAL := help
