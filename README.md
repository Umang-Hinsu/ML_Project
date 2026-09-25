# 🎓 CrediGuard AI - Machine Learning Loan Default Prediction System

---

## ⚡ 🚀 HOW TO RUN THE PROJECT (2 TERMINAL COMMANDS)

### 1️⃣ TERMINAL 1 (Start FastAPI Backend):
Open PowerShell / Command Prompt and run:
```bash
cd c:\Users\ahirn\Desktop\ML\Project
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
> *You will see: `INFO: Uvicorn running on http://127.0.0.1:8000`*

---

### 2️⃣ TERMINAL 2 (Start React Frontend):
Open a **SECOND** PowerShell / Command Prompt window and run:
```bash
cd c:\Users\ahirn\Desktop\ML\Project\frontend
npm start
```
> *React will automatically open `http://localhost:3000` in your web browser!*

---

## 🌟 1. WHAT IS THIS APP? (SIMPLE 1-MINUTE SUMMARY)

Imagine a bank manager deciding whether to approve a loan for a customer. 

**CrediGuard AI** is a smart **Loan Default Prediction System**. 

Instead of guessing, the app asks for 17 simple financial details about the customer (like **Income**, **Loan Amount**, **Credit Score**, **Employment**, and **Debt**). Our **AI Machine Learning Model** looks at patterns from **255,000 past loans** and instantly tells the bank manager:
1. **Will this customer default (fail to pay back)?** -> `YES` or `NO`.
2. **What is the risk percentage?** -> e.g., `12.5% Risk` (Low Risk) or `68.0% Risk` (High Risk).
3. **What action should the bank take?** -> `Approve Loan`, `Underwriting Review`, or `High Risk Warning`.

---

## 🎬 2. STEP-BY-STEP LIVE DEMO GUIDE FOR MA'AM (WHAT TO CLICK & SAY)

Follow these **5 easy steps** when presenting live in front of your professor:

---

### 📍 STEP 1: Show the Executive Dashboard
- **What to click:** Open `http://localhost:3000` (Main Dashboard page).
- **What to say:**
  > *"Ma'am, welcome to **CrediGuard AI**. This is our Executive Dashboard. It gives bank managers an instant overview of 255,347 loan applications, showing our portfolio default rate (11.6%), monthly application trends, and risk breakdown charts."*

---

### 📍 STEP 2: Demo a LOW RISK Applicant (Approved Loan)
- **What to click:** 
  1. Click **Loan Prediction** on the left menu bar.
  2. Click the top-right button: **"Low Risk Profile"** (Notice how Income=$140k, Credit Score=810, Loan=$20k auto-fill).
  3. Click the big button: **"Predict Loan Default"**.
- **What to say:**
  > *"Ma'am, here we test a strong applicant profile (high income, 810 credit score, low debt). When we click Predict, our FastAPI backend sends the data to our trained Random Forest model. The model outputs **NO DEFAULT** with a **Low Risk** badge and a low 12.5% default probability."*

---

### 📍 STEP 3: Demo a HIGH RISK Applicant (Default Risk Warning)
- **What to click:** 
  1. Click the top-right button: **"High Risk Profile"** (Notice how Unemployed, Income=$24k, Credit Score=540, Loan=$50k auto-fill).
  2. Click **"Predict Loan Default"**.
- **What to say:**
  > *"Now Ma'am, if an applicant has low income ($24k), high debt (62% DTI), and a low credit score (540), our AI model detects high default risk. The system outputs **DEFAULT PREDICTED** with a **High Risk** badge and 68% probability, warning the bank not to approve."*

---

### 📍 STEP 4: Show ML Model Benchmark Analytics
- **What to click:** Click **ML Analytics** on the left menu bar.
- **What to say:**
  > *"Here on the Analytics page, we compare the three models we trained in scikit-learn: Logistic Regression, Decision Tree, and Random Forest. We evaluated Accuracy, Precision, Recall, and F1-Score. Random Forest won with the highest F1-score (`0.3613`). Below, the Feature Importance chart shows that Interest Rate, Income, and Credit Score are the most influential factors."*

---

### 📍 STEP 5: Export Audit Report
- **What to click:** Click **Reports** on the left menu bar -> Click **"Export CSV Audit Log"**.
- **What to say:**
  > *"Finally Ma'am, all evaluated loan predictions are saved and can be exported directly to a CSV or JSON report for bank audit compliance."*

---

## 🧠 3. SIMPLE EXPLANATION OF THE 3 ML MODELS (EASY ANALOGY)

If Ma'am asks: *"What models did you train and why did you select Random Forest?"*, explain it using this simple real-life analogy:

1. **Logistic Regression (Simple Math Line):**
   - *Analogy:* Like drawing a single straight boundary line between good borrowers and bad borrowers.
   - *Result:* Fast, but too simple to catch complex risk factors.

2. **Decision Tree (Single Flowchart):**
   - *Analogy:* Like asking a single person to follow a flowchart (*"Is Credit Score > 650? Yes -> Is Income > $50k? Yes..."*).
   - *Result:* Good, but a single tree can easily get tricked by unusual data.

3. **Random Forest (Team of 100 Experts - OUR WINNER):**
   - *Analogy:* Instead of asking just 1 person, we ask a **committee of 100 different decision trees** to analyze the customer independently. Every tree casts a vote, and the **majority vote** determines the final prediction.
   - *Why it is best:* It balances precision and recall (highest **F1-Score** = `0.3613`), making it the most reliable model for loan default prediction.

---

## 🚀 4. HOW TO RUN THE SERVERS

### Terminal 1 (FastAPI Backend):
```bash
cd c:\Users\ahirn\Desktop\ML\Project
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

### Terminal 2 (React Frontend):
```bash
cd c:\Users\ahirn\Desktop\ML\Project\frontend
npm start
```
