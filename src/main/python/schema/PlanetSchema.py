from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Planet import Planet


class PlanetSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Planet
        load_instance = True
        exclude = (
            "rotation_period", 
            "orbital_period", 
            "surface_water", 
        )
        sqla_session = db.session
        
    rotationPeriod = auto_field("rotation_period") 
    orbitalPeriod = auto_field("orbital_period") 
    surfaceWater = auto_field("surface_water") 
