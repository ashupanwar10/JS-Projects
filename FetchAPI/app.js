const responseEl = document.getElementById("response_here");
console.log(responseEl);

function createPost({ title, body }) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
            title,
            body,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            token: "abc123",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            responseEl.textContent = JSON.stringify(data, undefined, 4);
        });
}

createPost({
    title: "Hello World",
    body: "This is a sample post",
});
