from datetime import datetime
from enum import Enum
from typing import List
from . import Planet
from . import Species
from . import Vehicle
from . import Starship
from . import Film
from DatabaseConfig import db
 

person_species = db.Table('person_species',
    db.Column('person_id', db.Integer, db.ForeignKey('Person.id'), primary_key=True),
    db.Column('species_id', db.Integer, db.ForeignKey('Species.id'), primary_key=True)
)
person_vehicle = db.Table('person_vehicle',
    db.Column('person_id', db.Integer, db.ForeignKey('Person.id'), primary_key=True),
    db.Column('vehicle_id', db.Integer, db.ForeignKey('Vehicle.id'), primary_key=True)
)
person_starship = db.Table('person_starship',
    db.Column('person_id', db.Integer, db.ForeignKey('Person.id'), primary_key=True),
    db.Column('starship_id', db.Integer, db.ForeignKey('Starship.id'), primary_key=True)
)

class Person(db.Model):
    __tablename__ = "Person"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created = db.Column(db.ZonedDateTime)
    edited = db.Column(db.ZonedDateTime)
    name = db.Column(db.String( 255))
    height = db.Column(db.Integer)
    mass = db.Column(db.Float)
    hair_color = db.Column(db.String( 255))
    skin_color = db.Column(db.String( 255))
    eyey_color = db.Column(db.String( 255))
    birth_year = db.Column(db.String( 255))
    gender = db.Column(db.String( 255))

    # TODO: Adding relationships
    homeworld_id = db.Column(db.Integer, db.ForeignKey("Planet.id"))    
    homeworld = db.relationship("Planet", lazy="subquery", primaryjoin="Person.homeworld_id == Planet.id")
    species = db.relationship("Species", secondary=person_species, lazy="subquery")
    vehicles = db.relationship("Vehicle", secondary=person_vehicle, lazy="subquery")
    starships = db.relationship("Starship", secondary=person_starship, lazy="subquery")

    @classmethod
    def find_by_id(cls, _id) -> "Person":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Person"]:
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
    
    def get_height(self):
        return self.height

    def set_height(self, height):
        self.height = height
    
    def get_mass(self):
        return self.mass

    def set_mass(self, mass):
        self.mass = mass
    
    def get_hair_color(self):
        return self.hair_color

    def set_hair_color(self, hair_color):
        self.hair_color = hair_color
    
    def get_skin_color(self):
        return self.skin_color

    def set_skin_color(self, skin_color):
        self.skin_color = skin_color
    
    def get_eyey_color(self):
        return self.eyey_color

    def set_eyey_color(self, eyey_color):
        self.eyey_color = eyey_color
    
    def get_birth_year(self):
        return self.birth_year

    def set_birth_year(self, birth_year):
        self.birth_year = birth_year
    
    def get_gender(self):
        return self.gender

    def set_gender(self, gender):
        self.gender = gender
