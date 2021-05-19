import requests

url = 'http://localhost:3000/location/remove'


x = requests.delete(url, data={'id': 4})
print(x.text)