from flask import Flask, render_template, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS 
from bs4 import BeautifulSoup
import urllib
from urllib.parse import urlparse
import selenium

app = Flask(__name__, static_folder="./build/static", template_folder="./build")

app.config['JSON_AS_ASCII'] = False
CORS(app)

def scraping(tags):
    tagURL = " ".join(tags)
    url = "https://news.yahoo.co.jp/search?p=%s&ei=utf-8&aq=0"%tagURL
    url = preventEncode(url)
    response = urllib.request.urlopen(url)
    content = response.read().decode(response.headers.get_content_charset())
    soup = BeautifulSoup(content, 'html.parser')

    # タイトル情報取得
    titles = soup.find_all('div', class_={'newsFeed_item_title'})
    titles = list(map(lambda x: x.text, titles))

    # リンク取得
    # https://naruport.com/blog/2019/12/27/bs4-href/
    links = soup.find_all('a', class_={'newsFeed_item_link'})
    links = list(map(lambda x: x.get('href'), links))

    articles = []
    for title, link in zip(titles, links):
        articles.append({'title': title, 'link': link})
    
    return articles

# 日本語を含むURLの対処法
# https://qiita.com/mix/items/87d094414e46f857de45
def preventEncode(url):
    p = urlparse(url)
    query = urllib.parse.quote_plus(p.query, safe='=&')
    url = '{}://{}{}{}{}{}{}{}{}'.format(
    p.scheme, p.netloc, p.path,
    ';' if p.params else '', p.params,
    '?' if p.query else '', query,
    '#' if p.fragment else '', p.fragment)
    return url

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route("/", methods=['GET'])
def index():
    return "Server OK"

@app.route('/tags', methods=['GET', 'POST'])
def parse():
    data = request.get_json()
    tags = data['post_tags']
    url = scraping(tags)
    response = {'result': url}
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)