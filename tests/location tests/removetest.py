import requests

url = 'http://localhost:3000/location/remove'


x = requests.delete(url, data={'id': 50})
print(x.text)