import pytest

@pytest.mark.asyncio
async def test_register(client):
    response = await client.post("/auth/register/", json={
        "name": "test1",
        "email": "test1@example.com",
        "password": "123456",
        "role": "customer"
    })

    assert response.status_code in [200, 400, 307]

