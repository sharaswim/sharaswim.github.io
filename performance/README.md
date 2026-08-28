# Schedule refresh performance v1

Only the public availability polling changes. Parent attendance, membership requests, prices, CAPTCHA and registration validation are unchanged. Initial visible load fetches immediately; periodic refresh is 60 seconds, with a 15-second focus/visibility throttle, no overlapping request, hidden-tab pause, cleanup abort and 30-second timeout. No balances or personal data are cached. The server continues to validate registrations.

Rebuild: `node performance/build.cjs`
Tests: `node performance/polling.test.cjs` (12 synthetic tests, no network)

The previous bundle stays at assets/index-attendance-v1.js for rollback. The separate Apps Script optimization must be installed and verified independently. Full mobile/browser visual acceptance remains manual.
