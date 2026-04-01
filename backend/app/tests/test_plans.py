import pytest

@pytest.mark.asyncio
async def test_get_plans(client):
    response = await client.get("/plans/")
    assert response.status_code == 200