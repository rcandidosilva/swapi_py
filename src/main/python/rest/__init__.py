from .PublicUserResource import public_user_list_ns
from .AuthorityResource import authority_list_ns
from .UserJWTController import jwt_authentication_ns
from .AccountResource import account_register_ns, account_authenticate_ns, account_ns, \
    account_activate_ns, passwd_reset_init_ns, passwd_reset_finish_ns, change_passwd_ns
from .UserResource import user_list_ns
from .LogoutResource import logout_ns
from .AppManagment import app_management_ns
from .VehicleResource import vehicles_list_ns
from .StarshipResource import starships_list_ns
from .SpeciesResource import species_list_ns
from .PersonResource import people_list_ns
from .FilmResource import films_list_ns
from .PlanetResource import planets_list_ns
# pyhipster-needle-rest-api-list-add-entry-import

def add_api_namespace(api):
    # Registering the namespaces
    api.add_namespace(public_user_list_ns)
    api.add_namespace(authority_list_ns)
    api.add_namespace(jwt_authentication_ns)
    api.add_namespace(logout_ns)
    api.add_namespace(account_register_ns)
    api.add_namespace(account_authenticate_ns)
    api.add_namespace(account_ns)
    api.add_namespace(account_activate_ns)
    api.add_namespace(passwd_reset_init_ns)
    api.add_namespace(passwd_reset_finish_ns)
    api.add_namespace(change_passwd_ns)
    api.add_namespace(user_list_ns)
    api.add_namespace(app_management_ns)
    api.add_namespace(vehicles_list_ns)
    api.add_namespace(starships_list_ns)
    api.add_namespace(species_list_ns)
    api.add_namespace(people_list_ns)
    api.add_namespace(films_list_ns)
    api.add_namespace(planets_list_ns)
    # pyhipster-needle-rest-api-list-add-namespaces

    # Adding resources to added namespaces
    public_user_list_ns.add_resource(PublicUserResource.PublicUserResourceList, "")
    authority_list_ns.add_resource(AuthorityResource.AuthorityResourceList, "")
    jwt_authentication_ns.add_resource(UserJWTController.UserJWTResource, "")
    logout_ns.add_resource(LogoutResource.LogoutResource, "")
    account_register_ns.add_resource(AccountResource.ManagedUserAccountRegister, "")
    account_authenticate_ns.add_resource(AccountResource.AccountAuthenticate, "")
    account_ns.add_resource(AccountResource.AdminAccountDetails, "")
    account_activate_ns.add_resource(AccountResource.AccountActivate, "")
    passwd_reset_init_ns.add_resource(AccountResource.AccountPasswordResetInit, "")
    passwd_reset_finish_ns.add_resource(AccountResource.AccountPasswordResetFinish, "")
    change_passwd_ns.add_resource(AccountResource.AccountChangePassword, "")
    user_list_ns.add_resource(UserResource.UserResource, "/<string:login>")
    user_list_ns.add_resource(UserResource.UserResourceList, "")
    app_management_ns.add_resource(AppManagment.AppManagementInfoResource, "/info")
    app_management_ns.add_resource(AppManagment.AppManagementEnvironmentResource, "/env")
    app_management_ns.add_resource(AppManagment.AppManagementConfigurationResource, "/configprops")
    app_management_ns.add_resource(AppManagment.AppManagementOpenAPIResource, "/jhiopenapigroups")
    # pyhipster-needle-rest-api-list-add-resource
    # pyhipster-needle-rest-api-list-add-resource-list
    vehicles_list_ns.add_resource(VehicleResource.VehicleResourceList, "")
    vehicles_list_ns.add_resource(VehicleResource.VehicleResourceListCount, "/count")
    vehicles_list_ns.add_resource(VehicleResource.VehicleResource, "/<int:id>")
    starships_list_ns.add_resource(StarshipResource.StarshipResourceList, "")
    starships_list_ns.add_resource(StarshipResource.StarshipResourceListCount, "/count")
    starships_list_ns.add_resource(StarshipResource.StarshipResource, "/<int:id>")
    species_list_ns.add_resource(SpeciesResource.SpeciesResourceList, "")
    species_list_ns.add_resource(SpeciesResource.SpeciesResourceListCount, "/count")
    species_list_ns.add_resource(SpeciesResource.SpeciesResource, "/<int:id>")
    people_list_ns.add_resource(PersonResource.PersonResourceList, "")
    people_list_ns.add_resource(PersonResource.PersonResourceListCount, "/count")
    people_list_ns.add_resource(PersonResource.PersonResource, "/<int:id>")
    films_list_ns.add_resource(FilmResource.FilmResourceList, "")
    films_list_ns.add_resource(FilmResource.FilmResourceListCount, "/count")
    films_list_ns.add_resource(FilmResource.FilmResource, "/<int:id>")
    planets_list_ns.add_resource(PlanetResource.PlanetResourceList, "")
    planets_list_ns.add_resource(PlanetResource.PlanetResourceListCount, "/count")
    planets_list_ns.add_resource(PlanetResource.PlanetResource, "/<int:id>")
    # pyhipster-needle-rest-api-list-add-resource-list-count

    return api



