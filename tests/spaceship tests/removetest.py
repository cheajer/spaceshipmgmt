import requests

url = 'http://3.26.44.154:3000/spaceship/remove'


x = requests.delete(url, data={'id': 10})
print(x.text)