// assumindo que ninguem vai ler este codigo...
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").disabled = true;
    document.querySelector("button").style.opacity = "0.5"
    if (~location.search.indexOf("=")) {
        document.querySelector("#titulo").innerHTML =
            (location.search.substr(-1) == 1
              ? (parent.addNotification("./ecra-comida/imgs/bebida/Compal.jpeg")
			  , "<span style='color:green'>Ganhaste um suminho!</span>")
              : "<span style='color:red'>Oops... Erraste!</span>"
            ) + " <br><span style='font-size:large'>"
			  + " Volta mais tarde, quando a próxima música começar</span>"
        document.querySelector("legend").style.opacity = "0.5";
        document.querySelector("fieldset").disabled = true;
        document.getElementById(location.search.split("=")[1]).checked = true;
        document.querySelectorAll("label").forEach(label => {
            label.style.color = "red";
            label.parentElement.classList.add("disabled");
        });
        document.querySelector("label").style.color = "green";
        document.querySelector(".radioButton").style.backgroundColor = "#BDF";
    } else {
        document.querySelectorAll(".radioButton").forEach(radio => {
            radio.addEventListener("click", e => {
                radio.querySelector("input[type='radio']").checked = true;
                document.querySelector("button").disabled = false;
                document.querySelector("button").style.opacity = 1
            })
        });
    }
});
// PS: Isto contaminou as linhas 132-134 do /script.js (backButton.onclick)
