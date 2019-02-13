#!/usr/bin/env node

const http = require("http");
const fs = require("fs");
var eventObj = {};

http.createServer((request, response) => {

    if (request.url == '/api/callcenter/polling') {

        fs.readFile('./mocks/api/get/api/callcenter/stats/realtime/polling/data.json', (err, buffer) => {
            if (err) throw err;
            eventObj = JSON.parse(buffer);
        })

        response.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": '*',
        });

        for (let k in eventObj) {
            if (eventObj.hasOwnProperty(k)) {
                const interval = setInterval(() => {
                    const randomNumber = parseInt(Math.random() * 10)
                    let data = JSON.stringify(eventObj[k]);
                    response.write(`event: ${k}\n`);
                    response.write(`data: ${data}\n\n`);
                }, 1000)
            }
        }
    }
}).listen(8866, '127.0.0.1');

console.log('http://127.0.0.1:8866/api/callcenter/polling  访问mock数据')