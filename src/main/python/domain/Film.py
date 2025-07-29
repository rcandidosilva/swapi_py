from datetime import datetime
from enum import Enum
from typing import List
from . import Planet
from . import Person
from . import Starship
from . import Vehicle
from . import Species
from DatabaseConfig import db
 

film_planet = db.Table('film_planet',
    db.Column('film_id', db.Integer, db.ForeignKey('Film.id'), primary_key=True),
    db.Column('planet_id', db.Integer, db.ForeignKey('Planet.id'), primary_key=True)
)
film_person = db.Table('film_person',
    db.Column('film_id', db.Integer, db.ForeignKey('Film.id'), primary_key=True),
    db.Column('person_id', db.Integer, db.ForeignKey('Person.id'), primary_key=True)
)
film_starship = db.Table('film_starship',
    db.Column('film_id', db.Integer, db.ForeignKey('Film.id'), primary_key=True),
    db.Column('starship_id', db.Integer, db.ForeignKey('Starship.id'), primary_key=True)
)
film_vehicle = db.Table('film_vehicle',
    db.Column('film_id', db.Integer, db.ForeignKey('Film.id'), primary_key=True),
    db.Column('vehicle_id', db.Integer, db.ForeignKey('Vehicle.id'), primary_key=True)
)
film_species = db.Table('film_species',
    db.Column('film_id', db.Integer, db.ForeignKey('Film.id'), primary_key=True),
    db.Column('species_id', db.Integer, db.ForeignKey('Species.id'), primary_key=True)
)

class Film(db.Model):
    __tablename__ = "Film"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
    title = db.Column(db.String( 255))
    episode_id = db.Column(db.Integer)
    opening_crawl = db.Column(db.String( 255))
    director = db.Column(db.String( 255))
    producer = db.Column(db.String( 255))
    release_date = db.Column(db.Date)

    # TODO: Adding relationships
    planets = db.relationship("Planet", secondary=film_planet, lazy="subquery")
    characters = db.relationship("Person", secondary=film_person, lazy="subquery")
    startships = db.relationship("Starship", secondary=film_starship, lazy="subquery")
    vehicles = db.relationship("Vehicle", secondary=film_vehicle, lazy="subquery")
    species = db.relationship("Species", secondary=film_species, lazy="subquery")

    @classmethod
    def find_by_id(cls, _id) -> "Film":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls, page, per_page) -> List["Film"]:
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
    
    def get_title(self):
        return self.title

    def set_title(self, title):
        self.title = title
    
    def get_episode_id(self):
        return self.episode_id

    def set_episode_id(self, episode_id):
        self.episode_id = episode_id
    
    def get_opening_crawl(self):
        return self.opening_crawl

    def set_opening_crawl(self, opening_crawl):
        self.opening_crawl = opening_crawl
    
    def get_director(self):
        return self.director

    def set_director(self, director):
        self.director = director
    
    def get_producer(self):
        return self.producer

    def set_producer(self, producer):
        self.producer = producer
    
    def get_release_date(self):
        return self.release_date

    def set_release_date(self, release_date):
        self.release_date = release_date
