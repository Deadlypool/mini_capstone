def sim_helper(sim) -> dict:
    return {
        "id": str(sim["_id"]),
        "mobile_number": sim["mobile_number"],
        "user_id": str(sim["user_id"]),
        "status": sim["status"],
        "activated_by": str(sim["activated_by"])
    }