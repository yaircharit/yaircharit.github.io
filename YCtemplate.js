const navbar = ''+
'<div class="navbar navbar-inverse navbar-fixed-top">'+
    '<div class="container">'+
        '<div class="navbar-header">'+
            '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
            '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>'+
            '<a class="img-thumbnail img-circle" href="index.html"><img src="Art/YCLogo/YC_Logo_DarkRed2.png" alt="YCLogo" height="35"/></a>'+
        '</div>'+
        '<div class="collapse navbar-collapse" id="myNavbar">'+
            '<ul class="nav navbar-nav">'+
                '<li><a href="index.html">About</a></li>'+
                '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="">Personal Projects<span class="caret"></span></a>'+
                    '<ul class="dropdown-menu">'+
                        '<li><a href="rps.html">RPS</a></li>'+
                        '<li><a href="tetris.html">Tetris.asm</a></li>'+
                    '</ul>'+
                '</li>'+
                '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="">Work Experience<span class="caret"></span></a>'+
                    '<ul class="dropdown-menu">'+
                        '<li><a href="dina.html">dina.co.il</a></li>'+
                    '</ul>'+
                '</li>'+
            '</ul>'+
        '</div>'+
    '</div>'+
'</div>'+
'<br><br><br>'

const footer =''+
'<ul class="nav navbar-nav navbar-fixed-bottom row">'+
    // '<hr/>'+
    '<li>Contact me:</li>'+
    '<li><a href="https://www.linkedin.com/in/yair-charit"><img src="Art/icons/linkedin.png" height="30" /></a></li>'+
    '<li><a class="navbar-brand" href="mailto:yaircharit@gmail.com"><img src="Art/icons/email.png" height="30" /></a></li>'+
    '<li><a class="navbar-brand" href="tel:+972-440-8838"><img src="Art/icons/phone.png" height="30" /></a></li>'+
'</ul>'
function loadTemplate(){
    document.body.innerHTML += navbar;
    document.body.innerHTML += footer;
}