FROM centos:centos7
COPY . /src
WORKDIR /src
RUN bash /src/.omeroci/app-deps
RUN yum install -y python-setuptools python-virtualenv git
RUN git clean -dfx
RUN virtualenv v && v/bin/pip install twine
RUN python setup.py sdist
