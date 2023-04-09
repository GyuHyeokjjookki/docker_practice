From python:latest

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN apt-get -y install vim 

RUN mkdir /srv/docker-server 
ADD . /srv/docker-server 

WORKDIR /srv/docker-server 

RUN pip install --upgrade pip
RUN pip install uwsgi
RUN pip install -r requirements.txt

#EXPOSE 8000
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["uwsgi","uwsgi.ini"]