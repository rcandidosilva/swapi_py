from datetime import datetime
from enum import Enum
from typing import List
from . import Person
from . import Species
from . import Film
from DatabaseConfig import db
 


class Planet(db.Model):
    __tablename__ = "Planet"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    name = db.Column(db.String( 255))
    rotation_period = db.Column(db.Integer)
    orbital_period = db.Column(db.Integer)
    diameter = db.Column(db.Integer)
    climate = db.Column(db.String( 255))
    gravity = db.Column(db.String( 255))
    terrain = db.Column(db.String( 255))
    surface_water = db.Column(db.Integer)
    population = db.Column(db.Integer)

    # TODO: Adding relationships
    people = db.relationship("Person", lazy="subquery", viewonly=True)
    species = db.relationship("Species", lazy="subquery", viewonly=True)

    @classmethod
    def find_by_id(cls, _id) -> "Planet":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Planet"]:
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
    
    def get_rotation_period(self):
        return self.rotation_period

    def set_rotation_period(self, rotation_period):
        self.rotation_period = rotation_period
    
    def get_orbital_period(self):
        return self.orbital_period

    def set_orbital_period(self, orbital_period):
        self.orbital_period = orbital_period
    
    def get_diameter(self):
        return self.diameter

    def set_diameter(self, diameter):
        self.diameter = diameter
    
    def get_climate(self):
        return self.climate

    def set_climate(self, climate):
        self.climate = climate
    
    def get_gravity(self):
        return self.gravity

    def set_gravity(self, gravity):
        self.gravity = gravity
    
    def get_terrain(self):
        return self.terrain

    def set_terrain(self, terrain):
        self.terrain = terrain
    
    def get_surface_water(self):
        return self.surface_water

    def set_surface_water(self, surface_water):
        self.surface_water = surface_water
    
    def get_population(self):
        return self.population

    def set_population(self, population):
        self.population = population
