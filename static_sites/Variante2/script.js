(function () {
    'use strict';
    var draggableWindow,
        footer,
        notificationArea,
        dx,
        dy,
        px,
        py;
        
    function move(e) {
        draggableWindow.style.left = px + e.clientX - dx + "px";
        draggableWindow.style.top = py + e.clientY - dy + "px";
    }
    
    function updateClock(clock) {
        clock.innerHTML = new Date().toLocaleTimeString() + "&nbsp";
    }
    
    // aquelas <img>s nao se animam sozinhas. vamos anima-las manualmente:
    function f___ingAnimate(img) {
        var progress = 0.00; // 0 -> inicio, 1 -> fim
        
        function anim() {
            var angle = 30 * Math.sin(2 * 2 * Math.PI * progress),
                scale = 1 + 2 * (-4 * progress * progress + 4 * progress);
            img.style.transform = "rotate(" + angle + "deg) " +
                                  "scale(" + scale + ")";
            
            progress += 2 / 60; // assumindo que isto corre a 60fps
            if (progress <= 1) {
                window.requestAnimationFrame(anim);
            } else {
                img.style.transform = "";
            }
        }
        
        window.requestAnimationFrame(anim);
    }
    
    
    document.addEventListener("DOMContentLoaded", function () {
        draggableWindow = document.body;
        footer = document.getElementsByTagName("footer")[0];
        notificationArea = document.getElementById("notification-area");
        
        var header = document.getElementsByTagName("header")[0],
            minimizeButton = document.getElementById("minimize-btn"),
            maximizeButton = document.getElementById("maximize-btn"),
            exitButton = document.getElementById("exit-btn"),
            iframe = document.getElementsByTagName("iframe")[0],
            backButton = document.getElementById("back-button"),
            clock = document.getElementById("clock"),
            computedStyle = window.getComputedStyle(draggableWindow);
        
        px = parseInt(computedStyle.left, 10);
        py = parseInt(computedStyle.top, 10);

        if (/mobile/i.test(navigator.userAgent)) {
            // para ficar bem no meu telemovel 3:)
            draggableWindow.style.height = "450px";
            draggableWindow.style.top = "20px";
        }
        
        header.addEventListener("mousedown", function (e) {
            dx = e.clientX;
            dy = e.clientY;

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", function (e) {
                px = parseInt(draggableWindow.style.left, 10);
                py = parseInt(draggableWindow.style.top, 10);
                document.removeEventListener("mousemove", move);
            });
        });
        
        minimizeButton.addEventListener("click", function (e) {
            if (draggableWindow.classList.toggle("minimized")) {
                minimizeButton.setAttribute("src", "imgs/restore.svg");
            } else {
                minimizeButton.setAttribute("src", "imgs/minimize.svg");
            }
        });
        
        maximizeButton.addEventListener("click", function (e) {
            location.assign(iframe.contentWindow.location);
        });
        
        exitButton.addEventListener("click", function (e) {
            if (window.confirm("Tem a certeza que pretende sair da sua conta"
                                   + "do iPub?")) {
                draggableWindow.classList.add("fechado");
                
                setTimeout(function () {
                    draggableWindow.style.display = "none";
                }, 250);
                
                document.addEventListener("click", function (e) {
                    if (e.target === draggableWindow.parentElement) {
                        location.reload();
                    }
                });
            }
        });
        
        iframe.addEventListener("load", function (e) {
            var backgroundColor,
                path = iframe.contentWindow.location.pathname;

            switch (path.split("/").slice(-2)[0]) {
            case "ecra-inicial":
            case "ecra-interagir":
            case "ecra-social":
                backgroundColor = "#52AA5E";
                break;
            case "ecra-comida":
                backgroundColor = "#8ACE8E";
                break;
            default:
                backgroundColor = "transparent";
            }
            
            footer.style.background = backgroundColor + " "
                                    + "linear-gradient(rgba(0,0,0, 0.00) 0%,"
                                    +                 "rgba(0,0,0, 0.25) 25%,"
                                    +                 "rgba(0,0,0, 0.50) 100%)";
        });
        
        backButton.addEventListener("click", function () {
            var iLocation = iframe.contentWindow.location;
            if (!iLocation.pathname.endsWith("/ecra-inicial/index.html")) {
                iframe.contentWindow.history.go(iLocation.search ? -2 : -1);
            }
        });
        
        updateClock(clock);
        setInterval(updateClock, 1000, clock);
    });
    
    
    // Public functions
    window.addNotification = function (imgSrc, clickHandler) {
        var img = document.createElement("img");
        img.src = imgSrc;
        img.className = "wiggle-animation"; // nao funciona :(
        img.width = 15;
        img.height = 15;
        notificationArea.appendChild(img);
        
        f___ingAnimate(img);
        
        if (typeof clickHandler === "function") {
            img.addEventListener("click", clickHandler);
        }
    };
    
    window.zacariasVaiAhFalencia = function () {
        document.getElementById("user-balance").textContent = "-9.999.999,99€";
    };
    
}());
