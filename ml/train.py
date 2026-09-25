import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

def train_and_evaluate():
    print("=" * 60)
    print("CrediGuard AI - Machine Learning Model Training & Evaluation")
    print("=" * 60)
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(current_dir)
    
    csv_path = os.path.join(project_dir, "Loan_default.csv")
    if not os.path.exists(csv_path):
        csv_path = "c:/Users/ahirn/Desktop/ML/Project/Loan_default.csv"

    print(f"1. Loading dataset from {csv_path}...")
    df = pd.read_csv(csv_path)
    print(f"   Initial shape: {df.shape}")

    # 2. Data cleaning & preprocessing
    print("2. Cleaning data...")
    if 'LoanID' in df.columns:
        df = df.drop(columns=['LoanID'])
        print("   Dropped unnecessary 'LoanID' column.")

    df = df.drop_duplicates()

    # Define feature groups
    target_col = 'Default'
    X = df.drop(columns=[target_col])
    y = df[target_col]

    numerical_cols = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 
                      'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio']
    categorical_cols = ['Education', 'EmploymentType', 'MaritalStatus', 
                        'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner']

    # 3. Create Preprocessing Pipeline (ColumnTransformer)
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_cols),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_cols)
        ]
    )

    # 4. Train / Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    X_train_prep = preprocessor.fit_transform(X_train)
    X_test_prep = preprocessor.transform(X_test)

    # 5. Model Definitions
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42),
        "Decision Tree": DecisionTreeClassifier(max_depth=10, random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=100, max_depth=12, class_weight='balanced', random_state=42, n_jobs=-1)
    }

    results = {}
    fitted_models = {}

    print("5. Training and evaluating models...")
    print("-" * 60)
    print(f"{'Model':<22} | {'Accuracy':<8} | {'Precision':<9} | {'Recall':<8} | {'F1-Score':<8}")
    print("-" * 60)

    for name, model in models.items():
        model.fit(X_train_prep, y_train)
        fitted_models[name] = model
        
        y_pred = model.predict(X_test_prep)
        
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        cm = confusion_matrix(y_test, y_pred).tolist()

        results[name] = {
            "accuracy": round(float(acc), 4),
            "precision": round(float(prec), 4),
            "recall": round(float(rec), 4),
            "f1_score": round(float(f1), 4),
            "confusion_matrix": cm
        }

        print(f"{name:<22} | {acc:<8.4f} | {prec:<9.4f} | {rec:<8.4f} | {f1:<8.4f}")

    print("-" * 60)

    # 6. Model Selection based on F1-Score
    best_model_name = max(results, key=lambda k: results[k]['f1_score'])
    best_model = fitted_models[best_model_name]
    best_f1 = results[best_model_name]['f1_score']
    print(f"\nBest Model Selected based on F1-Score: {best_model_name} (F1 = {best_f1})")

    # Feature Importance analysis
    cat_feature_names = list(preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_cols))
    all_feature_names = numerical_cols + cat_feature_names

    feature_importances = []
    if hasattr(best_model, 'feature_importances_'):
        importances = best_model.feature_importances_
        sorted_indices = np.argsort(importances)[::-1]
        for idx in sorted_indices[:15]:
            feature_importances.append({
                "feature": all_feature_names[idx],
                "importance": round(float(importances[idx]), 4)
            })
    elif hasattr(best_model, 'coef_'):
        coefs = np.abs(best_model.coef_[0])
        sorted_indices = np.argsort(coefs)[::-1]
        for idx in sorted_indices[:15]:
            feature_importances.append({
                "feature": all_feature_names[idx],
                "importance": round(float(coefs[idx]), 4)
            })

    # Save directories for both Project/backend/model and backend/model
    target_dirs = [
        os.path.join(project_dir, "backend", "model"),
        "c:/Users/ahirn/Desktop/ML/backend/model"
    ]

    metrics_payload = {
        "best_model": best_model_name,
        "models": results,
        "feature_importances": feature_importances,
        "dataset_summary": {
            "total_records": len(df),
            "total_features": len(X.columns),
            "default_count": int(y.sum()),
            "non_default_count": int((y == 0).sum()),
            "default_rate_pct": round(float((y.sum() / len(y)) * 100), 2)
        }
    }

    for out_dir in target_dirs:
        os.makedirs(out_dir, exist_ok=True)
        joblib.dump(best_model, os.path.join(out_dir, "loan_default_model.pkl"))
        joblib.dump(preprocessor, os.path.join(out_dir, "preprocessing_pipeline.pkl"))
        with open(os.path.join(out_dir, "metrics.json"), "w") as f:
            json.dump(metrics_payload, f, indent=2)

    print("9. Saved model, pipeline, and metrics in both Project and Root directories successfully!")
    print("=" * 60)

if __name__ == "__main__":
    train_and_evaluate()
