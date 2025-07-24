from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Starship import Starship
from schema.StarshipSchema import StarshipSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from CacheConfiguration import cache

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
starships_list_ns = Namespace('starships-resource', path="/starships")

starships_schema = StarshipSchema()
starships_list_schema = StarshipSchema(many=True)


class StarshipResource(Resource):
    @jwt_required()
    def get(self, id):
        logging.info("GET request received on StarshipResource")
        starships = Starship.find_by_id(id)
        if starships is not None:
            return starships_schema.dump(starships), 200
        return {"message": "Starship not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on StarshipResource")
        starships_json = request.get_json()
        if starships_json["id"] is None:
            return {"message": "Invalid Starship"}, 400
        if id != starships_json["id"]:
            return {"message": "Invalid Starship"}, 400
        starships = Starship.find_by_id(id)
        if starships.get_id() is None:
            return {"message": "Invalid Starship"}, 400
        try:
            updated_starships = starships_schema.load(starships_json, instance=starships, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_starships.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_starships')
        return starships_schema.dump(updated_starships), 200
    
    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on StarshipResource")
        starships_json = request.get_json()
        if starships_json["id"] is None:
            return {"message": "Invalid Starship"}, 400
        if id != starships_json["id"]:
            return {"message": "Invalid Starship"}, 400
        starships = Starship.find_by_id(id)
        if starships.get_id() is None:
            return {"message": "Invalid Starship"}, 400
        try:
            updated_starships = starships_schema.load(starships_json, instance=starships, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_starships.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_starships')
        return starships_schema.dump(updated_starships), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on StarshipResource")
        starships = Starship.find_by_id(id)
        if starships is None:
            return {"message": "Starship not found"}, 404
        try:
            starships.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_starships')
        return {"message": "Starship deleted"}, 204


class StarshipResourceList(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on StarshipResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        starships = cache.get('all_starships')
        if starships == None:
            starships = Starship.find_all(page, size)
            cache.set('all_starships', starships)    
        if starships is not None:
            return starships_list_schema.dump(starships), 200
        return {"message": "Starship not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on StarshipResourceList")
        starships_json = request.get_json()
        try:
            starships_data = starships_schema.load(starships_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            starships_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_starships')
        return starships_schema.dump(starships_data), 201


class StarshipResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on StarshipResourceListCount")
        starships_count = Starship.find_all_count()
        if starships_count is not None:
            return starships_count, 200
        return {"message": "Starship count not found"}, 404