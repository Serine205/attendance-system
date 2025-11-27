// Reports functionality
document.addEventListener('DOMContentLoaded', function() {
    const generateReportBtn = document.getElementById('generateReport');
    
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            const reportType = document.getElementById('reportType').value;
            const reportDate = document.getElementById('reportDate').value;
            
            generateReport(reportType, reportDate);
        });
    }
    
    function generateReport(type, date) {
        const reportResults = document.getElementById('reportResults');
        
        // Sample report data - in real app, this would come from PHP backend
        let reportData = {};
        
        switch(type) {
            case 'daily':
                reportData = {
                    title: 'Rapport Quotidien',
                    date: date || new Date().toISOString().split('T')[0],
                    stats: {
                        totalStudents: 45,
                        present: 38,
                        absent: 7,
                        participationRate: '84%'
                    },
                    details: [
                        { course: 'ISIL', present: 25, absent: 2 },
                        { course: 'Math', present: 13, absent: 5 }
                    ]
                };
                break;
                
            case 'weekly':
                reportData = {
                    title: 'Rapport Hebdomadaire',
                    period: 'Semaine 15, 2024',
                    stats: {
                        totalStudents: 45,
                        averageAttendance: '87%',
                        topParticipant: 'Ali Yacine',
                        mostAbsent: 'Sara Ahmed'
                    }
                };
                break;
                
            case 'monthly':
                reportData = {
                    title: 'Rapport Mensuel',
                    period: 'Avril 2024',
                    stats: {
                        totalStudents: 45,
                        monthlyAttendance: '89%',
                        bestCourse: 'ISIL (92%)',
                        improvements: '+5% vs mois précédent'
                    }
                };
                break;
                
            case 'student':
                reportData = {
                    title: 'Rapport par Étudiant',
                    student: 'Ali Yacine',
                    stats: {
                        totalSessions: 20,
                        attended: 18,
                        absences: 2,
                        participation: '90%',
                        averageGrade: 'A'
                    }
                };
                break;
        }
        
        // Generate report HTML
        reportResults.innerHTML = generateReportHTML(reportData, type);
    }
    
    function generateReportHTML(data, type) {
        let html = `<h2>${data.title}</h2>`;
        
        if (data.date) {
            html += `<p><strong>Date:</strong> ${data.date}</p>`;
        }
        if (data.period) {
            html += `<p><strong>Période:</strong> ${data.period}</p>`;
        }
        if (data.student) {
            html += `<p><strong>Étudiant:</strong> ${data.student}</p>`;
        }
        
        html += `<div class="report-stats-grid">`;
        
        for (const [key, value] of Object.entries(data.stats)) {
            const label = formatLabel(key);
            html += `
                <div class="stat-item">
                    <div class="stat-value">${value}</div>
                    <div class="stat-label">${label}</div>
                </div>
            `;
        }
        
        html += `</div>`;
        
        if (data.details) {
            html += `<h3>Détails par Cours</h3>`;
            html += `<table class="report-table"><thead><tr><th>Cours</th><th>Présent</th><th>Absent</th><th>Taux</th></tr></thead><tbody>`;
            
            data.details.forEach(detail => {
                const total = detail.present + detail.absent;
                const rate = ((detail.present / total) * 100).toFixed(1) + '%';
                html += `<tr>
                    <td>${detail.course}</td>
                    <td>${detail.present}</td>
                    <td>${detail.absent}</td>
                    <td>${rate}</td>
                </tr>`;
            });
            
            html += `</tbody></table>`;
        }
        
        return html;
    }
    
    function formatLabel(key) {
        const labels = {
            totalStudents: 'Total Étudiants',
            present: 'Présents',
            absent: 'Absents',
            participationRate: 'Taux Participation',
            averageAttendance: 'Présence Moyenne',
            topParticipant: 'Meilleur Participant',
            mostAbsent: 'Plus Absent',
            monthlyAttendance: 'Présence Mensuelle',
            bestCourse: 'Meilleur Cours',
            improvements: 'Amélioration',
            totalSessions: 'Total Sessions',
            attended: 'Sessions Suivies',
            absences: 'Absences',
            participation: 'Participation',
            averageGrade: 'Note Moyenne'
        };
        
        return labels[key] || key;
    }
});