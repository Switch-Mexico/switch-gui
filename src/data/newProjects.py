import json 

with open('loadZones.json', 'r', encoding='utf8') as f:
	c = f.read()
parsed = json.loads(c)

newData = {}
for lz in parsed['data']:
	newData[lz['key']] = {'projects': lz['value'], 'total_cap_limit': lz['total_capacity_limit']}

parsed['data'] = newData

with open('lz_projs.json', 'w', encoding='utf8') as f:
	f.write(json.dumps(parsed))

