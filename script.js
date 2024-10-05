
const getById = (id)=>{
    return document.getElementById(id)
}


const loadAllData = async () => {
        let data = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
        data = await data.json();
}