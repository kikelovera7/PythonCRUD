from src import app


@app.route('/',get)
def index():
    return '<h1>Hello World!!!</h1>'