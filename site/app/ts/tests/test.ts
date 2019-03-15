import * as fs from "fs"
import _ = require("lodash");
import yaml = require("yamljs");
import path = require("path");
import rp = require("request-promise");
import {RequestResponse} from "request";
let data = fs.readFileSync(`${__dirname}/blah.json`, {
    encoding: "utf8"
});

let obj = JSON.parse(data);


const nameRegex = /\/([^\/]*)\.png\?/;
async function run() {
    let all = {} as any;

    let byName = obj.map(async x => {
        let [_, name] = nameRegex.exec(x);
        console.log(name);
        let url = x.replace("?dl=0", "?raw=1")
        let res = await rp({
            url: url,
            method: "get",
            simple: false,
            resolveWithFullResponse: true,
            followRedirect: false
        }) as RequestResponse;
        all[name] = `https://www.dropbox.com${res.headers.location}`;
    });

    await Promise.all(byName);
    console.log(all);
    fs.writeFileSync(`./site/content/image-hosting.yaml`, yaml.stringify(all), {
        encoding: "utf8"
    });
    console.log(all);
}

run();
