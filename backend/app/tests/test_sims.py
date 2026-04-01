import pytest

@pytest.mark.asyncio
async def test_get_my_sims_unauthorized(client):
    response = await client.get("/sims/my/")
    assert response.status_code in [401,403,307]