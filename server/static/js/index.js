var iconService = window['icon-sdk-js'];
var IconAmount = iconService.IconAmount;
var IconConverter = iconService.IconConverter;
var IconBuilder = iconService.IconBuilder;
var requestAddress = document.getElementById("request-address");
var responseAddress = document.getElementById("response-address");

window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);
// type and payload are in event.detail
function eventHandler(event) {
    var type = event.detail.type;
    var payload = event.detail.payload;
    switch (type) {
        case "RESPONSE_ADDRESS":
            fromAddress = payload;
            responseAddress.innerHTML = "> Selected ICX Address : " + payload;
            jsonRpc0.disabled = false;
            jsonRpc1.disabled = false;
            jsonRpc2.disabled = false;
            jsonRpc3.disabled = false;
            break;
        default:
    }
}
requestAddress.onclick = function () {
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_ADDRESS'
        }
    }))
};