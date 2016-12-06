FROM node:6.9.1-alpine
WORKDIR /app

COPY build.bat . 
COPY gulpfile.js . 
COPY package.json . 
COPY README.md .
#COPY src ./src

RUN npm set progress=false
RUN npm install --no-progress --silent

EXPOSE 8080
CMD ["find", "."]
CMD ["npm", "start"]