import { parse } from 'csv';
import fs from 'node:fs';
import http from 'node:http';

function importTasksFromCsv() {
  const options = {
    method: "POST",
    hostname: "localhost",
    port: "3333",
    path: "/tasks",
  };

  fs.createReadStream("../../tasks.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        const req = http.request(options, function (res) {
          const chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
          });
        });

        req.write(JSON.stringify({ title: row[0], description: row[1] }));
        req.end();
    })
}

importTasksFromCsv()
