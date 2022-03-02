const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    // console.log(searchText);

    searchField.value = '';
    if (searchText == '') {
        alert("Hello! Please Search by phone name!!");

    }






    else {
        // adding API 

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        // console.log(url);

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));




    }


}


const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if (data == '') {
        alert("Hello! Please Search by valid keywords!!");
    }

    data.slice(0, 20).forEach(data => {
        console.log(data.data);

        const div = document.createElement('div');

        div.classList.add('col');

        div.innerHTML = `<div class="card">
        <img  src="${data.image}" class="card-img-top w-50 mx-auto " alt="...">
        
        <div class="card-body">
            
            <h5 class="card-title">${data.brand}</h5>
            <p class="card-text">${data.phone_name}</p>
            <button onclick= "loadPhoneDetail('${data.slug}')"  type="button" id="btn-explore">Explore</button>
        </div>
    </div>
    `;

        searchResult.appendChild(div);



    })


}
const loadPhoneDetail = phoneId => {

    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));



    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayPhoneDetail(data.data.mainFeatures.sensors))
}
const displayPhoneDetail = data => {
    console.log(data);
    const phoneDetails = document.getElementById('phone-details');

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${data.image}" class="card-img-top w-50 mx-auto " alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <h2>Release Date</h2>
                <p class="card-text">${data.releaseDate ? data.releaseDate : 'Not available'}</p>
                
                <h2>Phone Details</h2>
                <p class="card-text">Storage:${data.mainFeatures.storage}</p>
                <p class="card-text">Display Size:${data.mainFeatures.displaySize}</p>
                <p class="card-text">Chipset:${data.mainFeatures.chipSet}</p>
                <p class="card-text">Memory:${data.mainFeatures.memory}</p>

                <h2>Sensors</h2>
                <p class="card-text">${data.mainFeatures.sensors}</p>
                
                <h2>Others</h2>
                <p class="card-text">WLAN:${data.others ? data.others.WLAN : 'Not available'}</p>
                <p class="card-text">Bluetooth:${data.others ? data.others.Bluetooth : 'Not available'}</p>
                <p class="card-text">GPS:${data.others ? data.others.GPS : 'Not available'}</p>
                <p class="card-text">NFC:${data.others ? data.others.NFC : 'Not available'}</p>
                <p class="card-text">Radio:${data.others ? data.others.Radio : 'Not available'}</p>
                
            </div>
    `;
    phoneDetails.innerHTML = '';
    phoneDetails.appendChild(div);

}
