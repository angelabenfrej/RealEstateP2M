FROM python:3.9-alpine

RUN apk update && \
    apk add --no-cache \
        build-base \
        gcc \
        libmemcached-dev \
        python3-dev \
        musl-dev \
        libffi-dev \
        openssl-dev \
        cmake

WORKDIR /Model

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 4200

# CMD ["uvicorn", "fast:app", "--reload","--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "fast:app", "--reload","--host", "0.0.0.0","--port", "4200"]
