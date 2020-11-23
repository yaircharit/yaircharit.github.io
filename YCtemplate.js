const socialbar =   '<table style="border-collapse: separate; border-spacing: 20px;">'+
                        '<tr>'+
                            '<td><a href="https://LinkedIn/in/yair-charit"><img src="Art/icons/linkedin.png" class="thumbnail img-rounded" style="height: 35px; border-radius: 25px; border: 1px solid black;"></a></td>'+
                            '<td><a href="mailto:yaircharit@gmail.com"><img src="Art/icons/email.png"class="thumbnail img-rounded"style="height: 35px; border-radius: 25px; border: 1px solid black;" /></a></td>'+
                            '<td><a href="https://github.com/yaicharit"><img src="Art/icons/github.png"class="thumbnail img-rounded"style="height: 35px; border-radius: 25px; border: 1px solid black;" /></a></td>'+
                            '<td><a href="tel:+972-54-440-8838"><img src="Art/icons/phone.png" class="thumbnail img-rounded" style="height: 35px; border-radius: 25px; border: 1px solid black;" /></a></td>'+
                        '</tr>'+
                    '</table>'

const navbar = ''+
'<div class="navbar navbar-fixed-top" style="background-color: white; color: black;height: 62px">'+
    '<div class="container">'+
        '<div id="navSocial" style="float:right; opacity: 0">'+
            socialbar+
        '</div>'+
        '<div class="navbar-header">'+
            '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
            '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>'+
            '<a class="img-thumbnail img-circle" href="index.html"><img src="Art/YCLogo/YC_Logo_DarkRed2.png" alt="YCLogo" height="35"/></a>'+
        '</div>'+
        '<div class="collapse navbar-collapse" id="myNavbar">'+
            '<ul class="nav navbar-nav">'+
                '<li><a href="index.html" style="color:black">About</a></li>'+
                '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="projects.html" style="color:black">Personal Projects<span class="caret"></span></a>'+
                    '<ul class="dropdown-menu">'+
                        '<li><a href="rps.html">RPS CTF</a></li>'+
                        // '<li><a href="usefull.html">usefull files</a></li>'+
                    '</ul>'+
                '</li>'+
                // '<li><a href="workRefs.html">Work Projects</a></li>'+
            '</ul>'+
        '</div>'+
        
    '</div>'+
'</div>'
// '<br><br><br>'

const footer =''+
'<ul class="sidenav">'+
    // '<hr/>'+
    // '<li>Contact me:</li>'+
    '<li><a class="sidenav-object" href="https://www.linkedin.com/in/yair-charit"><img src="Art/icons/linkedin.png" height="30" /></a></li>'+
    '<li><a class="sidenav-object" href="mailto:yaircharit@gmail.com"><img src="Art/icons/email.png" height="30" /></a></li>'+
    '<li><a class="sidenav-object" href="tel:+97254-440-8838"><img src="Art/icons/phone.png" height="30" /></a></li>'+
'</ul>'
function loadTemplate(){
    document.body.innerHTML += navbar;
    // document.body.innerHTML += footer;
}