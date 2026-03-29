def plan_helper(plan) -> dict:
    return {
        "id": str(plan["_id"]),
        "name": plan["name"],
        "price": plan["price"],
        "validity_days": plan["validity_days"],
        "data_limit": plan["data_limit"],
        "calls": plan["calls"]
    }