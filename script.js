//two-dimensional array. first array includes articles. second array includes penalty points respective to articles in first array. *incomplete*
var articles = [["Violated self-study regulation", "Violated outdoor regulation", "Late for school", "Dress code", "Destroyed school property", "Violated cleaning regulation", "Violated curfew regulation(3)", "Violated curfew regulation(8)", "Violated food regulation(2)", "Violated food regulation(10)", "Violated computer regulation", "Used electronic device", "EOP Violation", "Lied", "Absent from Court", "Late for Court", "Did not follow teacher's direction(3)", "Did not follow teacher's direction(4)", "Did not follow teacher's direction(5)", "Late for morning exercise", "Absent from morning exercise", "Late for self-study", "Insolent attitude"],
[2, 2, 2, 2, 2, 1, 3, 8, 2, 10, 5, 5, 2, 5, 3, 2, 3, 4, 5, 2, 3, 1, 2]];
//���ڽ� �ҷ���, ��������Ż��, ��������, ������ �ҷ���, ���⹰ �ļա�, ��û�� �ҷ���, ������ ���ݡ�, ������ ������, ����ǰ ����(2)��, ����ǰ ����(10)��, ����ǻ�� ���ݡ�, �������⡱, ��EOP ���ݡ�, ����������, ������ ������, ������ ������, ������ ������(3)��, ������ ������(4)��, ������ ������(5)��, ����ħ�� ������, ����ħ�� ������, ���ڽ� ������

//array for person objects
var people = [];
//index number of cells to be merged
var overlap = [0, 1, 2, 7];

//person object constructor function
function Person(number, grade, name, points){
  this.number = number;
  this.grade = grade;
  this.name = name;
  this.sum = points;
  this.count = 1;
}

//returns new row
function newRow(){
  var table = document.getElementById('list');
  table.insertRow(table.rows.length);
  var row = table.rows[table.rows.length - 1];
  for(var i = 0; i < table.rows[0].cells.length; i++){
    row.insertCell();
  }
  return table.rows[table.rows.length - 1];
}

//returns point value of article
function getPoints(article){
  for(var i = 0; i < articles[0].length; i++){
    if(articles[0][i] === article) return articles[1][i];
  }
}

//returns value of radio
function setGrade(){
  var grade;
  if(document.getElementById('one').checked){
    grade = document.getElementById('one').value;
  }
  else if(document.getElementById('two').checked){
    grade = document.getElementById('two').value;
  }
  else if(document.getElementById('three').checked){
    grade = document.getElementById('three').value;
  }
  return grade;
}

//returns index of row
function findPerson(person, grade){
  for(var index = 0; index < people.length; index++){
    if(people[index].name === person && people[index].grade === grade) return people[index].number;
  }
  return -1;
}

//returns index value of row to be inserted when person is already inside list
function getInsertIndex(num){
  var table = document.getElementById('list');
  var arr = table.rows;
  for(var i = 0; i < arr.length; i++){
    if(arr[i].cells.length === 8 && arr[i].cells[0].innerHTML == num){
      return i;
    }
  }
}

//submit function. Triggered on button click
function submitData(){
  var cellInput = [];
  var person; //object of person being accused
  var row;
  var sum;
  var check;
  var index;
  var insertIndex;
  var table;
  var arr;

  //sets information of person
  var number;
  var grade = setGrade();
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var accuser = document.getElementById('accuser').value;
  var article = document.getElementById('article').value;
  var points = getPoints(article);

  if(grade != undefined && name != "" && date != "" && accuser != "")
  {
    //if person is not in list
    if(findPerson(name, grade) === -1){
      check = 0;

      person = new Person(people.length + 1, grade, name, points);
      //retrives new row
      row = newRow();
      //adds info to cell
      people.push(person);
      number = people.length;
      sum = person.sum;
    }
    //if person is already in list
    else{
      check = 1;

      //gets the no. property of person in the list
      index = findPerson(name, grade);

      //gets person object from people array
      person = people[index-1];

      //index number of new row
      insertIndex = getInsertIndex(index);

      //updates person object's sum point, article count
      person.sum += points;
      person.count += 1;
      sum = person.sum;

      //no. property of person in list
      number = index;

      //inserts row and following cells into table
      table = document.getElementById('list');
      table.insertRow(insertIndex);
      row = table.rows[insertIndex];
      for(var i = 0; i < table.rows[0].cells.length; i++){
        row.insertCell();
      }

    }

    //push data of cells into cellInput(array)
    cellInput.push(number); cellInput.push(grade); cellInput.push(name); cellInput.push(date); cellInput.push(accuser); cellInput.push(article); cellInput.push(points); cellInput.push(sum);

    //push cell information from cellInput, then sets style of row(cells)
    for(var i = 0; i < row.cells.length; i++){
      row.cells[i].innerHTML = cellInput[i];
      row.cells[i].style.border = "1px solid transparent"
      row.cells[i].style.borderBottom = "1px solid rgba(215, 215, 215, 0.4)"
      row.cells[i].style.borderRadius = "20px"
      row.cells[i].style.backgroundColor = "rgba(231, 231, 231, 0.55)"
    }

    /*
      additional procedure required for person already in list
      deletes cells below the row that was inserted last
      then increases rowSpan of top row by 1
    */

    if(check){
      arr = document.getElementById('list').rows;

      //to merge cells using rowSpan, cells [0,1,2,7] below must be deleted first.
      arr[insertIndex + 1].deleteCell(0);
      arr[insertIndex + 1].deleteCell(0);
      arr[insertIndex + 1].deleteCell(0);
      arr[insertIndex + 1].deleteCell(4);

      for(var i = 0; i < overlap.length; i++){
        arr[getInsertIndex(index)].cells[overlap[i]].rowSpan = ""+person.count;
      }
    }
  }
}
