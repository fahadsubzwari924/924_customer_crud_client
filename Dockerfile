# From node:12

# WORKDIR /app/client

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 4200

# CMD [ "npm", "start" ]

FROM node:12
WORKDIR /myApp
# ENV PATH /myApp/node_modules/.bin:$PATH/

COPY package*.json ./
# RUN npm install -g @angular/cli@12.0.0
RUN npm install

COPY . .
# CMD ng serve --watch=true --host=0.0.0.0

EXPOSE 4200

CMD [ "npm", "start" ]
