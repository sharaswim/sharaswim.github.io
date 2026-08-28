# Attendance v1 — prepared, not deployed

Requires the separate Apps Script Attendance v1 package on the existing public deployment before merging this branch. No endpoint changes, no credentials, no analytics or new network requests.

The server adds child.attendance only after existing family ID + phone authentication. This component is read-only, includes monthly totals and per-session records, and exposes no other children's data or admin audit notes. One justified absence per calendar month applies across all groups and subscription lengths. It does not carry over, reduce fees or automatically grant a makeup lesson.

The original assets/index-termfix-v1.js is retained. Rebuild with `node attendance/build.cjs`. The existing repository contains a compiled application, not the original React project; anchors fail closed if its structure changes. For a future full app rebuild, port attendance-component.js to the original source and add it after each child's membership card content.

Validated: compiled bundle syntax, DOM interactions in the admin (17 DOM/component cases together), server privacy and admin/parent parity. Full Chrome visual testing was blocked by an unavailable browser download and remains a deployment acceptance check. Do not claim this branch has been visually tested in a real browser.
