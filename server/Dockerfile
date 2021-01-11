FROM python:3.6

RUN cd /tmp
RUN wget --no-check-certificate https://dl-ssl.google.com/linux/linux_signing_key.pub
RUN apt-key add linux_signing_key.pub
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main " >> /etc/apt/sources.list'
RUN apt update
RUN apt install -y google-chrome-stable=87.0.4280.141-1

RUN cd /tmp
RUN curl -O https://chromedriver.storage.googleapis.com/87.0.4280.88/chromedriver_linux64.zip
RUN apt-get install zip
RUN unzip chromedriver_linux64.zip
RUN mv chromedriver /usr/local/bin/
RUN which chromedriver

RUN apt install -y libglib2.0-0=2.58.3-2+deb10u2
RUN apt install -y libgconf-2-4=3.2.6-5
RUN apt install -y libfontconfig1=2.13.1-2
RUN apt install -y libnss3=2:3.42.1-1+deb10u3
RUN apt install -y mecab python-mecab mecab-ipadic-utf8
RUN apt install -y mecab-jumandic-utf8 libmecab-dev file curl

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

#CMD  ["python", "main.py"]
