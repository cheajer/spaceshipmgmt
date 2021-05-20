import requests

url = 'http://3.26.44.154:3000/location/remove'


x = requests.delete(url, data={'id': 2000})
print(x.text)