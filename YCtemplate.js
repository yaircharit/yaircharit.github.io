//TODO: set styles using CSSClasses
const socialbar =   '<table>'+
                        '<tr style="height:70px">'+
                            '<td><a href="https://LinkedIn.com/in/yair-charit"><img id="linkedinIcon" src="Art/icons/linkedin.png" class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="mailto:yaircharit@gmail.com"><img id="emailIcon" src="Art/icons/email.png"class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="https://github.com/yaircharit"><img id="githubIcon" src="Art/icons/github.png"class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="tel:+972-54-440-8838"><img id="phoneIcon" src="Art/icons/phone.png" class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="https://api.whatsapp.com/send?phone=972544408838"><img id="whatsappIcon" src="Art/icons/whatsapp.png" class="thumbnail img-rounded social-icon"></a></td>'+
                        '</tr>'+
                    '</table>'

const navbar = ''+
'<div id="navbar" class="navbar navbar-fixed-top" style="background-color: transparent;height: 62px; position:fixed;">'+
    '<div id="navbarBackground" class="colors" style="width:100%; height:65px; position:fixed; opacity:0; z-index:-99;"> </div>'+
    '<div class="container"  style=" width: 100%">'+
        '<div id="navSocial" style="opacity: 0; margin-right:0; float:right">'+
            socialbar+
        '</div>'+
        '<div style="margin-left: 0">'+
            '<div class="navbar-header" >'+
                // '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>+
                '<button type="button" class="navbar-toggle navbar-nav" data-toggle="collapse" data-target=".navbar-collapse" style="float: left; margin-top:0; display: block;">'+
                '<a class="img-thumbnail img-circle" style="background-color:transparent; "><img src="Art/YCLogo/YC_Logo_DarkRed2.png" alt="YCLogo" height="35px"/></a></button>'+
            '</div>'+
            '<div class="collapse navbar-collapse" id="myNavbar">'+
                '<ul id="toggle-navbar" class="nav navbar-nav ">'+
                    '<li><a href="index.html" style="color:white; background-color:transparent;">About</a></li>'+
                    '<li class="dropdown "><a class="dropdown-toggle" data-toggle="dropdown" href="projects.html" style="color:white; background-color: transparent;">Projects<span class="caret"></span></a>'+
                        '<ul class="dropdown-menu">'+
                            '<li><a href="rps.html">RPS CTF</a></li>'+
                            // '<li><a href="usefull.html">usefull files</a></li>'+
                        '</ul>'+
                    '</li>'+
                    '<li><a href="YC_CV2020.pdf" target="parent" style="color:white; background-color:transparent;">Resume</a></li>'+
                    // '<li><a href="workRefs.html">Work Projects</a></li>'+
                '</ul>'+
            '</div>'+
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


function loadSocialBar(){
    document.body.innerHTML += socialbar;
}