from flask import Flask, render_template, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS 
import scraping as sc
import evaluate as eva 

app = Flask(__name__, static_folder="./build/static", template_folder="./build")

app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route("/", methods=['GET'])
def index():
    return "Server OK"

@app.route('/tags', methods=['POST'])
def parse():
    scraping = sc.Scraping()
    data = request.get_json()
    tags = data['post_tags']
    url = scraping.scraping(tags)
    response = {'article': url}
    return make_response(jsonify(response))

@app.route('/comment', methods=['POST'])
def comment():
    scraping = sc.Scraping()
    data = request.get_json()
    article = data['post_articleConent']
    data = scraping.getComment(article['link'])
    response = {'result': data}
    return make_response(jsonify(response))

@app.route('/eval', methods=['POST'])
def eval():
    evalComment = eva.Eval()
    data = request.get_json()
    comment = data['comment']
    c, a, d = comment['comments'], comment['agrees'], comment['disagrees']
    data = evalComment.evaluateComment(c,a,d)
    print(data)
    response = {'response': data}
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)