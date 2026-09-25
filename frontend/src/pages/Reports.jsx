import React, { useState } from 'react';
import apiService from '../services/api';
import { FileSpreadsheet, Download, FileText } from 'lucide-react';

const Reports = () => {
  const [downloading, setDownloading] = useState(false);

  const exportReport = async (format) => {
    setDownloading(true);
    try {
      const data = await apiService.getLoans();
      const loans = data.loans || [];

      if (format === 'json') {
        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(loans, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", jsonStr);
        downloadAnchor.setAttribute("download", `CrediGuard_Loan_Risk_Report_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      } else if (format === 'csv') {
        let csvContent = "data:text/csv;charset=utf-8,LoanID,Timestamp,PredictionLabel,ProbabilityPercentage,RiskLevel,Income,LoanAmount,CreditScore,DTIRatio\n";
        loans.forEach((l) => {
          const row = [
            l.id,
            l.timestamp,
            l.predictionLabel,
            l.probabilityPercentage,
            `"${l.riskLevel}"`,
            l.applicantData.Income,
            l.applicantData.LoanAmount,
            l.applicantData.CreditScore,
            l.applicantData.DTIRatio
          ].join(",");
          csvContent += row + "\n";
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `CrediGuard_Loan_Risk_Report_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <FileSpreadsheet size={24} color="#818CF8" />
          Executive Risk Reports & Compliance Audits
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.2rem' }}>
          Generate, review, and export comprehensive credit risk evaluation summaries for audit compliance.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.5rem' }}>
          Export Loan Assessment Data
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
          Download complete dataset of session evaluations including probability scores, risk tiers, and applicant features.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => exportReport('csv')} 
            disabled={downloading}
            className="btn-primary"
            style={{ padding: '0.8rem 1.5rem' }}
          >
            <Download size={18} />
            <span>Export CSV Audit Log</span>
          </button>

          <button 
            onClick={() => exportReport('json')} 
            disabled={downloading}
            className="btn-secondary"
            style={{ padding: '0.8rem 1.5rem' }}
          >
            <FileText size={18} />
            <span>Export JSON Payload</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
