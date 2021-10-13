
//TODO: set styles using CSSClasses
const socialbar =   '<a style="padding:0; background-color: transparent;;" href="https://LinkedIn.com/in/yair-charit"><img id="linkedinIcon" src="Art/icons/white/linkedin.png" class="thumbnail img-rounded social-icon"></a>'+
                    '<a style="padding:0;background-color: transparent;" href="mailto:yaircharit@gmail.com"><img id="emailIcon" src="Art/icons/white/email.png"class="thumbnail img-rounded social-icon"></a>'+
                    '<a style="padding:0;background-color: transparent;" href="https://github.com/yaircharit"><img id="githubIcon" src="Art/icons/white/github.png"class="thumbnail img-rounded social-icon"></a>'+
                    '<a style="padding:0;background-color: transparent;" href="tel:+972-54-440-8838"><img id="phoneIcon" src="Art/icons/white/phone.png" class="thumbnail img-rounded social-icon"></a>'+
                    '<a style="padding:0;background-color: transparent;" href="https://api.whatsapp.com/send?phone=972544408838"><img id="whatsappIcon" src="Art/icons/white/whatsapp.png" class="thumbnail img-rounded social-icon"></a>'

const navbar = ''+
'<div id="navbar" class="navbar navbar-fixed-top" style="background-color: transparent;height: auto; position:fixed;">'+
    '<div id="navbarBackground" class="toggle-navbar colors heightAnimation navbar-collapsed " style="position:fixed; opacity:0; z-index:99;"> </div>'+    
    '<div class="container">'+
        '<div id="navbarContent" class="navbar navbar-fixed-top" style="margin-left:2%; height:auto">'+
            '<div class="navbar-header" >'+
                '<button type="button" id="toggler" class="navbar-toggle navbar-nav navbar-toggler-right" data-toggle="collapse" data-target=".navbar-collapse" style="margin-right:2%">'+
                    '<span class="white-bg icon-bar" ></span>'+
                    '<span class="white-bg icon-bar"></span>'+
                    '<span class="white-bg icon-bar"></span>'+
                '</button>'+
                '<a href="index.html" class="img-thumbnail img-circle" style="background-color:transparent; margin-top:5px"><img src="Art/YCLogo/YC_Logo_DarkRed2.png" alt="YCLogo" height="35px"/></a>'+
            '</div>'+
            '<div class="collapse navbar-collapse title" id="myNavbar">'+
                '<ul id="toggle-navbar" class="nav navbar-nav ml-auto" style="width:94%">'+
                    '<li class="nav-item"><a href="index.html" class="whiteText">About</a></li>'+
                    '<li id="projectsDD" class="dropdown nav-item"><a class="dropdown-toggle whiteText" data-toggle="dropdown" href="projects.html"">Projects<span class="caret"></span></a>'+
                        '<ul class="dropdown-menu">'+
                            '<li><a class="grayText" href="rps.html">RPS CTF</a></li>'+
                            '<li><a class="grayText" href="bookmarks.html">Dashboard+</a></li>'+
                            '<li><a class="grayText" href="autoMail.html">Mail Automation</a></li>'+
                            // '<li><a href="usefull.html">usefull files</a></li>'+
                        '</ul>'+
                    '</li>'+
                    '<li class="nav-item"><a class="whiteText"  href="Yair Charit - CV2021.pdf" target="blank">Resume</a></li>'+
                    '<li id="navSocial" class="horizontal">'+socialbar +'</li>'+
                '</ul>'+

            '</div>'+
        '</div>'+
    '</div>'+
'</div>'

var isNavbarOpen = false
var minHeight, maxHeight
function loadTemplate(){
    document.body.innerHTML += navbar;
    
    let navBG = document.getElementById('navbarBackground');
    let navContent = document.getElementById('navbarContent');
    let toggler = document.getElementById('toggler');
    let projDD = document.getElementById('projectsDD')
    minHeight = navContent.offsetHeight
    toggler.click()
    maxHeight = navContent.offsetHeight
    toggler.click()
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768) {
        navSocial.style.float = "left"   
    }
    else
    {
        navSocial.style.float = "right"
    }
    
    toggler.onclick = function () {
        console.log('height2: ', maxHeight)
        isNavbarOpen = !isNavbarOpen;
        if (isNavbarOpen) {
            navBG.style.maxHeight = `${maxHeight}px`
        }
        else {
            navBG.style.maxHeight = `${minHeight}px`
            isProjOpen = false
        }
        return;
    }   

    var isProjOpen = false;
    projDD.onclick =  function () {
        if (isNavbarOpen) {
            isProjOpen = !isProjOpen
            if (isProjOpen) {
                navBG.style.maxHeight = `${maxHeight + projDD.offsetHeight + 45}px`
            }
            else {
                navBG.style.maxHeight = `${maxHeight}px`
            }
        }
    }
    
}
