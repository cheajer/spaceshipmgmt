import requests

url = 'http://localhost:3000/spaceship/travel'


x = requests.put(url, data={'spaceship': 4, 'location': 5})
print(x.text)