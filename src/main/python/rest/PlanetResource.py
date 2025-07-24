from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Planet import Planet
from schema.PlanetSchema import PlanetSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from CacheConfiguration import cache

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
planets_list_ns = Namespace('planets-resource', path="/planets")

planets_schema = PlanetSchema()
planets_list_schema = PlanetSchema(many=True)


class PlanetResource(Resource):
    @jwt_required()
    def get(self, id):
        logging.info("GET request received on PlanetResource")
        planets = Planet.find_by_id(id)
        if planets is not None:
            return planets_schema.dump(planets), 200
        return {"message": "Planet not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on PlanetResource")
        planets_json = request.get_json()
        if planets_json["id"] is None:
            return {"message": "Invalid Planet"}, 400
        if id != planets_json["id"]:
            return {"message": "Invalid Planet"}, 400
        planets = Planet.find_by_id(id)
        if planets.get_id() is None:
            return {"message": "Invalid Planet"}, 400
        try:
            updated_planets = planets_schema.load(planets_json, instance=planets, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_planets.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_planets')
        return planets_schema.dump(updated_planets), 200
    
    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on PlanetResource")
        planets_json = request.get_json()
        if planets_json["id"] is None:
            return {"message": "Invalid Planet"}, 400
        if id != planets_json["id"]:
            return {"message": "Invalid Planet"}, 400
        planets = Planet.find_by_id(id)
        if planets.get_id() is None:
            return {"message": "Invalid Planet"}, 400
        try:
            updated_planets = planets_schema.load(planets_json, instance=planets, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_planets.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_planets')
        return planets_schema.dump(updated_planets), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on PlanetResource")
        planets = Planet.find_by_id(id)
        if planets is None:
            return {"message": "Planet not found"}, 404
        try:
            planets.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_planets')
        return {"message": "Planet deleted"}, 204


class PlanetResourceList(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on PlanetResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        planets = cache.get('all_planets')
        if planets == None:
            planets = Planet.find_all(page, size)
            cache.set('all_planets', planets)    
        if planets is not None:
            return planets_list_schema.dump(planets), 200
        return {"message": "Planet not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on PlanetResourceList")
        planets_json = request.get_json()
        try:
            planets_data = planets_schema.load(planets_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            planets_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_planets')
        return planets_schema.dump(planets_data), 201


class PlanetResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on PlanetResourceListCount")
        planets_count = Planet.find_all_count()
        if planets_count is not None:
            return planets_count, 200
        return {"message": "Planet count not found"}, 404