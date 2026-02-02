const fs = require('fs');
const report = JSON.parse(fs.readFileSync('./lighthouse-report-prod-v2.json', 'utf8'));

console.log('--- Scores V2 ---');
Object.values(report.categories).forEach(cat => {
    console.log(`${cat.title}: ${(cat.score * 100).toFixed(0)}`);
});

console.log('\n--- Failed Audits (Score < 1) ---');
console.log('(Only critical ones)');

const audits = report.audits;
Object.values(audits).forEach(audit => {
    if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'informative' && audit.scoreDisplayMode !== 'manual') {
        console.log(`[${audit.id}] ${audit.title} (Score: ${audit.score})`);
    }
});

const errorsAudit = audits['errors-in-console'];
if (errorsAudit && errorsAudit.details && errorsAudit.details.items) {
    console.log('\n--- Console Errors ---');
    errorsAudit.details.items.forEach(item => {
        console.log(`Error Source: ${item.source}`);
        console.log(`Error URL: ${item.url || 'N/A'}`);
        console.log(`Error Msg: ${item.description || item.message}`);
    });
}
