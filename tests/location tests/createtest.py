import requests

url = 'http://3.26.44.154:3000/location/create'


location = {
    'id' : 0,
    'City' : 'Melbourne',
    'Planet' :  'Earth',
    'Capacity': '1'
}


x = requests.post(url, data = location)

print(x.text)