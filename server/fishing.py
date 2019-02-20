from flask import Flask, render_template, make_response
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/iconex.html')
def iconex():
    return render_template('iconex.html')

@app.route('/elements.html')
def ele():
    return render_template('elements.html')

@app.route('/fish.html')
def fish():
    return render_template('fish.html')

@app.route('/generic.html')
def choice():
    return render_template('generic.html')

@app.route('/win.html')
def win():
    return render_template('win.html')

# @app.errorhandler(404)
# def not_found(error): resp = make_response(render_template('error.html'), 404)
#      # return resp
# def err():
#     return 'error'

if __name__ =='__main__':
    app.run(debug=True, host='127.12.13.15')


