from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from services.prediction_service import prediction_service

router = APIRouter(prefix="/api", tags=["Dashboard & Analytics"])

@router.get("/dashboard")
async def get_dashboard():
    try:
        summary = prediction_service.get_dashboard_summary()
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving dashboard metrics: {str(e)}")

@router.get("/loans")
async def get_loans(
    search: Optional[str] = Query(None, description="Search by ID or purpose"),
    risk_level: Optional[str] = Query(None, description="Filter by risk level: Low Risk, Medium Risk, High Risk")
):
    try:
        loans = prediction_service.get_all_loans()
        
        if search:
            search_lower = search.lower()
            loans = [l for l in loans if search_lower in l["id"].lower() or search_lower in str(l["applicantData"].get("LoanPurpose", "")).lower()]

        if risk_level:
            loans = [l for l in loans if l["riskLevel"].lower() == risk_level.lower()]

        return {
            "totalCount": len(loans),
            "loans": loans
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving loan applications: {str(e)}")

@router.get("/loans/{loan_id}")
async def get_loan_details(loan_id: str):
    loan = prediction_service.get_loan_by_id(loan_id)
    if not loan:
        raise HTTPException(status_code=404, detail=f"Loan record {loan_id} not found")
    return loan
