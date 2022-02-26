function getJSONData(url) {
    return fetch(url)
        .then((response) =>{
            if (response.ok) {
                return response.json();
            }
            else {
                throw Error(response.statusText);
            }
        })
        .catch( (error) => {
            console.log(error);
        });
}

function getPeople(url) {
    return getJSONData(url);
}

// build html elements
function renderMajorPlayers(people, peopleInfo){
    const peopleList = peopleInfo.children[1];

    peopleList.innerHTML = "";

    people.forEach((person) => {
        let mainListItem = document.createElement("tr");
        mainListItem.innerHTML = `
            <td>${person.name}</td>
            <td>${person.birth_year}</td>
            <td>${person.gender}</td>
            `;

        mainListItem.appendChild(mainListItem);
    });
}

function renderMajorPlayers(peopleData) {
    console.log(peopleData);
}

function showPeople(url = "https://swapi.dev/api/people/") {
    getPeople(url).then( (data) =>{
        console.log(data);
        const endResults = data.results;

        const peopleInfoElement = document.getElementById("peopleInfo");

        renderMajorPlayers(endResults, peopleInfoElement);

        if (data.next) {
            const next = document.getElementById("next");

            next.onclick = () => {
                showPeople(data.next);
            };
        }

        if (data.previous) {
            const previous = document.getElementById("previous");

            previous.onclick = () => {
                showPeople(data.previous);
            };
        }
    });
}

function getPeopleDetails(url) {
    getPeople(url).then( (data) => {
        renderMajorPlayers(data);
    });
}

showPeople();