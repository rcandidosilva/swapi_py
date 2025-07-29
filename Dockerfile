# Multi-stage build for Python Flask app with Angular frontend
FROM node:16-alpine AS frontend-build

# Set working directory for frontend build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=development

# Copy source code
COPY . .

# Build Angular frontend
RUN npm run webapp:build:dev

# Python runtime stage
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies file
COPY pyproject.toml poetry.toml ./

# Install Poetry
RUN pip install poetry

# Copy README file
COPY README.md /app/README.md

# Copy Python source code
COPY src/main/python/ ./src/main/python/
COPY src/main/resources/ ./src/main/resources/

# Copy built frontend assets from previous stage
COPY --from=frontend-build /app/target/classes/static/ ./src/main/resources/static/

# Configure Poetry: don't create virtual environment, install dependencies
RUN poetry config virtualenvs.create false --local

RUN poetry install --only=main

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/api/management/health || exit 1

# Start application
CMD ["python", "src/main/python/Swapi_pyApp.py"]