var apiKey = "AIzaSyDE4huvmH6VOPODWGRYgvl_umZVcfWHB_s";
var userAddress = "06095";
var civicContainer = document.getElementById('civic-rep');
var submitBtn =document.getElementById('.submit-btn')

console.log("connect to html")
function civicInfo() {
  fetch("https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" + userAddress + "&roles=legislatorLowerBody&key="+ apiKey)
  .then(response => {
    console.log(response);
    return response.json();
  })
  . then(data => {
    console.log(data)
    console.log(data.officials[0].name)
    console.log(data.officials[0].party)

    var repNameEl = document.createElement("h6");
    repNameEl.textContent = "Your Representative is: " + data.officials[0].name;
    repNameEl.classList.add("is-size-5", "has-text-weight-bold");
    civicContainer.appendChild(repNameEl);

    var repPartyEl = document.createElement("h6");
    repPartyEl.textContent =  data.officials[0].party;
    repPartyEl.classList.add("is-size-5", "has-text-weight-bold");
    civicContainer.appendChild(repPartyEl);
  });
}

civicInfo();
