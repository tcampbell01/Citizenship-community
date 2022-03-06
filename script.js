var key = AIzaSyDzObddMVsE1ZuaTA9wUYEUpm1ZXDdua6A
var address (number, street, city, state)
var url = "https://www.googleapis.com/civicinfo/v2/representatives?"+ key + "=&" + address + "="

console.log(url);

  fetch(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

    // fetch("https://www.googleapis.com/civicinfo/v2/representatives?key=&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS", {
    //      "method": "GET",
    //      "headers": {

    //      }
    //  })
 
 

 