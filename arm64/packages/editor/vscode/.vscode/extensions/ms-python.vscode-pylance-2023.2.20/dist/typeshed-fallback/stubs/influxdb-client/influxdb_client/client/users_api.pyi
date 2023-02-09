from influxdb_client import User, UserResponse, Users

class UsersApi:
    def __init__(self, influxdb_client) -> None: ...
    def me(self) -> User: ...
    def create_user(self, name: str) -> User: ...
    def update_user(self, user: User) -> UserResponse: ...
    def update_password(self, user: str | User | UserResponse, password: str) -> None: ...
    def delete_user(self, user: str | User | UserResponse) -> None: ...
    def find_users(self, **kwargs) -> Users: ...
