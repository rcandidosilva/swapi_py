from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Vehicle import Vehicle
from schema.VehicleSchema import VehicleSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from CacheConfiguration import cache

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
vehicles_list_ns = Namespace('vehicles-resource', path="/vehicles")

vehicles_schema = VehicleSchema()
vehicles_list_schema = VehicleSchema(many=True)


class VehicleResource(Resource):
    @jwt_required()
    def get(self, id):
        logging.info("GET request received on VehicleResource")
        vehicles = Vehicle.find_by_id(id)
        if vehicles is not None:
            return vehicles_schema.dump(vehicles), 200
        return {"message": "Vehicle not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on VehicleResource")
        vehicles_json = request.get_json()
        if vehicles_json["id"] is None:
            return {"message": "Invalid Vehicle"}, 400
        if id != vehicles_json["id"]:
            return {"message": "Invalid Vehicle"}, 400
        vehicles = Vehicle.find_by_id(id)
        if vehicles.get_id() is None:
            return {"message": "Invalid Vehicle"}, 400
        try:
            updated_vehicles = vehicles_schema.load(vehicles_json, instance=vehicles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_vehicles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_vehicles')
        return vehicles_schema.dump(updated_vehicles), 200
    
    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on VehicleResource")
        vehicles_json = request.get_json()
        if vehicles_json["id"] is None:
            return {"message": "Invalid Vehicle"}, 400
        if id != vehicles_json["id"]:
            return {"message": "Invalid Vehicle"}, 400
        vehicles = Vehicle.find_by_id(id)
        if vehicles.get_id() is None:
            return {"message": "Invalid Vehicle"}, 400
        try:
            updated_vehicles = vehicles_schema.load(vehicles_json, instance=vehicles, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_vehicles.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_vehicles')
        return vehicles_schema.dump(updated_vehicles), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on VehicleResource")
        vehicles = Vehicle.find_by_id(id)
        if vehicles is None:
            return {"message": "Vehicle not found"}, 404
        try:
            vehicles.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_vehicles')
        return {"message": "Vehicle deleted"}, 204


class VehicleResourceList(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on VehicleResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        vehicles = cache.get('all_vehicles')
        if vehicles == None:
            vehicles = Vehicle.find_all(page, size)
            cache.set('all_vehicles', vehicles)    
        if vehicles is not None:
            return vehicles_list_schema.dump(vehicles), 200
        return {"message": "Vehicle not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on VehicleResourceList")
        vehicles_json = request.get_json()
        try:
            vehicles_data = vehicles_schema.load(vehicles_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            vehicles_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_vehicles')
        return vehicles_schema.dump(vehicles_data), 201


class VehicleResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on VehicleResourceListCount")
        vehicles_count = Vehicle.find_all_count()
        if vehicles_count is not None:
            return vehicles_count, 200
        return {"message": "Vehicle count not found"}, 404