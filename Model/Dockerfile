FROM python:3.12-alpine

WORKDIR /Model

COPY  requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "fast:app","--reload"]
