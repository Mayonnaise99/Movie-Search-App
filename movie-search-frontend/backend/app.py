from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

OMDB_API_KEY = '1b431601'

@app.route('/api/search', methods=['GET'])
def search_movie():
    query = request.args.get('query')
    page = request.args.get('page', 1)
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    try:
        response = requests.get(f'http://www.omdbapi.com/', params={
            'apikey': OMDB_API_KEY,
            's': query
        })
        response.raise_for_status()
        data = response.json()
        if data.get('Response') == 'False':
            return jsonify({'error': data.get('Error')}), 404
        return jsonify(data.get('Search', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch data from OMDb'}), 500

if __name__ == '__main__':
    app.run(debug=True)
