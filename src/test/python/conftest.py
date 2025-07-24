import pytest
from SwapiPyApp import create_app
from flask import Flask
from config.FakeDataLoader import load_fake_data
from DatabaseConfig import db
from flask_jwt_extended import JWTManager, create_access_token
from CacheConfiguration import cache


@pytest.fixture(scope='session')
def test_client():
    app = Flask(__name__)
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    jwt = JWTManager(app)
    flask_app = create_app(app)

    with flask_app.test_client() as testing_client:
      with flask_app.app_context():
        cache.init_app(flask_app)
        db.create_all()
        load_fake_data(flask_app)
        yield testing_client
