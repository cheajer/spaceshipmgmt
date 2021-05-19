import requests

url = 'http://localhost:3000/spaceship/update'


x = requests.put(url, data={'spaceship': 7, 'status': 'decommissioned'})
print(x.text)