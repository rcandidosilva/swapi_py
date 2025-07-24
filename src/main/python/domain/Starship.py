from datetime import datetime
from enum import Enum
from typing import List
from . import Film
from . import Person
from DatabaseConfig import db
 


class Starship(db.Model):
    __tablename__ = "Starship"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created = db.Column(db.ZonedDateTime)
    edited = db.Column(db.ZonedDateTime)
    name = db.Column(db.String( 255))
    model = db.Column(db.String( 255))
    manufacturer = db.Column(db.String( 255))
    cost_in_credits = db.Column(db.Integer)
    length = db.Column(db.Integer)
    max_atmosphering_speed = db.Column(db.Integer)
    crew = db.Column(db.Integer)
    passengers = db.Column(db.Integer)
    cargo_capacity = db.Column(db.Integer)
    consumables = db.Column(db.String( 255))
    hyperdrive_rating = db.Column(db.Float)
    mglt = db.Column(db.Integer)
    startship_class = db.Column(db.String( 255))

    # TODO: Adding relationships

    @classmethod
    def find_by_id(cls, _id) -> "Starship":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Starship"]:
        paginate = cls.query.order_by(cls.id).paginate(page=page, per_page=per_page)
        return paginate.items

    @classmethod
    def find_all_count(cls):
        return cls.query.count()
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def update_db(self) -> None:
        db.session.merge(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    # Getters and setters
    def get_id(self):
        return self.id

    def set_id(self, id):
        self.id = id
    
    def get_created(self):
        return self.created

    def set_created(self, created):
        self.created = created
    
    def get_edited(self):
        return self.edited

    def set_edited(self, edited):
        self.edited = edited
    
    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name
    
    def get_model(self):
        return self.model

    def set_model(self, model):
        self.model = model
    
    def get_manufacturer(self):
        return self.manufacturer

    def set_manufacturer(self, manufacturer):
        self.manufacturer = manufacturer
    
    def get_cost_in_credits(self):
        return self.cost_in_credits

    def set_cost_in_credits(self, cost_in_credits):
        self.cost_in_credits = cost_in_credits
    
    def get_length(self):
        return self.length

    def set_length(self, length):
        self.length = length
    
    def get_max_atmosphering_speed(self):
        return self.max_atmosphering_speed

    def set_max_atmosphering_speed(self, max_atmosphering_speed):
        self.max_atmosphering_speed = max_atmosphering_speed
    
    def get_crew(self):
        return self.crew

    def set_crew(self, crew):
        self.crew = crew
    
    def get_passengers(self):
        return self.passengers

    def set_passengers(self, passengers):
        self.passengers = passengers
    
    def get_cargo_capacity(self):
        return self.cargo_capacity

    def set_cargo_capacity(self, cargo_capacity):
        self.cargo_capacity = cargo_capacity
    
    def get_consumables(self):
        return self.consumables

    def set_consumables(self, consumables):
        self.consumables = consumables
    
    def get_hyperdrive_rating(self):
        return self.hyperdrive_rating

    def set_hyperdrive_rating(self, hyperdrive_rating):
        self.hyperdrive_rating = hyperdrive_rating
    
    def get_mglt(self):
        return self.mglt

    def set_mglt(self, mglt):
        self.mglt = mglt
    
    def get_startship_class(self):
        return self.startship_class

    def set_startship_class(self, startship_class):
        self.startship_class = startship_class
