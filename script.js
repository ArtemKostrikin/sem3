const getNumPage = counter();
let isFetching = false;
const photoContentEl = document.getElementById("photo-container");
const client_id = `B5hPpF6H9ZSj4nCcYhX8bgbMJ0CV9d-K4REwKLrxobM` 

try {
    const fotoData = await getImagesFetch(getNumPage());
    render(fotoData);
} catch (err) {
    alert(err)
}

window.addEventListener("scroll", async function () {
    if (isFetching) {
        return;
    }
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    if (document.documentElement.scrollTop > scrollHeight * 0.70) {
        try {
            const fotoData = await getImagesFetch(getNumPage());
            render(fotoData);
        } catch (err) {
            alert(err)
        }
    }
})

function render(fotoData) {
    const html = showPicture(fotoData);
    photoContentEl.insertAdjacentHTML("beforebegin", html)
}

function getImagesFetch(numPage) {
    isFetching = true;
    return fetch(`https://api.unsplash.com/photos/?client_id=${client_id}&page=${numPage}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Сервер встал")
            }
            return response.json()
        })
        .then(fotoList => {
            return fotoList
        })
        .finally(() => isFetching = false)
}
async function getImagesFetch(numPage) {
    isFetching = true;
    try {
        const response = await fetch(`https://api.unsplash.com/photos/?client_id=${client_id}&page=${numPage}`)
        if (!response.ok) {
            throw new Error("Сервер встал")
        }
        return await response.json();
    } catch (err) {
        throw err
    } finally {
        isFetching = false;
    }
}

function showPicture(array) {
    let imgString = "";
    for (const arrayElement of array) {
        imgString += `<div class="photo">
            <img src="${arrayElement.urls.small}">
        </div>
        `
    }
    return imgString;
}

function counter() {
    let count = 1
    return function () {
        return count++
    }
}

