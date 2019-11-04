FROM node:8.11.1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -g @angular/cli@^7.3.5 && npm rebuild node-sass
CMD ng serve --host 0.0.0.0 --port 4200 --disableHostCheck true
