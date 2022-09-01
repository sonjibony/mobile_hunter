const loadMobile = (searchField,dataLimit) => {
const url = ` https://openapi.programming-hero.com/api/phones?search=${searchField}`
fetch(url)
.then (res => res.json ())
.then (data => displayMobile(data.data,dataLimit))
}

const displayMobile = (mobiles,dataLimit) =>{
const mobileContainer = document.getElementById('mobile-container');
mobileContainer.innerHTML='';
//display less mobiles


const seeMore = document.getElementById('see-more')
if(dataLimit && mobiles.length>10){
    mobiles= mobiles.slice(0,10)
    seeMore.classList.remove('d-none');
}
else{
    seeMore.classList.add('d-none');
}
const noMatch = document.getElementById('no-match')
if(mobiles.length===0){
    noMatch.classList.remove('d-none')
}
else{
    noMatch.classList.add('d-none');
}
mobiles.forEach(mobile => {
//console.log(mobile);
const mobileDiv = document.createElement('div');

mobileDiv.classList.add('col') ;
mobileDiv.innerHTML=`
<div class="card p-4">
                <img src="${mobile.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">
                  ${mobile.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <button onclick="loadMobileDetail('${mobile.slug}')" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" >Show Details</button>
                </div>
              </div>

` ;
mobileContainer.appendChild(mobileDiv) ;
});

toggleLoader(false);

//console.log('hiii',mobiles,)

}

const searching = dataLimit =>{
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMobile(searchText,dataLimit);
    
}

 document.getElementById('btn-search').addEventListener('click',function(){
    //spinner start
    searching (10);
 })

 document.getElementById('search-field').addEventListener('keypress',function(e){
if(e.key === 'Enter'){
    searching (10); 
}
 })

const toggleLoader = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading === true){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
document.getElementById('btn-see-more').addEventListener('click',function(){
searching ();

})

const loadMobileDetail =id =>{
const url =`https://openapi.programming-hero.com/api/phone/${id}`;
fetch(url)
.then (res=> res.json())
.then (data => showMobileDetail(data.data));


}

const showMobileDetail = mobile =>{
const modalTitle = document.getElementById('exampleModalLabel');
console.log(mobile);
modalTitle.innerText = mobile.name;
const mobileInfo = document.getElementById('mobile-info');
mobileInfo.innerHTML= `
<p> Release Date : ${mobile.releaseDate? mobile.releaseDate : 'No release date founded'}</p>

<p> Main Features : ${mobile.mainFeatures.storage? mobile.mainFeatures.storage : 'Nothing Founded'}</p>
<p> Display Size : ${mobile.mainFeatures.displaySize? mobile.mainFeatures.displaySize : 'No display size founded.'}</p>
`

}
 loadMobile('apple');
