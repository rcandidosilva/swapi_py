
import os
from datetime import timedelta
import tempfile


BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class BaseConfig:
    # Flask 
    ENV = 'development'
    FLASK_ENV = 'development'
    SECRET_KEY = '88c03d104826b1fada7a250b9c1767adbba9539d3651a225485af5dfd747a4db39f1195fb33b26df4a5850688ab347fc2e08'
    JWT_SECRET_KEY = 'OWM0YWE5MjVhODNkYWI0NDllYTI3NTg4OTdmZjVjZmQzY2I1ZjI2Nzg0ODBlZTNhN2NmOGEyOGMxOWMxMmU1YWIyOGJhNTllOWIyOGQzMDI4N2RkOWU4MGMwNjgyMjY4NGNjOWFmMmY0NGUxMzAwNTYzNTY2YTkzNTk0YmI4ZjM='
    JWT_ALGORITHM = 'HS512'

    # Database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///../../../pyhipster.db3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = False
    SQLALCHEMY_EXPIRE_ON_COMMIT = False

    # Mail Configurations
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'my-email-id@gmail.com'
    MAIL_PASSWORD = 'my-email-password'

    # Cache Configurations
    CACHE_TYPE = 'RedisCache'
    CACHE_DEFAULT_TIMEOUT = 60
    CACHE_KEY_PREFIX = ''
    # CACHE_OPTIONS
    CACHE_REDIS_HOST = ''
    CACHE_REDIS_PORT = 6379
    CACHE_REDIS_PASSWORD = ''
    CACHE_REDIS_DB = ''
    CACHE_REDIS_URL = ''
    
class ProdConfig:
    # Flask 
    ENV = 'production'
    FLASK_ENV = 'production'
    SECRET_KEY = '88c03d104826b1fada7a250b9c1767adbba9539d3651a225485af5dfd747a4db39f1195fb33b26df4a5850688ab347fc2e08'
    JWT_SECRET_KEY = 'OWM0YWE5MjVhODNkYWI0NDllYTI3NTg4OTdmZjVjZmQzY2I1ZjI2Nzg0ODBlZTNhN2NmOGEyOGMxOWMxMmU1YWIyOGJhNTllOWIyOGQzMDI4N2RkOWU4MGMwNjgyMjY4NGNjOWFmMmY0NGUxMzAwNTYzNTY2YTkzNTk0YmI4ZjM='
    JWT_ALGORITHM = 'HS512'

    # Database
    # SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://user:password@host:port/dbname[?key=value&key=value...]'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = False
    SQLALCHEMY_EXPIRE_ON_COMMIT = False

    # Mail Configurations
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'my-email-id@gmail.com'
    MAIL_PASSWORD = 'my-email-password'

    # Cache Configurations
    CACHE_TYPE = 'RedisCache'
    CACHE_DEFAULT_TIMEOUT = 60
    CACHE_KEY_PREFIX = ''
    # CACHE_OPTIONS
    CACHE_REDIS_HOST = ''
    CACHE_REDIS_PORT = 6379
    CACHE_REDIS_PASSWORD = ''
    CACHE_REDIS_DB = ''
    CACHE_REDIS_URL = ''
