//TODO: set styles using CSSClasses
const socialbar =   '<table >'+
                        '<tr style="height:70px">'+
                            '<td ><a href="https://LinkedIn.com/in/yair-charit"><img id="linkedinIcon" src="Art/icons/white/linkedin.png" class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="mailto:yaircharit@gmail.com"><img id="emailIcon" src="Art/icons/white/email.png"class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="https://github.com/yaircharit"><img id="githubIcon" src="Art/icons/white/github.png"class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="tel:+972-54-440-8838"><img id="phoneIcon" src="Art/icons/white/phone.png" class="thumbnail img-rounded social-icon"></a></td>'+
                            '<td><a href="https://api.whatsapp.com/send?phone=972544408838"><img id="whatsappIcon" src="Art/icons/white/whatsapp.png" class="thumbnail img-rounded social-icon"></a></td>'+
                        '</tr>'+
                    '</table>'

var isNavbarOpen = false;
const navbar = ''+
'<div id="navbar" class="navbar navbar-fixed-top" style="background-color: transparent;height: 62px; position:fixed;">'+
    '<div id="navbarBackground" class="colors navbar-collapsed" style="width:100%; height:65px; position:fixed; opacity:0; z-index:-99;"> </div>'+
    '<div class="container">'+
        // '<div id="navSocial" style="opacity: 0; margin-right:0; float:right">'+
        //     socialbar+
        // '</div>'+
        '<div class="navbar navbar-fixed-top" style="margin-left:2%">'+
            '<div class="navbar-header" >'+
                // '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>+
                '<button type="button" id="toggler" class="navbar-toggle navbar-nav navbar-toggler-right" data-toggle="collapse" data-target=".navbar-collapse" style="margin-right:2%">'+
                    '<span class="icon-bar" ></span>'+
                    '<span class="icon-bar"></span>'+
                    '<span class="icon-bar"></span>'+
                '</button>'+
                '<a href="/" class="img-thumbnail img-circle" style="background-color:transparent; margin-top:5px"><img src="Art/YCLogo/YC_Logo_DarkRed2.png" alt="YCLogo" height="35px"/></a>'+
            '</div>'+
            '<div class="collapse navbar-collapse title" id="myNavbar">'+
                '<ul id="toggle-navbar" class="nav navbar-nav ml-auto" style="width:94%">'+
                    '<li id="navSocial" style="float:right; z-index:1000; margin-right:0">'+socialbar +'</li>'+
                    '<li class="nav-item"><a href="index.html" style="color:white; background-color:transparent;">About</a></li>'+
                    '<li class="dropdown nav-item"><a class="dropdown-toggle" data-toggle="dropdown" href="projects.html" style="color:white; background-color: transparent;">Projects<span class="caret"></span></a>'+
                        '<ul class="dropdown-menu">'+
                            '<li><a href="rps.html">RPS CTF</a></li>'+
                            // '<li><a href="usefull.html">usefull files</a></li>'+
                        '</ul>'+
                    '</li>'+
                    '<li class="nav-item"><a href="Yair Charit - CV2020.pdf" target="parent" style="color:white; background-color:transparent;">Resume</a></li>'+
                    
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