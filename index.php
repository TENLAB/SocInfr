<html>
<head>

<link rel="stylesheet" href="src/style.css">
<title>TenLab - SocInfr</title>
<script type="text/javascript" src="src/mapDraw.js"></script>

<script type="text/javascript">
  window.click = "home";
  window.grid = true;
  window.jsonMap=null;
  window.jsonTabl=null;
  window.onload = function() {  
    mapDraw(); 
    admDraw(); 

    m = document.getElementById("container")
  }
</script>

</head>
<body>

<div class="container">
<div class="btn btn-1 " onclick="prevMin = 200000; prevMax = 0; window.click = 'home'; while (m.children.length>0){m.children[0].remove();}; mapDraw(); admDraw(); m.children[1].style.display= window.grid?'':'none';">Дом</div>
<div class="btn btn-2" onclick="prevMin = 200000; prevMax = 0; window.click = 'job'; while (m.children.length>0){m.children[0].remove();}; mapDraw(); admDraw();m.children[1].style.display= window.grid?'':'none';">Работа</div>
<div class="btn btn-3" onclick="prevMin = 200000; prevMax = 0; window.click = 'day'; while (m.children.length>0){m.children[0].remove();}; mapDraw(); admDraw();m.children[1].style.display= window.grid?'':'none';">День</div>
<div class="btn btn-4" onclick="prevMin = 200000; prevMax = 0; window.click = 'move'; while (m.children.length>0){m.children[0].remove();}; mapDraw(); admDraw();m.children[1].style.display= window.grid?'':'none';">Движение</div>
<div class="btn btn-grid" onclick="window.grid=!window.grid ;m.children[1].style.display= window.grid?'':'none';">Сетка</div>
</div>

<div id="container">  
</canvas>

</body>
</html> 
