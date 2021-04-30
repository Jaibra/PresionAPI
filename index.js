//1.Declarar las variables globales
const APIKEY = "e52d03ce420045e9a7381dc0944079d0";
const url = new URL("https://api.weatherbit.io/v2.0/current");
url.searchParams.set('key', APIKEY);

const inputCity1 = document.createElement('input');

const inputCity2 = document.createElement('input');
const button = document.createElement('button')
button.textContent = "Compare";

document.body.appendChild(inputCity1);
document.body.appendChild(inputCity2);
document.body.appendChild(button);

button.addEventListener("click", () => {
    // console.log(inputCity1.value, inputCity2.value);
    const url1 = new URL(url);
    const url2 = new URL(url);
    url1.searchParams.set("city", inputCity1.value);
    url2.searchParams.set("city", inputCity2.value);
    Promise.all([fetch(url1), fetch(url2)])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(jsons => {
        const result = jsons.sort((a,b)=>{
            return a.data[0].pres - b.data[0].pres;
        })
        .map(json=> `${json.data[0].city_name} con presion de ${json.data[0].pres}mb`)
        .join(' es menor que ')
        const h3 = document.createElement('h3');
        h3.innerText = result;
        document.body.appendChild(h3);
    })
    .catch(error => {
        alert("Error!")
    });
});

//2.Crear los inputs y el boton
//3.Tomar la info d elos inputs y crear los url
//4.Comparar la respuesta de la 1era con la 2da
//5.Renderizar