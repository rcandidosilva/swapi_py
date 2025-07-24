from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Person import Person
from schema.PlanetSchema import PlanetSchema
from schema.SpeciesSchema import SpeciesSchema
from schema.VehicleSchema import VehicleSchema
from schema.StarshipSchema import StarshipSchema


class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        load_instance = True
        exclude = (
            "hair_color", 
            "skin_color", 
            "eyey_color", 
            "birth_year", 
        )
        sqla_session = db.session
        
    hairColor = auto_field("hair_color") 
    skinColor = auto_field("skin_color") 
    eyeyColor = auto_field("eyey_color") 
    birthYear = auto_field("birth_year") 
    homeworld = fields.Nested("PlanetSchema", required=False)
    species = fields.Nested("SpeciesSchema", many=True, required=False)
    vehicles = fields.Nested("VehicleSchema", many=True, required=False)
    starships = fields.Nested("StarshipSchema", many=True, required=False)
