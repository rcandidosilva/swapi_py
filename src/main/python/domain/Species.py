from datetime import datetime
from enum import Enum
from typing import List
from . import Planet
from . import Film
from . import Person
from DatabaseConfig import db
 


class Species(db.Model):
    __tablename__ = "Species"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created = db.Column(db.ZonedDateTime)
    edited = db.Column(db.ZonedDateTime)
    name = db.Column(db.String( 255))
    classification = db.Column(db.String( 255))
    designation = db.Column(db.String( 255))
    average_height = db.Column(db.Integer)
    skin_colors = db.Column(db.String( 255))
    hair_colors = db.Column(db.String( 255))
    eye_colors = db.Column(db.String( 255))
    average_lifespan = db.Column(db.Integer)
    languages = db.Column(db.String( 255))

    # TODO: Adding relationships
    homeworld_id = db.Column(db.Integer, db.ForeignKey("Planet.id"))    
    homeworld = db.relationship("Planet", lazy="subquery", primaryjoin="Species.homeworld_id == Planet.id")

    @classmethod
    def find_by_id(cls, _id) -> "Species":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Species"]:
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
    
    def get_classification(self):
        return self.classification

    def set_classification(self, classification):
        self.classification = classification
    
    def get_designation(self):
        return self.designation

    def set_designation(self, designation):
        self.designation = designation
    
    def get_average_height(self):
        return self.average_height

    def set_average_height(self, average_height):
        self.average_height = average_height
    
    def get_skin_colors(self):
        return self.skin_colors

    def set_skin_colors(self, skin_colors):
        self.skin_colors = skin_colors
    
    def get_hair_colors(self):
        return self.hair_colors

    def set_hair_colors(self, hair_colors):
        self.hair_colors = hair_colors
    
    def get_eye_colors(self):
        return self.eye_colors

    def set_eye_colors(self, eye_colors):
        self.eye_colors = eye_colors
    
    def get_average_lifespan(self):
        return self.average_lifespan

    def set_average_lifespan(self, average_lifespan):
        self.average_lifespan = average_lifespan
    
    def get_languages(self):
        return self.languages

    def set_languages(self, languages):
        self.languages = languages
