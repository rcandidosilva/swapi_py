from marshmallow_sqlalchemy import auto_field, fields
from WebSerializer import ma
from DatabaseConfig import db
from domain.Vehicle import Vehicle


class VehicleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Vehicle
        load_instance = True
        exclude = (
            "cost_in_credits", 
            "max_atmosphering_speed", 
            "cargo_capacity", 
            "vehicle_class", 
        )
        sqla_session = db.session
        
    costInCredits = auto_field("cost_in_credits") 
    maxAtmospheringSpeed = auto_field("max_atmosphering_speed") 
    cargoCapacity = auto_field("cargo_capacity") 
    vehicleClass = auto_field("vehicle_class") 
