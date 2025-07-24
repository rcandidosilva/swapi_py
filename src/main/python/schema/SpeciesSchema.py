from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Species import Species
from schema.PlanetSchema import PlanetSchema


class SpeciesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Species
        load_instance = True
        exclude = (
            "average_height", 
            "skin_colors", 
            "hair_colors", 
            "eye_colors", 
            "average_lifespan", 
        )
        sqla_session = db.session
        
    averageHeight = auto_field("average_height") 
    skinColors = auto_field("skin_colors") 
    hairColors = auto_field("hair_colors") 
    eyeColors = auto_field("eye_colors") 
    averageLifespan = auto_field("average_lifespan") 
    homeworld = fields.Nested("PlanetSchema", required=False)
