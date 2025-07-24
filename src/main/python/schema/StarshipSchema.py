from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Starship import Starship


class StarshipSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Starship
        load_instance = True
        exclude = (
            "cost_in_credits", 
            "max_atmosphering_speed", 
            "cargo_capacity", 
            "hyperdrive_rating", 
            "startship_class", 
        )
        sqla_session = db.session
        
    costInCredits = auto_field("cost_in_credits") 
    maxAtmospheringSpeed = auto_field("max_atmosphering_speed") 
    cargoCapacity = auto_field("cargo_capacity") 
    hyperdriveRating = auto_field("hyperdrive_rating") 
    startshipClass = auto_field("startship_class") 
