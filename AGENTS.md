# Website and static-copy synchronization

The user instructed on 2026-09-04 that subsequent changes must update both the local static copy and the existing online site.

- Keep `app/page.tsx`, `app/globals.css`, and `public/` as the common source.
- The online site retains its existing full set of sections. The downloadable static variant includes the complete `online` book-fair section and excludes only the `schedule`, `booths`, and `visitor-tools` sections and their navigation links. Retain activity-overview entries, registration links, voucher plan, and organizers.
- After relevant source changes, run the existing site build, then `node scripts/export-static.cjs ABSOLUTE_OUTPUT_DIRECTORY`. Regenerate the ZIP of the complete static folder and publish the same source to the existing Sites project.
- The user-selected local static folder is now `/Users/zt/Desktop/_專網/佛光山2026 簡易版`. Make future local updates there; do not keep using the earlier external-drive or Windows paths as the working copy.
- Before regenerating, inspect this folder for user edits and preserve or incorporate them in the common source. Export directly to this folder after source changes.
- ZIP downloads, when needed, remain under the task's `outputs/` directory.
- Keep the online site publicly readable without ChatGPT login; preserve noindex metadata/headers. Reuse `.openai/hosting.json` and the existing production URL.
- Verify omitted static sections and their menu links, local asset references, retained interactive behavior, UTF-8 Chinese, and the organizers remaining at the bottom.
- This user instruction supersedes the earlier handoff file's request not to create or synchronize static HTML.
