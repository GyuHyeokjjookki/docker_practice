FROM python:latest

WORKDIR /app

ADD . /app
RUN pip install -r requirements.txt
RUN pip install uwsgi #uwsgi 의 경우 requirement에 포함을 하면 빌드 에러가 발생하여, 따로 RUN 명령을 추가하였습니다.

CMD ["uwsgi","uwsgi.ini"]