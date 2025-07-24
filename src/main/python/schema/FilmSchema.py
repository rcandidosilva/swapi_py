from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Film import Film
from schema.PlanetSchema import PlanetSchema
from schema.PersonSchema import PersonSchema
from schema.StarshipSchema import StarshipSchema
from schema.VehicleSchema import VehicleSchema
from schema.SpeciesSchema import SpeciesSchema


class FilmSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Film
        load_instance = True
        exclude = (
            "episode_id", 
            "opening_crawl", 
            "release_date", 
        )
        sqla_session = db.session
        
    episodeId = auto_field("episode_id") 
    openingCrawl = auto_field("opening_crawl") 
    releaseDate = auto_field("release_date") 
    planets = fields.Nested("PlanetSchema", many=True, required=False)
    people = fields.Nested("PersonSchema", many=True, required=False)
    starships = fields.Nested("StarshipSchema", many=True, required=False)
    vehicles = fields.Nested("VehicleSchema", many=True, required=False)
    species = fields.Nested("SpeciesSchema", many=True, required=False)
