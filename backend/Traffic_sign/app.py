from flask import Flask
from flask import request
from flask import jsonify
from flask import send_file
from flask import send_from_directory
from flask_cors import CORS

import cv2
import numpy as np
from keras.models import load_model

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

model = load_model('model.h5')

def allowed_file(filename):
  extension = filename.rsplit('.', 1)[1].lower()
  return '.' in filename and extension in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return send_file('tfjs/model.json')
    if 'img' not in request.files:
        return jsonify({
            'message': 'Missing file'
        }), 400
    file = request.files['img']
    if file.filename == '':
        return jsonify({
            'message': 'No file selected'
        }), 400
    
    if file and allowed_file(file.filename):
        try:
            filestr = file.read()
            img = np.frombuffer(filestr, np.uint8)
            img = cv2.imdecode(img, cv2.IMREAD_COLOR)
            img = cv2.resize(img, (30, 30))
            img = np.expand_dims(img, 0)
            pred = model.predict(img)
            pred = np.argmax(np.round(pred), axis=1)
            return jsonify({
                'message': 'Success',
                'traffic_id': str(pred[0])
            })
        except:
            return jsonify({
                'message': 'Server error'
            }), 500
    else:
      return jsonify({
        'message': 'File doesnt support'
      }), 400