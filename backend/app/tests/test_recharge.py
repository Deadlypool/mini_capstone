import pytest

@pytest.mark.asyncio
async def test_recharge_without_auth(client):
    response = await client.post("/recharge/", json={
        "sim_id": "123",
        "plan_id": "123"
    })

    assert response.status_code in [401,403]