from flask import Flask, render_template, request, make_response
from iconsdk.icon_service import IconService
from iconsdk.providers.http_provider import HTTPProvider
from iconsdk.builder.call_builder import CallBuilder


from time import sleep

#---------------------------------------Icon Service rink----------------------------------------
icon_service = IconService(HTTPProvider("http://127.0.0.1:9000/api/v3"))
_score_address = "cx35a03f35326798ca7de6b979a11cca86b81c5e2f"

app = Flask(__name__)

app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

# @app.route('/iconex.html')
# def iconex():
#     return render_template('iconex.html')

# 물고기 3마리 나오는 화면 -> 물고기 선택하는 화면
@app.route('/elements.html')
def ele():
    return render_template('elements.html')

# 로딩화면
@app.route('/fish.html')
def fish():
    loading_info = request.args.get('address')

    loading_info = loading_info.split(",")

    address = loading_info[0]
    current = loading_info[1]

    print("address: ", address)

    print("current: ", current)

    params = {
        "_time": current,
    }

    # return render_template('fish.html')

    sleep(10)

    Inquiry = CallBuilder() \
        .from_(address) \
        .to(_score_address) \
        .method("getGameResult") \
        .params(params) \
        .build()

    # print("Inquiry: ", Inquiry)

    # Sends the call request
    #string 0x0, 0x1
    response = int(icon_service.call(Inquiry)[-1])
    print("response: ", response)
    print("response: ", type(response))

    if(response==1):
        return render_template('win.html')
    else:
        return render_template('lose.html')


# 게임종료 및 재경기 의사
@app.route('/generic.html')
def choice():
    return render_template('generic.html')


# 이겼을때 화면
@app.route('/win.html')
def win():
    return render_template('win.html')

# 졌을때 화면
@app.route('/lose.html')
def lose():
    return render_template('lose.html')

@app.errorhandler(404)
def not_found(error): resp = make_response(render_template('error.html'), 404)
    # return resp
def err():
    return 'error'

if __name__ =='__main__':
    # app.run()
    app.run(debug=True, host='0.0.0.0')


