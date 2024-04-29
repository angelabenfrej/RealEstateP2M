FROM python:3.12-alpine

RUN apk update && \
    apk add --no-cache \
        build-base \
        gcc \
        python3-dev \
        musl-dev \
        libffi-dev \
        openssl-dev \
        cmake

WORKDIR /Model

COPY  requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "fast:app","--reload"]
