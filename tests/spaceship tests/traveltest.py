import requests

url = 'http://3.26.44.154:3000/spaceship/travel'


x = requests.put(url, data={'spaceship': 4, 'location': 5})
print(x.text)