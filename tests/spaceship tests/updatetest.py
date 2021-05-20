import requests

url = 'http://3.26.44.154:3000/spaceship/update'


x = requests.put(url, data={'spaceship': 7, 'status': 'decommissioned'})
print(x.text)