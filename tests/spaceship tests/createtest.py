import requests

url = 'http://54.252.152.2:3000/spaceship/create'


spaceship = {
    'id' : '0',
    'Name' : 'test name',
    'Model' :  'test model',
    'locatedAt': '1',
    'Status': 'operational'
}


x = requests.post(url, data = spaceship)

print(x.text)