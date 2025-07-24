from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Species import Species
from schema.SpeciesSchema import SpeciesSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from CacheConfiguration import cache

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
species_list_ns = Namespace('species-resource', path="/species")

species_schema = SpeciesSchema()
species_list_schema = SpeciesSchema(many=True)


class SpeciesResource(Resource):
    @jwt_required()
    def get(self, id):
        logging.info("GET request received on SpeciesResource")
        species = Species.find_by_id(id)
        if species is not None:
            return species_schema.dump(species), 200
        return {"message": "Species not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on SpeciesResource")
        species_json = request.get_json()
        if species_json["id"] is None:
            return {"message": "Invalid Species"}, 400
        if id != species_json["id"]:
            return {"message": "Invalid Species"}, 400
        species = Species.find_by_id(id)
        if species.get_id() is None:
            return {"message": "Invalid Species"}, 400
        try:
            updated_species = species_schema.load(species_json, instance=species, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_species.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_species')
        return species_schema.dump(updated_species), 200
    
    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on SpeciesResource")
        species_json = request.get_json()
        if species_json["id"] is None:
            return {"message": "Invalid Species"}, 400
        if id != species_json["id"]:
            return {"message": "Invalid Species"}, 400
        species = Species.find_by_id(id)
        if species.get_id() is None:
            return {"message": "Invalid Species"}, 400
        try:
            updated_species = species_schema.load(species_json, instance=species, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_species.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_species')
        return species_schema.dump(updated_species), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on SpeciesResource")
        species = Species.find_by_id(id)
        if species is None:
            return {"message": "Species not found"}, 404
        try:
            species.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_species')
        return {"message": "Species deleted"}, 204


class SpeciesResourceList(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on SpeciesResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        species = cache.get('all_species')
        if species == None:
            species = Species.find_all(page, size)
            cache.set('all_species', species)    
        if species is not None:
            return species_list_schema.dump(species), 200
        return {"message": "Species not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on SpeciesResourceList")
        species_json = request.get_json()
        try:
            species_data = species_schema.load(species_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            species_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_species')
        return species_schema.dump(species_data), 201


class SpeciesResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on SpeciesResourceListCount")
        species_count = Species.find_all_count()
        if species_count is not None:
            return species_count, 200
        return {"message": "Species count not found"}, 404