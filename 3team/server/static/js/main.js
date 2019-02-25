document.getElementById('connect').addEventListener('click', async () => {

    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_ADDRESS'
        }
    }))
//    var address = getParameterByAddress("address");
//    console.log("Click Connet");

});


document.getElementById('gameStart').addEventListener('click', async () => {
    var address = getParameterByAddress("address");
    location.href = "./elements.html?address="+address;

});

window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);


function eventHandler(event) {
    var type = event.detail.type;
    var payload = event.detail.payload;

    switch (type) {
        case "RESPONSE_ADDRESS":
            console.log("payload: "+payload)
            if(payload) {
                location.href = "./index.html?address="+payload;
            }
            responseAddress.innerHTML = "> Selected ICX Address : " + payload;
            break;
    }
}

// get방식으로 넘어온 address 를 리턴함
function getParameterByAddress(address) {
    var address = address.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + address + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
