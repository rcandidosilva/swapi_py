from flask import request
import logging
import json
from flask_restx import Resource, Namespace
from domain.Person import Person
from schema.PersonSchema import PersonSchema
from flask_jwt_extended import jwt_required
from security.SecurityUtils import has_role
from security.AuthoritiesConstants import AuthoritiesConstants
from sqlalchemy.exc import SQLAlchemyError
from marshmallow.exceptions import ValidationError
from CacheConfiguration import cache

logging.basicConfig(format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')
people_list_ns = Namespace('people-resource', path="/people")

people_schema = PersonSchema()
people_list_schema = PersonSchema(many=True)


class PersonResource(Resource):
    @jwt_required()
    def get(self, id):
        logging.info("GET request received on PersonResource")
        people = Person.find_by_id(id)
        if people is not None:
            return people_schema.dump(people), 200
        return {"message": "Person not found"}, 404

    @jwt_required()
    def put(self, id):
        logging.info("PUT request received on PersonResource")
        people_json = request.get_json()
        if people_json["id"] is None:
            return {"message": "Invalid Person"}, 400
        if id != people_json["id"]:
            return {"message": "Invalid Person"}, 400
        people = Person.find_by_id(id)
        if people.get_id() is None:
            return {"message": "Invalid Person"}, 400
        try:
            updated_people = people_schema.load(people_json, instance=people, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_people.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_people')
        return people_schema.dump(updated_people), 200
    
    @jwt_required()
    def patch(self, id):
        logging.info("PATCH request received on PersonResource")
        people_json = request.get_json()
        if people_json["id"] is None:
            return {"message": "Invalid Person"}, 400
        if id != people_json["id"]:
            return {"message": "Invalid Person"}, 400
        people = Person.find_by_id(id)
        if people.get_id() is None:
            return {"message": "Invalid Person"}, 400
        try:
            updated_people = people_schema.load(people_json, instance=people, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            updated_people.update_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_people')
        return people_schema.dump(updated_people), 200

    @jwt_required()
    @has_role(AuthoritiesConstants.ADMIN)
    def delete(self, id):
        logging.info("DELETE request received on PersonResource")
        people = Person.find_by_id(id)
        if people is None:
            return {"message": "Person not found"}, 404
        try:
            people.delete_from_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_people')
        return {"message": "Person deleted"}, 204


class PersonResourceList(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on PersonResourceList")
        page = request.args.get('page', default=1, type=int)
        size = request.args.get('size', default=20, type=int)
        people = cache.get('all_people')
        if people == None:
            people = Person.find_all(page, size)
            cache.set('all_people', people)    
        if people is not None:
            return people_list_schema.dump(people), 200
        return {"message": "Person not found"}, 404

    @jwt_required()
    def post(self):
        logging.info("POST request received on PersonResourceList")
        people_json = request.get_json()
        try:
            people_data = people_schema.load(people_json, partial=True)
        except ValidationError as err:
            return {"message": json.dumps(err.messages)}, 400
        try:
            people_data.save_to_db()
        except SQLAlchemyError as e:
            return {"message": str(e.__dict__['orig'])}, 400
        cache.delete('all_people')
        return people_schema.dump(people_data), 201


class PersonResourceListCount(Resource):
    @jwt_required()
    def get(self):
        logging.info("GET request received on PersonResourceListCount")
        people_count = Person.find_all_count()
        if people_count is not None:
            return people_count, 200
        return {"message": "Person count not found"}, 404