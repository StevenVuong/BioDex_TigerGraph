FROM tensorflow/tensorflow:2.8.0

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r /app/requirements.txt

COPY config.cfg /app/config.cfg
COPY main.py /app/main.py
COPY src /app/src/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
