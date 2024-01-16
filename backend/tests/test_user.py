import pytest
from models import User
from services import user_service

@pytest.fixture
def new_user():
    user = User(
        print('hello')
    )