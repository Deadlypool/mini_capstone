def usage_helper(usage) -> dict:
    return {
        "id": str(usage["_id"]),
        "sim_id": str(usage["sim_id"]),
        "data_used": usage["data_used"],
        "call_minutes": usage["call_minutes"],
        "sms_count": usage["sms_count"],
        "date": usage["date"]
    }