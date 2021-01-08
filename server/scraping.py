from bs4 import BeautifulSoup
import urllib
from urllib.parse import urlparse
from selenium import webdriver

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

# コメント・評価の取得
def organizeComment(comment_boxes):

    comments = []
    names = []
    dates = []
    agrees = []
    disagrees = []

    for i,comment_box in enumerate(comment_boxes):
        #コメント取得
        elem_comment = comment_box.find_element_by_class_name("cmtBody")
        comment = elem_comment.text.strip()
        comments.append(comment)
        print(comment)
        print(len(comments))
        
        #good数取得
        agree_box = comment_box.find_element_by_class_name("good")
        elem_agree = agree_box.find_element_by_class_name("userNum")
        if(elem_agree.text):
            agree = elem_agree.text
        else:
            agree = 0
        agrees.append(agree)

        #bad数取得
        disagree_box = comment_box.find_element_by_class_name("bad")
        elem_disagree = disagree_box.find_element_by_class_name("userNum")
        if(elem_disagree.text):
            disagree = elem_disagree.text
        else:
            disagree = 0 
        disagrees.append(disagree)

    print({'comments': comments, 'agrees':agrees, 'disagrees': disagrees})
    return {'comments': comments, 'agrees':agrees, 'disagrees': disagrees}


class Scraping():

    def __init__(self):
        self.articles = []
        self.comment_boxes = []
        self.start = 1
        self.end = 2

    # 記事一覧取得
    def scraping(self, tags):
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
        links = soup.find_all('a', class_={'newsFeed_item_link'})
        links = list(map(lambda x: x.get('href'), links))
        for title, link in zip(titles, links):
            pid = link.split('/')[-1].split('=')[-1]
            self.articles.append({'title': title, 'link': link, 'pid': pid})
        
        return self.articles

    # コメント取得時における前準備
    def getComment(self,url):

        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Chrome(executable_path='/usr/local/bin/chromedriver',options=options)
        self.comment_boxes  = []
        print(url)
        response = urllib.request.urlopen(url)
        content = response.read().decode(response.headers.get_content_charset())
        soup = BeautifulSoup(content, 'html.parser')
        for meta_tag in soup.find_all('meta', attrs={'property': 'og:url'}):
            url = meta_tag.get('content')
        
        for page in range(self.start, self.end):
            url = "{}/comments?page={}&t=t&order=recommended".format(url,page)
            driver.get(url)
            iframe = driver.find_element_by_class_name("news-comment-plguin-iframe")
            driver.switch_to.frame(iframe)
        self.comment_boxes = driver.find_elements_by_class_name("root")
        data = organizeComment(self.comment_boxes)
        return data