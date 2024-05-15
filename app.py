from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/videos')
def videos():
    return render_template('videos.html')

@app.route('/paintings')
def paintings():
    return render_template('paintings.html')

@app.route('/illustrations')
def illustrations():
    return render_template('illustrations.html')

@app.route('/sketchbooks')
def sketchbooks():
    return render_template('sketchbooks.html')

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/shop')  # Ensure this route is defined correctly
def shop():
    return render_template('shop.html')

if __name__ == '__main__':
    app.run(debug=True)

