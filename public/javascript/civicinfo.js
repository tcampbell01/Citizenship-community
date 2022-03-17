async function getApi() {
  // fetch('/config.json').then(function(config) {
  //   console.log('API key:', config.apiKey);
  //   console.log(config.json(), config.text());
  // });
    const config = await fetch('/config.json')
    const result = await config.json();
    console.log(result.apiKey);
    return result.apiKey
}

async function civicInfo() {
  // const apiKey = "AIzaSyDE4huvmH6VOPODWGRYgvl_umZVcfWHB_s";
  var userAddress = document.getElementById('legislatorsVal');
  userAddress = userAddress.innerHTML; 
  const civicContainer = document.getElementById('civic-rep');
  const url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" + userAddress + "&includeOffices=true&roles=headOfState&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=executiveCouncil&roles=legislatorUpperBody&roles=legislatorLowerBody&key="+ await getApi();
  
  // const url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" + userAddress + "&includeOffices=true&roles=headOfState&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=executiveCouncil&roles=legislatorUpperBody&roles=legislatorLowerBody&key="+ apiKey;

  fetch(url)
  .then(response => {
    console.log(response);
    return response.json();
  })
  . then(data => {
    console.log(data)
 
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
