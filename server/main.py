from flask import Flask, render_template, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS 
from bs4 import BeautifulSoup
import urllib
from urllib.parse import urlparse
from selenium import webdriver

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

def organizeComment(comment_boxes):

    comments = []
    names = []
    dates = []
    agrees = []
    disagrees = []

    for i,comment_box in enumerate(comment_boxes):
        print('comment :%d'%i)
        #コメント取得
        elem_comment = comment_box.find_element_by_class_name("cmtBody")
        comment = elem_comment.text.strip()
        comments.append(comment)
        
        #ユーザー名取得
        elem_name = comment_box.find_element_by_class_name("rapid-noclick-resp")
        name = elem_name.text
        names.append(name)
                
        #日付取得
        elem_date = comment_box.find_element_by_class_name("date")
        date = elem_date.text
        dates.append(date) 
        
        #good数取得
        agree_box = comment_box.find_element_by_class_name("good")
        elem_agree = agree_box.find_element_by_class_name("userNum")
        agree = elem_agree.text
        agrees.append(agree)

        #bad数取得
        disagree_box = comment_box.find_element_by_class_name("bad")
        elem_disagree = disagree_box.find_element_by_class_name("userNum")
        disagree = elem_disagree.text
        disagrees.append(disagree)
    return {'comments': comments, 'agrees':agrees, 'disagrees': disagrees}

def getComment(url):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(executable_path='/usr/local/bin/chromedriver',options=options)
    comment_boxes  = []
    start = 1
    end = 3
    
    response = urllib.request.urlopen(url)
    content = response.read().decode(response.headers.get_content_charset())
    soup = BeautifulSoup(content, 'html.parser')
    for meta_tag in soup.find_all('meta', attrs={'property': 'og:url'}):
        url = meta_tag.get('content')
    
    for page in range(start, end):
        url = "{}/comments?page={}&t=t&order=recommended".format(url,page)
        #https://headlines.yahoo.co.jp/hl?a=20210105-00038732-hankyoreh-kr/comments?page=2&t=t&order=recommended
        #https://news.yahoo.co.jp/articles/e9101e27163ecd32985909ef9fbe41b270cb4070/comments?page=2&t=t&order=recommended
        print(page)
        driver.get(url)
        iframe = driver.find_element_by_class_name("news-comment-plguin-iframe")
        driver.switch_to.frame(iframe)
    comment_boxes = driver.find_elements_by_class_name("root")
    data = organizeComment(comment_boxes)
    print(data['comments'])
    return data



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

@app.route('/comment', methods=['GET', 'POST'])
def comment():
    data = request.get_json()
    article = data['post_articleConent']
    print(article['link'])
    data = getComment(article['link'])
    response = {'result': data}
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)