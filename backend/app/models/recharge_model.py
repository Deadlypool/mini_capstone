def recharge_helper(recharge) -> dict:
    return {
        "id": str(recharge["_id"]),
        "sim_id": str(recharge["sim_id"]),
        "plan_id": str(recharge["plan_id"]),
        "amount": recharge["amount"],
        "status": recharge["status"],
        "recharged_at": recharge["recharged_at"]
    }