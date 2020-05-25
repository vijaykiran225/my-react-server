FROM node:11
# Create app directory
WORKDIR /usr/src/react_app_frontend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
# start app
CMD ["npm", "start"]