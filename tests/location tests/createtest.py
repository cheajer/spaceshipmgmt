import requests

url = 'http://localhost:3000/location/create'


location = {
    'id' : 0,
    'City' : 'Melbourne',
    'Planet' :  'Earth',
    'Capacity': '1'
}


x = requests.post(url, data = location)

print(x.text)