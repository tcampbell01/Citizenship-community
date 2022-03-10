var submitBtn =document.getElementById('.submit-btn')

console.log("connect to html")
function civicInfo() {
  const apiKey = "AIzaSyDE4huvmH6VOPODWGRYgvl_umZVcfWHB_s";
  var userAddress = document.getElementById('legislatorsVal');
  userAddress = userAddress.innerHTML; 
  // const userAddress = "06095";
  const civicContainer = document.getElementById('civic-rep');

  fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address="+ userAddress + "&includeOffices=true&roles=headOfState&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=executiveCouncil&roles=legislatorUpperBody&roles=legislatorLowerBody&key="+ apiKey)

  // fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address="+ userAddress +" &includeOffices=true&roles=headOfState&roles=headOfGovernment&roles=deputyHeadOfGovernment&roles=governmentOfficer&roles=executiveCouncil&roles=legislatorUpperBody&roles=legislatorLowerBody&roles=highestCourtJudge&roles=judge&roles=schoolBoard&roles=specialPurposeOfficer&key="+ apiKey)
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

