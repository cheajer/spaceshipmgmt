import requests

url = 'http://localhost:3000/spaceship/remove'


x = requests.delete(url, data={'id': 10})
print(x.text)