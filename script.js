var articles = [["Violated self-study regulation", "Violated outdoor regulation", "Late for school", "Dress code", "Destroyed school property", "Violated cleaning regulation", "Violated curfew regulation(8)", "Violated curfew regulation(2)", "Violated food regulation(10)", "Violated food regulation(2)", "Violated computer regulation", "Used electronic device", "EOP Violation", "Lied", "Absent from Court", "Late for Court", "Did not follow teacher's direction(3)", "Did not follow teacher's direction(4)", "Did not follow teacher's direction(5)", "Late for morning exercise", "Absent from morning exercise", "Late for self-study", "Insolent attitude"],
[2, 2, 2, 2, 2, 1, 3, 8, 2, 10, 5, 5, 2, 5, 3, 2, 3, 4, 5, 2, 3, 1, 2]];
//insolent attitude
//“자습 불량”, “무단이탈”, “지각”, “복장 불량”, “기물 파손”, “청소 불량”, “통금 위반”, “통금 방조”, “식품 위반(2)”, “식품 위반(10)”, “컴퓨터 위반”, “전열기”, “EOP 위반”, “거짓말”, “법정 불참”, “법정 지각”, “지시 불이행(3)”, “지시 불이행(4)”, “지시 불이행(5)”, “아침기 지각”, “아침기 불참”, “자습 지각”

var people = [];
function newRow(){
  var table = document.getElementById('list');
  table.insertRow(table.rows.length);
  var row = table.rows[table.rows.length - 1];
  for(var i = 0; i < table.rows[0].cells.length; i++){
    row.insertCell();
  }

  return table.rows[table.rows.length-1];
}


function getPoints(article){
  for(var i = 0; i < articles[0].length; i++){
    if(articles[0][i] === article) return articles[1][i];
  }
}

function findPerson(person){
  for(var i = 0; i < people.length; i++){
    if(people[i] === person) return i;
  }
  return -1;
}

function submitData(){
  //retrives new row
  var row = newRow();

  var cellInput = [];

  //sets information of person
  var number = document.getElementById('list').rows.length - 1;
  var grade = setGrade();
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var accuser = document.getElementById('accuser').value;
  var article = document.getElementById('article').value;
  var points = getPoints(article);

  //adds info to cell
  cellInput.push(number); cellInput.push(grade); cellInput.push(name); cellInput.push(date); cellInput.push(accuser); cellInput.push(article); cellInput.push(points); cellInput.push(0);

  //set style of row
  for(var i = 0; i < row.cells.length; i++){
    row.cells[i].innerHTML = cellInput[i];
    row.cells[i].style.border = "1px solid transparent"
    row.cells[i].style.borderBottom = "1px solid rgba(215, 215, 215, 0.4)"
    row.cells[i].style.borderRadius = "20px"
    row.cells[i].style.backgroundColor = "rgba(231, 231, 231, 0.55)"
  }
}

function setGrade(){
  if(document.getElementById('one').checked){
    return document.getElementById('one').value;
  }
  else if(document.getElementById('two').checked){
    return document.getElementById('two').value;
  }
  else if(document.getElementById('three').checked){
    return document.getElementById('three').value;
  }
}
