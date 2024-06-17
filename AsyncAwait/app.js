// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve({ name: "John" });
//     }, 2000);
// });

async function getPromise() {
    const response = await promise;
    console.log(response);
}

// getPromise();

// FetchAPI

async function getUsers1() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
}

// getUsers();

// Arrow Functions

const getPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
};

// getPosts();

// Error Handling

const getUsers = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users1"
        );

        if (!response.ok) {
            throw new Error("An error occurred");
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

getUsers();
