const express = require('express');
const _ = require("lodash");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(testString);
  res.send("good");
});


router.post("/", async (req, res) => {

  const string = req.body
  console.log(string);
  const result = splitString(string);
  return res.send(result);
});


router.post("/to_camel", (req, res) => {
  const string = req.body.string;
  return res.json({
    string: _.camelCase(string)
  })
});

router.post("/to_snake", (req, res) => {
  const string = req.body.string;
  return res.json({
    string: _.snakeCase(string)
  })
});


const typeCasting = {
  bit: "bool",
  int: "int",
  char: "string",
  float: "float32",
  varchar: "string",
  datetime: "time.Time",
  date: "time.Time"
}


function splitString(string) {
  const result = [];
  const rows = string.split("\n").filter(a => a);
  rows.forEach(row => {
    row = row.split(" ").filter(a => a);
    let column = "";

    // 첫번쨰는 이름
    column += upperCamelCase(row[0]) + " ";

    // 두번째는 타입
    // 타입에 사이즈가 있나??
    let type = row[1];
    let size = row[1].match(/\d+/);
    if(size){
      size = size[0];
      type = row[1].replace(/\(\d+\)/g, '');
    }

    column += typeCasting[type] + " ";

    // 세번쨰는 gorm option
    let options = '';
    options += '\`gorm:"column:'+row[0]+';';
    if(size) {
      options += ' size:' + size + ';';
    }
    // not null인지?
    if(row.some(s => s === 'null') && row.some(s => s === 'not')) {
      options += ' not null;';
    }

    options += '" json:"' + _.camelCase(row[0]) + '"\`';

    column += options;

    result.push(column);
  });
  return result.join("\n");
}


function upperCamelCase(string) {
  const resultString = _.camelCase(string);
  return resultString[0].toUpperCase() + resultString.slice(1);
}

module.exports = router;
