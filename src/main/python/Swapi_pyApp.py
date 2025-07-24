
from flask import Flask, Blueprint
from flask_restx import Api
from flask_jwt_extended import JWTManager
from rest import add_api_namespace
from config.BaseConfig import BaseConfig
from config.FakeDataLoader import load_fake_data
from DatabaseConfig import db
from WebSerializer import ma
from MailConfiguration import mail
from CacheConfiguration import cache


app = Flask(__name__, template_folder='../resources/templates/mail')
bluePrint = Blueprint('api', __name__, url_prefix='/api')
api = Api(bluePrint, doc='/v3/api-docs/default', title='SwapiPyApp Application')


api = add_api_namespace(api)
jwt = JWTManager(app)

@app.before_first_request
def create_tables():
    db.create_all()
    load_fake_data(app)


def create_app(flaskapp):
    flaskapp.register_blueprint(bluePrint)
    flaskapp.config.from_object(BaseConfig)
    cache.init_app(app)
    db.init_app(flaskapp)
    ma.init_app(flaskapp)
    mail.init_app(flaskapp)
    return flaskapp


if __name__ == '__main__':
    flask_app = create_app(app)
    flask_app.run(debug=True, port=8080)
