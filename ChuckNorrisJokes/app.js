const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("joke-btn");

function generateJoke() {
    const xhr = new XMLHttpRequest();

    console.log("Generating joke...");

    xhr.open("GET", "https://api.chucknorris.io/jokes/random");

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const response = JSON.parse(this.responseText);
                jokeEl.innerHTML = response.value;
                console.log(response.value);
            } else {
                jokeEl.innerHTML = "Something went wrong (Not Funny)";
                jokeEl.style.color = "red";
            }
        }
    };

    xhr.send();
}

jokeBtn.addEventListener("click", generateJoke);
