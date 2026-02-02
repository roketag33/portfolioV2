const fs = require('fs');
const report = JSON.parse(fs.readFileSync('./lighthouse-report-prod-v4.json', 'utf8'));

console.log('--- Scores V4 ---');
Object.values(report.categories).forEach(cat => {
    console.log(`${cat.title}: ${(cat.score * 100).toFixed(0)}`);
});

console.log('\n--- Failed Audits (Score < 1) ---');
console.log('(Only critical ones)');

const audits = report.audits;
Object.values(audits).forEach(audit => {
    // Show anything that isn't perfect (score < 1) and relevant
    if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'informative' && audit.scoreDisplayMode !== 'manual') {
        console.log(`[${audit.id}] ${audit.title} (Score: ${audit.score})`);
        if (audit.details && audit.details.items && audit.details.items.length > 0) {
            // Print first few items to understand why
            console.log('  -> ' + JSON.stringify(audit.details.items.slice(0, 1)));
        }
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
