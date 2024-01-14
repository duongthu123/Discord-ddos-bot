import requests
from threading import Thread
from os import system


f = open('proxy.txt','w')
proxies = []
proxies_checked = []

myip = requests.get('http://ipinfo.io/json').json()['ip']

def check(p):
    proxies = {
        'http': 'http://'+p,
        'https': 'https://'+p,
    }
    try:
        r = requests.get('http://ipinfo.io/json', proxies=proxies,timeout=5).json()
        if r['ip'] != myip:
            f.write(p + '\n')
            print(f'{p} {r["country"]}')
    except:
        exit()

def get(api):

    r = requests.get(api,timeout=5)
    proxies.append(str(r.text).replace('\r','').split('\n'))
    print(f'loaded {api}',end='\r')



http_api = [
    "https://api.proxyscrape.com/?request=displayproxies&proxytype=http",
    "https://www.proxy-list.download/api/v1/get?type=http",
    "https://api.openproxylist.xyz/http.txt",
    "http://alexa.lr2b.com/proxylist.txt",
    "https://multiproxy.org/txt_all/proxy.txt",
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http",
    "https://openproxylist.xyz/http.txt",
    "https://proxyspace.pro/http.txt",
    "https://proxyspace.pro/https.txt",
    "https://proxyspace.pro/socks5.txt",
    "https://proxyspace.pro/socks4.txt",
    "https://rootjazz.com/proxies/proxies.txt",
    "https://www.proxy-list.download/api/v1/get?type=https",
    "https://www.proxy-list.download/api/v1/get?type=socks4",
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5",
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4",
    "https://www.proxy-list.download/api/v1/get?type=socks5",
    "https://www.proxy-list.download/api/v1/get?type=socks4",
    "https://0f44-2402-800-6342-5068-50a9-8055-36-f6a0.ngrok-free.app/proxy?key=12345678&type1&protocol=http"
]
for api in http_api:
    get(api)

system('cls')
for proxy in proxies:
    for p in proxy :
        Thread(target=check,args=(p,)).start()

f.close()