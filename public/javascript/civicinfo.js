var submitBtn =document.getElementById('.submit-btn')

console.log("connect to html")
function civicInfo() {
  const apiKey = "AIzaSyDE4huvmH6VOPODWGRYgvl_umZVcfWHB_s";
  const userAddress = "06095";
  const civicContainer = document.getElementById('civic-rep');

  // fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address="+ userAddress + "&includeOffices=true&roles=headOfState&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=executiveCouncil&roles=legislatorUpperBody&roles=legislatorLowerBody&key="+ apiKey)

  fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address="+ userAddress +" &includeOffices=true&roles=headOfState&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=executiveCouncil&roles=legislatorUpperBody&roles=legislatorLowerBody&roles=highestCourtJudge&roles=judge&roles=schoolBoard&roles=specialPurposeOfficer&key="+ apiKey)
  .then(response => {
    console.log(response);
    return response.json();
  })
  . then(data => {
    console.log(data)
    console.log(data.officials[0].name)
    console.log(data.officials[0].party)
    console.log(data.offices[2].name)
    console.log(data.offices[3].name)
    console.log(data.offices[4].name)

    // const repNameEl = document.createElement("h6");
    // repNameEl.textContent = "Your " + data.normalizedInput.state + " Representatives are: " + data.officials[2].name + " * " + data.officials[3].name + " * " + data.officials[4].name + " * " + data.officials[5].name + " * " + data.officials[6].name + " * " + data.officials[7].name + " * " + data.officials[8].name + " * " + data.officials[9].name + " * " + data.officials[10].name;
    // repNameEl.classList.add("is-size-5", "has-text-weight-bold");
    // civicContainer.appendChild(repNameEl);

    // const repPartyEl = document.createElement("h6");
    // repPartyEl.textContent =  data.officials[0].party;
    // repPartyEl.classList.add("is-size-5", "has-text-weight-bold");
    // civicContainer.appendChild(repPartyEl);


    // Joseph we changed the code to show the legislators that the users need to know for interview
    // they also need to know the Mayor, but that's wasnt available, so we'll ignore for now
    
    // below is the data for offices, if you still need it

    // const repOfficeEl = document.createElement("h6");
    // repOfficeEl.textContent =  data.offices[0].name;
    
    // this is data for what is now showing on the page
    const senatorEl = document.createElement("h6");
    senatorEl.textContent = "Your Senators = " + data.officials[2].name + " and " + data.officials[3].name; 
    const usRepEl = document.createElement("h6");
    usRepEl.textContent = "Your US Representative = " + data.officials[4].name 
    const govRepEl = document.createElement("h6");
    govRepEl. textContent = "Your Governor = " + data.officials[5].name; 
    
    // repPartyEl.classList.add("is-size-5", "has-text-weight-bold");
    civicContainer.appendChild(senatorEl);
    civicContainer.appendChild(usRepEl);
    civicContainer.appendChild(govRepEl);
  });
}

civicInfo();

// async function civicInfo(event) {
//   event.preventDefault();

//   const apiKey = "AIzaSyDE4huvmH6VOPODWGRYgvl_umZVcfWHB_s";
//   const civicContainer = document.getElementById('civic-rep');

//   console.log('button clicked');
//   fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" + userAddress + "legislatorLowerBody&key="+ apiKey)
//   .then(response => {
//     console.log(response);
//     return response.json();
//   })
//   . then(data => {
//     console.log(data)
//     console.log(data.officials[0].name)
//     console.log(data.officials[0].party)

//     const repNameEl = document.createElement("h6");
//     repNameEl.textContent = "Your Representative is: " + data.officials[0].name;
//     repNameEl.classList.add("is-size-5", "has-text-weight-bold");
//     civicContainer.appendChild(repNameEl);

//     const repPartyEl = document.createElement("h6");
//     repPartyEl.textContent =  data.officials[0].party;
//     repPartyEl.classList.add("is-size-5", "has-text-weight-bold");
//     civicContainer.appendChild(repPartyEl);
//   });
// }

// document.querySelector('.submit-btn').addEventListener('click', civicInfo);

