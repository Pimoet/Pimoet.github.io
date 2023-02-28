var language = {
    eng: {
        welcome:"Welcome everyone"
    },
    nl: {
        welcome: "welkom iedereen"
    }
}
if (window.location.hash)   {
    if(window.location.hash == "#eng") {
        welcome.textContent = language.eng.welcome; 
    }   
}
;