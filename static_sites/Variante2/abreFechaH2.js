window.onload = () => {
    for (let h2 of document.querySelectorAll("h2"))
        h2.onclick = () =>
            h2.parentElement
              .querySelector(".horizontal-list")
              .classList.toggle("closed");
}