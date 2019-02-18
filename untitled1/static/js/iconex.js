var requestAddress = document.getElementById("request-address");
var responseAddress = document.getElementById("response-address");

window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);

// type and payload are in event.detail
function eventHandler(event) {
    var type = event.detail.type;
    var payload = event.detail.payload;

    switch (type) {
        // connect iconex
        case "RESPONSE_ADDRESS":
            console.log("payload: "+payload)
            if(payload) {
                alert(payload);
                location.href = "./index.html?address="+payload;
//                계정 가져오기
            }
            responseAddress.innerHTML = "> Selected ICX Address : " + payload;
            break;
    }
}

requestAddress.onclick = function () {
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_ADDRESS'
        }
    }))
};

