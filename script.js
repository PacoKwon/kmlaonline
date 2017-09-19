//two-dimensional array. first array includes articles. second array includes penalty points respective to articles in first array. *incomplete*
var articles = [["Violated self-study regulation", "Violated outdoor regulation (2)", "Violated outdoor regulation (5)", "Late for school", "Absent from school", "Dress code", "Destroyed school property", "Violated cleaning regulation", "Violated curfew regulation(3)", "Violated curfew regulation(8)", "Violated food regulation(2)", "Violated food regulation(10)", "Violated computer regulation", "Used electronic device", "EOP Violation", "Lied", "Absent from Court", "Late for Court", "Did not follow teacher's direction(3)", "Did not follow teacher's direction(4)", "Did not follow teacher's direction(5)", "Late for morning exercise", "Absent from morning exercise", "Late for self-study", "Insolent attitude", "Auditory Disturbance", "Late for honjung", "Absent from honjung"],
[2, 2, 5, 2, 3, 2, 2, 1, 3, 8, 2, 10, 5, 5, 2, 5, 3, 2, 3, 4, 5, 2, 3, 1, 2, 2, 1, 2]];

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
function getInsertIndex(index){
  var table = document.getElementById('list');
  var arr = table.rows;
  for(var i = 0; i < arr.length; i++){
    if(arr[i].cells.length === 8 && arr[i].cells[0].innerHTML == index){
      return i;
    }
  }
}

//place warning sign when at least one form is not filled
function warningText(){
  if(document.getElementsByTagName('h5').length < 1){ //limit warning sign count to 1
    var submit = document.getElementById('submit');
    var warning = document.createElement('h5');
    warning.innerHTML = "*fill in all forms to submit*";
    warning.style.textAlign = "center";
    warning.style.color = "red";
    submit.appendChild(warning);
  }
}
//reset all article boxes to empty strings
function resetArticle(){
  var article = document.getElementsByTagName('datalist');
  for(var i = 0; i < article.length; i++){
    article[i].previousElementSibling.value = "";
  }
}
//add article box
function addArticleBox(){
  var div = document.createElement('div');
  var box = document.getElementById('articleBox');
  div.innerHTML = '<input class="radius" id="article" list="articlelist" placeholder=" Select Violation"/> <datalist id="articlelist"></datalist>';
  box.appendChild(div);
}
//remove article box
function removeArticleBox(){
  var box = document.getElementById('articleBox');
  if(box.children.length > 1){
    box.removeChild(box.lastChild);
  }
}

//submit function. Triggered on button click
function submitData(violation){
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
  var article = violation;
  var points = getPoints(article);

  if(grade != undefined && name != "" && date != "" && accuser != "" && article != "")
  {
    //remove warning sign when all forms filled in and warning sign displayed on div box
    if(document.getElementsByTagName('h5').length == 1){
      var submit = document.getElementById('submit');
      submit.removeChild(submit.lastChild);
    }

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
  else{
    warningText();
  }
  sortList();
}

//triggerd on submit button click. loops through datalist to pass article values as parameters
function appendData(){
  var arr = document.getElementsByTagName('datalist');
  for(var i = 0; i < arr.length; i++){
    submitData(arr[i].previousElementSibling.value);
  }
  resetArticle();
}

//sort people by article count
function sortPeople(){
  var i, j, k, tmp;
  for(i = 0; i < people.length - 1; i++){
    k = i;
    for(j = i; j < people.length; j++){
      if(people[k].count < people[j].count) k = j;
    }
    tmp = people[k];
    people[k] = people[i];
    people[i] = tmp;
  }
}

//sorts list
function sortList(){
  sortPeople();

  var rowList = [];
  var table = document.getElementById('list');
  var len = table.rows.length;

  for(var i = 0; i < people.length; i++){
    var row = [];
    var index = getInsertIndex(findPerson(people[i].name, people[i].grade));

    table.rows[index]
    for(var j = 0; j < people[i].count; j++){
      row.push(table.rows[index + j]);
    }
    row.reverse();
    rowList.push(row);
  }
  rowList.reverse();

  for(var i = 1; i < len; i++){
    table.deleteRow(1);
  }

  for(var i = 0; i < rowList.length; i++){
    for(var j = 0; j < rowList[i].length; j++){
      table.insertRow(1);
      cloneRow(1, rowList[i][j]);
    }
  }

  for(var i = 1; i < table.rows.length; i++){
    if(table.rows[i].cells.length === 8){
      table.rows[i].cells[0].innerHTML = getNumber(table.rows[i].cells[2].innerHTML)[0];
      for(var j = 0; j < overlap.length; j++){
        table.rows[i].cells[overlap[j]].rowSpan = getNumber(table.rows[i].cells[2].innerHTML)[1];
      }
    }
  }
}
//No property 바꾸는 거 해야 함!
//한꺼번에 No. property랑 rowspan 바꾸면 될 듯!

//clones all innerHTML and styles into new row
function cloneRow(index, row){
  var table = document.getElementById('list');
  for(var i = 0; i < row.cells.length; i++){
    table.rows[index].insertCell(0);
  }
  for(var i = 0; i < row.cells.length; i++){
    table.rows[1].cells[i].innerHTML = row.cells[i].innerHTML;
    table.rows[1].cells[i].style.border = "1px solid transparent"
    table.rows[1].cells[i].style.borderBottom = "1px solid rgba(215, 215, 215, 0.4)"
    table.rows[1].cells[i].style.borderRadius = "20px"
    table.rows[1].cells[i].style.backgroundColor = "rgba(231, 231, 231, 0.55)"
  }
}

//returns an array. first element is the no. property, second element is the number of articles
function getNumber(name){
  var ret = [];
  for(var i = 0; i < people.length; i++){
    if(people[i].name === name){
      people[i].number = i+1;
      ret.push((i+1)+"");
      ret.push(people[i].count+"");

      return ret;
    }
  }
}
