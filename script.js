
const getById = (id)=>{
    return document.getElementById(id)
}

const createDiv = ()=>{
    return document.createElement('div');
}

const like_section = getById("like_section");
const display_pets_section = getById("display_pets_section");
const spinner = getById("spinner");
const category_btn_section = getById("category_btn_section");
const my_modal_1 = getById("my_modal_1");
// console.log(my_modal_1);


const loadAllPets = async () => {
  
        let data = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
        data = await data.json();
      
        data = data.pets;
        console.log(data);
       
        return data;
}


const btnDesign = async(category, id)=>{

    const data = await loadCategoryBtn();
    // console.log(data);

    const btn = getById(category);
    // console.log(btn);

    
    // btn.classList.add('active');
    
 
    data.map((item)=>{

    
        if(item.id == id){
            const btn = getById(category);
            btn.classList = 'flex justify-between gap-2 items-center border-2  w-fit px-4 py-2 md:px-12 md:py-4 cursor-pointer rounded-full bg-[#0E7A811A]';

            // console.log(item.id, id)
            
        }
        else if(item.id !== id){
            console.log(item.id, id)
            const btn = getById(item.category);
            btn.classList = 'flex justify-between gap-2 rounded-lg items-center border-2  w-fit px-4 py-2 md:px-12 md:py-4 cursor-pointer hover:rounded-full hover:bg-[#0E7A811A]';
        }

    })
}

const loadCategoryWise = async(category, id)=>{
   
    await btnDesign(category, id);
    const flag = await spinnerHandler();
    let data = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    data = await data.json();
    data = data.data;
    console.log(data);

    if(flag){

        if(data.length === 0){

            displayAllPets(data, true);
        }else{
            displayAllPets(data, false);

        }
    }

    

    
   
}



const categoryBtn = null;
const loadCategoryBtn = async ()=>{

    let data = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    data = await data.json();
    data = data.categories;

    return data;
}

const spinnerHandler = async ()=>{

     spinner.classList = "loading loading-bars loading-lg";

     setTimeout(()=>{
        spinner.classList = "loading loading-bars loading-lg hidden";
    }, 2000);
    return true;

}


/**
 * 
 * {
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
}


{
    "id": 1,
    "category": "Cat",
    "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
}
 */

const liked = async (id)=>{

    const data = await loadAllPets();
    const pet = data.find(pet => pet.petId === id);
    console.log(pet);
    if(pet){
        const div = createDiv();
        div.innerHTML = `  <div class=" flex justify-center items-center">
                        <img class="rounded-lg" src="${pet.image}" alt="">
                    </div>`;


        like_section.appendChild(div);
    }
}


const showDetails = async(id) =>{
    const data = await loadAllPets();
    const pet = data.find(pet => pet.petId === id);
    
    my_modal_1.innerHTML = "";
    const div = createDiv();

    div.innerHTML = `
 <div class="relative bg-white rounded-2xl flex flex-col overflow-y-auto  mx-auto p-4 w-5/6 max-h-[400px] sm:max-h-[500px] md:w-[500px] lg:w-[800px] md:h-[500px] lg:h-[600px]">

    
    <!-- image thumbnail -->
    <figure class="p-4 flex justify-center ">
        <img src="${pet?.image}" alt="Shoes" class="rounded-xl object-cover w-full sm:w-4/6 md:w-4/6 lg:w-3/5" />
    </figure>

    <div class="card-body items-start p-4">
        <h2 class="card-title text-left text-lg md:text-xl lg:text-2xl">${pet?.pet_name || 'Not available'}</h2>

        <div class="flex flex-wrap gap-8">
            <div class="flex gap-1 items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>
                </div>
                <p>Breed: ${pet?.breed || "Not available"}</p>
            </div>

            <div class="flex gap-1 items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                    </svg>
                </div>
                <p>Birth: ${pet?.date_of_birth || "No available"}</p>
            </div>

            <div class="flex gap-1 items-center">
                <div>
                    <img class="w-5 h-5" src="./gender.png" alt="">
                </div>
                <p>Gender: ${pet?.gender || "Not available"}</p>
            </div>

            <div class="flex gap-1 items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <p>Price: ${pet.price || "Not available"}</p>
            </div>
        </div>

        <div class="flex w-full flex-col m-0 p-0">
            <div class="divider m-0 p-0"></div>
        </div>

        <div class="flex justify-start items-center">
            <p class="text-start text-gray-500">${pet.pet_details}</p>
        </div>

        <div class="flex justify-between items-center w-full">
        </div>
    </div>

  <div class="modal-action p-0 m-0 absolute top-[0px] right-[0px]">
        <form method="dialog">
            <button class="btn rounded-full m-2 py-1">❌</button>
        </form>
    </div>
    <div class="modal-action p-0 m-0 ">
        <form method="dialog">
            <button class="btn rounded-lg text-[#0E7A81] m-2">Close</button>
        </form>
    </div>
</div>



  
    `;

    my_modal_1.appendChild(div);
    my_modal_1.showModal();

}

