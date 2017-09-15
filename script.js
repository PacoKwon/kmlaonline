function newRow(){
  var table = document.getElementById('list');
  table.insertRow(table.rows.length);
  var row = table.rows[table.rows.length - 1];
  for(var i = 0; i < table.rows[0].cells.length; i++){
    row.insertCell();
  }

  return table.rows[table.rows.length-1];
}

function submitData(){
  var row = newRow();
  var cellInput = [];
  var number = document.getElementById('list').rows.length - 1;
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
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var accuser = document.getElementById('accuser').value;
  var article = document.getElementById('article').value;

  cellInput.push(number); cellInput.push(grade); cellInput.push(name); cellInput.push(date); cellInput.push(accuser); cellInput.push(article); cellInput.push(0); cellInput.push(0);
  for(var i = 0; i < row.cells.length; i++){
    row.cells[i].innerHTML = cellInput[i];
  }
}
