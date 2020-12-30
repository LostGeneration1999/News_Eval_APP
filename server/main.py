from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS


app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)

@app.route("/", methods=['GET'])
def index():
    return "text parser)"

@app.route('/tags', methods=['GET', 'POST'])
def parse():
    data = request.get_json()
    text = data['post_tags']
    response = {'result': res}
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)