import requests

url = 'http://localhost:3000/spaceship/create'


spaceship = {
    'id' : '0',
    'Name' : 'test name',
    'Model' :  'test model',
    'locatedAt': '5',
    'Status': 'operational'
}


x = requests.post(url, data = spaceship)

print(x.text)