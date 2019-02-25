var iconService = window['icon-sdk-js'];
var IconAmount = iconService.IconAmount;
var IconConverter = iconService.IconConverter;
var IconBuilder = iconService.IconBuilder;

var address = getParameterByAddress("address");
var score_to = "cx35a03f35326798ca7de6b979a11cca86b81c5e2f";

let current = '';

document.getElementById('redFish').addEventListener('click', async () => {
    var choice = String(0);
    var date = new Date();
    current = String(date.getTime());
    console.log("redFish / current: "+current);

    // var price = Number(price_value);
    // console.log("price: "+price);


    var callTransactionBuilder = new IconBuilder.CallTransactionBuilder; // send transation
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(score_to)
        .nid(IconConverter.toBigNumber(3))
        .value(IconAmount.of(Number(1), IconAmount.Unit.ICX).toLoop())
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconConverter.toBigNumber(10000000))
        .version(IconConverter.toBigNumber(3))
        .method('game_start')
        .params({
            "_choice": choice,
            "_time": current
        })
        .build();

    var score_sdk = JSON.stringify( {
        "jsonrpc":"2.0",
        "method":"icx_sendTransaction",
        "params":IconConverter.toRawTransaction(callTransactionData),
        "id":50889
    })

    var parsed = JSON.parse(score_sdk)
    console.log("parsed: "+parsed);
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', { //
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: parsed,
        }
    }));
});

document.getElementById('skyFish').addEventListener('click', async () => {
    console.log("skyFish");

    var choice = String(1);
    var date = new Date();
    current = String(date.getTime());
    console.log("skyFish / current: "+current);

    // var price = Number(price_value);
    // console.log("price: "+price);


    var callTransactionBuilder = new IconBuilder.CallTransactionBuilder;
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(score_to)
        .nid(IconConverter.toBigNumber(3))
        .value(IconAmount.of(Number(1), IconAmount.Unit.ICX).toLoop())
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconConverter.toBigNumber(10000000))
        .version(IconConverter.toBigNumber(3))
        .method('game_start')
        .params({
            "_choice": choice,
            "_time": currenthx8cadb82ff9a11c4f45fef36c0d53cca177fe33d3
        })
        .build();

    var score_sdk = JSON.stringify( {
        "jsonrpc":"2.0",
        "method":"icx_sendTransaction",
        "params":IconConverter.toRawTransaction(callTransactionData),
        "id":50889
    })

    var parsed = JSON.parse(score_sdk)
    console.log("parsed: "+parsed);
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: parsed,
        }
    }));
});

document.getElementById('greenFish').addEventListener('click', async () => {
    console.log("greenFish");

    var choice = String(2);
    var date = new Date();
    current = String(date.getTime());
    console.log("greenFish / current: "+current);

    // var price = Number(price_value);
    // console.log("price: "+price);


    var callTransactionBuilder = new IconBuilder.CallTransactionBuilder;
    var callTransactionData = callTransactionBuilder
        .from(address)
        .to(score_to)
        .nid(IconConverter.toBigNumber(3))
        .value(IconAmount.of(Number(1), IconAmount.Unit.ICX).toLoop())
        .timestamp((new Date()).getTime() * 1000)
        .stepLimit(IconConverter.toBigNumber(10000000))
        .version(IconConverter.toBigNumber(3))
        .method('game_start')
        .params({
            "_choice": choice,
            "_time": current
        })
        .build();

    var score_sdk = JSON.stringify( {
        "jsonrpc":"2.0",
        "method":"icx_sendTransaction",
        "params":IconConverter.toRawTransaction(callTransactionData),
        "id":50889
    })

    var parsed = JSON.parse(score_sdk)
    console.log("parsed: "+parsed);
    window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: parsed,
        }
    }));

});

window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler, false);


function eventHandler(event) {
    var type = event.detail.type;
    var payload = event.detail.payload;

    console.log("type: "+type);
    console.log("payload: "+payload);


    switch (type) {
        case "RESPONSE_JSON-RPC":
            console.log("return : "+JSON.stringify(payload));
            location.href = "./fish.html?address="+address+","+current;
            break;

        case "CANCEL_JSON-RPC":
            console.log("CANCEL_JSON-RPC");
            break;

        case "RESPONSE_SIGNING":
            console.log("RESPONSE_SIGNING6");
            break;

        case "CANCEL_SIGNING":
            console.log("CANCEL_SIGNING");
            break;
        default:
    }
}


//
//async function gameResult() {
//
//    if(current === '') {
//        console.log("에러!!");
//    } else {
//        console.log("enter else!!");
//
//        var callBuilder = new IconBuilder.CallBuilder;
//        var readOnlyData = callBuilder
//                .from(address)hx8cadb82ff9a11c4f45fef36c0d53cca177fe33d3
//                .to(score_to)
//                .method("getGameResult")
//                .params({
//                    "_time":current
//                })
//                .build();
//
//        var score_sdk = JSON.stringify( {
//                "jsonrpc": "2.0",
//                "method": "icx_call",
//                "params": readOnlyData,
//                "id": 50889
//            })
//
//        var parsed = JSON.parse(score_sdk)
//
//        window.dispatchEvent(new CustomEvent('ICONEX_RELAY_REQUEST', {
//            detail: {
//                type: 'REQUEST_JSON-RPC',
//                payload: parsed,
//            }
//        }));
//
//
////        var gameResult = await IconService.icx_call(parsed).  ~œ();
////        var gameResult = await IconService.call(parsed).execute();
////        console.log("gameResult: "+gameResult);
//
//
////        if(gameResult == 1) {
////            window.open("../../templates/win.html", "a", "width=500, height=500, left=520, top=100");
////            console.log("win, You earned an icx.");
////        } else if(gameResult == 0) {
////            window.open(".../../templates/lose.html", "a", "width=500, height=500, left=520, top=100");
////            console.log("lose, At the  time.");
////        } else {
////            alert("에러!!")
////        }
//    }
//}
//
//// 아이콘 블록체인에 맞게 설정
//function sleep (delay) {
//    var start = new Date().getTime();
//    while (new Date().getTime() < start + delay);
}

// get방식으로 넘어온 address 를 리턴함
function getParameterByAddress(address) {
    var address = address.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + address + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

