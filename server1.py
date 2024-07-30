from flask import Flask, request, jsonify, send_from_directory
import json
import os

app = Flask(__name__, static_folder='public', static_url_path='')

DATA_FILE = 'data.json'

def read_data():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

def write_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=2)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/entries', methods=['GET'])
def get_entries():
    user = request.args.get('user')
    data = read_data()
    user_entries = data.get(user, [])
    return jsonify(user_entries)

@app.route('/entries', methods=['POST'])
def add_entry():
    entry = request.get_json()
    user = entry['user']
    amount = entry['amount']
    description = entry['description']
    date = entry['date']
    type = entry['type']
    data = read_data()
    if user not in data:
        data[user] = []
    data[user].append({'amount': amount, 'description': description, 'date': date, 'type': type})
    write_data(data)
    return jsonify({'message': 'Entry added successfully'})

@app.route('/entries/<int:index>', methods=['DELETE'])
def delete_entry(index):
    user = request.args.get('user')
    data = read_data()
    if user in data and 0 <= index < len(data[user]):
        data[user].pop(index)
        write_data(data)
        return jsonify({'message': 'Entry deleted successfully'})
    return jsonify({'message': 'User not found or index out of range'}), 404

if __name__ == '__main__':
    app.run(debug=True)
