const axios = require("axios");
const qs = require("qs");
const path = require("path");

const envpath = path.resolve(__dirname, ".env");
require("dotenv").config({path: envpath});

const trans = (word, source, target) => {
    const url = process.env.API_URL;
    const params = qs.stringify({
        'text': word,
        'source': source,
        'target': target
    });
    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    axios
        .post(url, params, headers)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}
const usage = function (mes) {
    console.log(mes);
    console.log("\t en -> ja: : node main.js ja word");
    console.log("\t ja -> en: : node main.js en 単語");
}

if (process.argv.length < 4) {
    usage("Unexpected args");
    return;
}

const tgt = process.argv[2];
let src = "en";
if (tgt === "en") {
    src = "ja";
} else if(tgt === "ja") {
    src = "en";
} else {
    usage("Unexpected mode");
    return;
}

let words = [];
for(let i = 3; i < process.argv.length; i++) {
    words.push(process.argv[i]);
}
const text = words.join(" ");
trans(text, src, tgt);