const displayCategoryBtn = async()=>{

 const data = await loadCategoryBtn();
      
    data.map((item)=>{
       const div = createDiv();
       div.innerHTML = `<div onclick="loadCategoryWise('${item.category}', '${item.id}')" class="flex justify-between gap-2 items-center border-2 rounded-lg w-fit px-4 py-2 md:px-12 md:py-4 cursor-pointer hover:rounded-full hover:bg-[#9fd3d61a] transition-all ease-linear duration-300" id='${item.category}'>
                   <div>
                       <img class="w-4/6 md:w-full" src="${item.category_icon}" alt="">
                   </div>
                   <h3 class="text-xl md:text-3xl font-bold">${item.category}</h3>
               </div>`
               category_btn_section.appendChild(div);
    })
   
   }

const displayAllPets = async(pets="", operation=false)=>{

    if(pets=="" && operation == false){
        
        pets = await loadAllPets();
    }
    display_pets_section.innerHTML = "";
    console.log(pets);

    if(pets.length === 0 && !operation === false){
        const div = createDiv();
        div.innerHTML = `<div class="flex flex-col justify-center items-center gap-4">
            <div>
                <img src="./error.webp" alt="">

            </div>
            <div>
                <h2 class="text-xl font-bold text-center">No Information Available</h2>
                <p class="text-gray-500 text-center">"No Information Available" typically indicates that the requested data or information could not be retrieved or is not currently accessible</p>
            </div>
        </div>`

        display_pets_section.appendChild(div);
    }else{
        pets.map((pet)=>{
            const div = createDiv();
            div.innerHTML = `
            <div class="card bg-base-100 w-80 shadow-xl border-2"> 
            <figure class="p-4">
            <img
            src="${pet?.image}"
            alt="Shoes"
                            class="rounded-xl" />
                            </figure>
                        <div class="card-body items-start p-4">
                          <h2 class=" card-title text-left">${pet?.pet_name || 'Not available'}</h2>
                           <div class="flex gap-1 items-center">
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                  </svg>
                                  
                              </div>
                              <p>Breed: ${pet?.breed || "Not available"}</p>
                           </div>
                           <div class="flex gap-1 items-center">
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                                  </svg>
                                  
                                  
                              </div>
                              <p>Birth: ${pet?.date_of_birth || "No available"}</p>
                           </div>
                           <div class="flex gap-1 items-center">
                              <div>
                              <img class="w-5 h-5" src="./gender.png" alt="">
                              
                              </div>
                              <p>Gender: ${pet?.gender || "Not available"}</p>
                              </div>
                              <div class="flex gap-1 items-center">
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                  
                                  
                                  
                                  </div>
                                  <p>Price: ${pet.price || "Not available"}</p>
                                  </div>
                                  
                                  <div class="flex w-full flex-col m-0 p-0">
                                  
                                  <div class="divider m-0 p-0"></div>
                                  
                                  </div>
    
                                  <div class="flex justify-between items-center w-full">

                                  <div onclick='liked(${pet.petId})' class=" btn  bg-transparent shadow-none border-1" >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                  </svg>
                                  
                            </div>
                            <div>
                            <button class="btn bg-transparent shadow-none border-1  text-[#0E7A81]">Adopt</button>
                            </div>
                           <div>
                           <button type="button"  onclick='showDetails(${pet.petId})' class="btn bg-transparent shadow-none border-1  text-[#0E7A81]">Details</button>
                           </div>
                           </div>
                           </div>
                           </div>
            `
            
            display_pets_section.appendChild(div);
            
        })
    }
  
}



const main = async ()=>{
    // spinnerHandler();
    
    await loadAllPets();
    await displayCategoryBtn();
    await  displayAllPets();
    // await spinnerHandler();
    
    
}


main();

