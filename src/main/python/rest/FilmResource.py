from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Film import Film
from schema.FilmSchema import FilmSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from CacheConfiguration import cache

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
films_list_ns = Namespace('films-resource', path="/films")

films_schema = FilmSchema()
films_list_schema = FilmSchema(many=True)


class FilmResource(Resource):
    @jwt_required()
    def get(self, id):
        logging.info("GET request received on FilmResource")
        films = Film.find_by_id(id)
        if films is not None:
            return films_schema.dump(films), 200
        return {"message": "Film not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on FilmResource")
        films_json = request.get_json()
        if films_json["id"] is None:
            return {"message": "Invalid Film"}, 400
        if id != films_json["id"]:
            return {"message": "Invalid Film"}, 400
        films = Film.find_by_id(id)
        if films.get_id() is None:
            return {"message": "Invalid Film"}, 400
        try:
            updated_films = films_schema.load(films_json, instance=films, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_films.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_films')
        return films_schema.dump(updated_films), 200
    
    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on FilmResource")
        films_json = request.get_json()
        if films_json["id"] is None:
            return {"message": "Invalid Film"}, 400
        if id != films_json["id"]:
            return {"message": "Invalid Film"}, 400
        films = Film.find_by_id(id)
        if films.get_id() is None:
            return {"message": "Invalid Film"}, 400
        try:
            updated_films = films_schema.load(films_json, instance=films, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_films.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_films')
        return films_schema.dump(updated_films), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on FilmResource")
        films = Film.find_by_id(id)
        if films is None:
            return {"message": "Film not found"}, 404
        try:
            films.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_films')
        return {"message": "Film deleted"}, 204


class FilmResourceList(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on FilmResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        films = cache.get('all_films')
        if films == None:
            films = Film.find_all(page, size)
            cache.set('all_films', films)    
        if films is not None:
            return films_list_schema.dump(films), 200
        return {"message": "Film not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on FilmResourceList")
        films_json = request.get_json()
        try:
            films_data = films_schema.load(films_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            films_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_films')
        return films_schema.dump(films_data), 201


class FilmResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on FilmResourceListCount")
        films_count = Film.find_all_count()
        if films_count is not None:
            return films_count, 200
        return {"message": "Film count not found"}, 404