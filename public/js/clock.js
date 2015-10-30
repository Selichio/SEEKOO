// clock II - Thomas Salvador, 2010, http://brauchbar.de
// free to use, if this notice is kept intact

function clock_update(id) {
  container = document.getElementById(id);

  var now = new Date();

  var h= now.getHours();
  if  (h <10) { h="0"+h; }
  var m= now.getMinutes();
  if  (m <10) { m="0"+m; }
  var s= now.getSeconds();
  if  (s <10) { s="0"+s; }

  container.innerHTML = h+":"+m+":"+s;
  setTimeout('clock_update("'+id+'")',1000);
}