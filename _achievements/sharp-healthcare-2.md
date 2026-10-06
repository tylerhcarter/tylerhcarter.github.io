# Brag List — Tyler Carter, Sharp HealthCare (Aug 2021 → Sep 2026)

_Draft 2. Sources: `github.md`, `jira.md`, `kudos.md`, `leadership.md`, `manager.md`, `metrics.md`. Every bullet has a link or quote behind it._

## Headline

**Career highlights**

1. **epic-api — Sharp's Epic EHR API gateway.** Built from an empty repo (Mar 2023) into the integration layer under every Sharp patient-facing app: Available Appointments, Scheduling Tickets, FastPass, Wait Times, Proxy, Notifications, Billing, Demographics. **1.85M requests/day (55.6M/30d), 0.34% 5xx; system gateway 21 5xx in 5.1M requests. Traffic +37% YoY, ~520M requests in the last 12 months.** 1,100 commits, 235 PRs, owned continuously for 3.5 years. _(metrics.md)_ _(2023 →)_
2. **Epic / MD Staff → Provider ETL pipeline.** Clarity → Snowflake views (`ea-webdev-app`) → Airflow (`mwaa-config`) → Lambda ETL (`epic-api`) → Provider API; extended in 2026 with the MD Staff credentialing ETL (`providers-rest`). Every provider, place, department, and visit type shown in the Sharp App, web portal, Wait Times, and Reserve with Google comes through this pipeline nightly. _(2023–2024; 2026)_
3. **Epic / MyChart third-party integration.** Epic OAuth/backend auth, SOAP + FHIR + Marque APIs, MyChart SDK in the mobile app, MyChart Extensibility auth model (SMART on FHIR), and Reserve with Google deep-link tracking — the vendor-integration surface the team depends on. _(2023 →)_

**Also built from zero:** Sharp Account rewrite (2022), Wait Times platform + admin (2024; 308k admin requests/yr, 0 5xx), Backstage developer portal (2024), SHP FHIR Provider Directory API (2026), A&G AI — first production agentic app at Sharp (2026). portal.sharp.com (mychart-web-portal, 330 commits): **24M requests/yr**.

**By the numbers:** 716 merged PRs · 603 code reviews · 41 repos · ~3,500 commits in sharphealthcare/* since Aug 2021. Year-over-year PRs: 9 → 61 → 124 → 239 → 113 → 170.

**In their words:**
- Manager, introducing me to stakeholders: **"a technical lead on my team"** (Gilmore, Aug 2025)
- Director, to leadership: **"The need to add QA capacity is a result of the amazing work you're doing. The volume and velocity of delivering features is outstanding."** (Sweetnam, Oct 2024)

## Themes

1. **Greenfield platform builder** — six systems taken from empty repo to production; epic-api and the Provider ETL are now load-bearing for every patient-facing app.
2. **Reliability & incident ownership** — diagnosed + led resolution on Sharp Account outage (2022), VUC API outage (2023), two Wait Times incidents (2024), Provider API outage (2026).
3. **Engineering process & governance** — GitLab→GitHub migration, CODEOWNERS strategy, Dependabot org rollout, CDK tagging/naming standards, async sprint reviews, sprint metrics.
4. **Cross-team pull** — SHP (Battin, R. Jones), Epic team (Deng), Credentialing (Fierro) come to me directly for API, compliance, and AI work.

---

## 2026 (Jan–Sep) — 170 PRs

- **Built and shipped SHP FHIR Provider Directory API** (`shp-provider-directory`, 91 commits, 24 Jira tickets in PPVST-1946). Took ownership Mar 3, defined architecture (SQL-backed, Keycloak auth, CURES-scoped), led QA onboarding Jun 10, published prod endpoints Jun 25, declared complete Jul 8. → CMS interoperability compliance for Sharp Health Plan. _Evidence: leadership.md 2026; PRs #2–#10._
- **Assigned lead of A&G AI** (Jun 29) after OEC paused; **announced production deployment Aug 20** — Teams bot + web console + Bedrock KB ingestion + Inovaare integration (`shp-ag-ai`, 48 PRs / 94 commits in 3 months). Caught Teams-bot conversation-model design flaw (Aug 11), moved prompts/templates to AppConfig (Aug 26), added PHI-scan workflow + PHI-safe logging. → First production agentic AI app at Sharp; appeals/grievances staff get AI case summaries attached back into their system of record. _Evidence: leadership.md; PRs #24, #32, #35, #39, #41, #44._
- **Implemented SHP Formulary API** from the systems architect's spec; clarified CARIN vs Formulary vs Provider Directory scope with SHP (Aug 25–26) and dropped a subscriber-ID assumption on authz grounds. Stood up `shp-formulary` CI/tagging/domain/Backstage (7 PRs) and fixed schema drift against real formulary data. _Evidence: leadership.md; shp-formulary PRs._
- **MD Staff ETL → Provider service** (career highlight #2, after the 2024 Epic ETL) (`providers-rest` 15 PRs, `ea-webdev-app` 11 PRs): one-pass provider creation, Command-pattern upsert refactor, dashboard, Zod message validation, hospital affiliation filtering by MD Staff status (drove that decision with Credentialing Mar 25). → Provider data now sourced from the credentialing system of record. _Evidence: PRs #457, #464, #450; leadership.md._
- **Slot-level modality (virtual vs in-person) for First Available Appointment** (PPVST-2080): feature-flagged enrichment + EMF metrics + Snowflake view. _Evidence: epic-api #833, #836, #848; ea-webdev-app #69._
- **Reserve with Google integration** — linksource tracking across web portal + mobile deep links (PPVST-1780). _Evidence: mychart-web-portal #310/#313/#317; shc-mobile-app #2849/#2921._
- **MyChart Extensibility** — defined auth model (launch-code→token exchange), pushed mainline+feature-flags over long-lived branch, flagged manual-deploy risk. _Evidence: leadership.md Apr 24, Jun 23, Jul 28, Aug 20._
- **AWS account migration prep** for wait-times-admin, appconfig-teams-helper, epic-api: cross-account roles, permissions boundaries, shared WAF rule groups, Secrets Manager over SSM (20+ PRs, Aug–Sep). _Evidence: wait-times-admin #90–#102; epic-api #852._
- **Provider API outage (Sep 8)** — identified timeouts and traced downstream cause/effects to DB CPU exhaustion from a schema change; named in RCA. _Evidence: leadership.md._
- Cleanup/hardening: cache-only architecture for Available Appointments (removed fallback strategies, PPVST-1580), preload handler overhaul with FIFO dedup, SQS between SNS→Lambda in Provider ETL, resolved all dependency vulns, Node 24. _Evidence: epic-api #718, #739, #663, #766._
- Governance: fixed Backstage catalog entities across 6 repos; trunk-protection survey + recommended policy; Wiz IaC scan migration in `arch`; monthly grouped Dependabot rolled to 5 repos. _Evidence: web-patient-portal #2; arch #57._

## 2025 — 113 PRs

- **Began migrating epic-api to single-application deployments** (PPVST-1476, 8 sub-tasks I scoped): NX workspaces, split out Provider ETL / Wait Times / User Proxy / kickoff stacks, removed UserProxy's dependency on the monolithic InfrastructureStack, decommissioned old stacks. → Those APIs now deploy independently; remaining stacks still to split. _Evidence: epic-api #540, #569, #572, #573, #582, #585._
- **Rewrote User Proxy API as serverless Fastify app** (#574) with Dynatrace layer, CORS, OpenAPI docs in Backstage. _Evidence: #574, #584, #607, #612._
- **Named lead of Infrastructure Cleanup project** (May 20) — 13 tickets: KMS on ETL topics (ClearData compliance), custom CNAMEs for gateways, CDK tagging/naming standards across 4 apps, Wait Times Display as native AWS integration, inactivity alarms. _Evidence: leadership.md; PPVST-1465; epic-api #591, #589, #576._
- **Authored Epic Data Gateway / Okta migration work plan** — implementation, risk, rollback, testing, comms (Jun 16). Executed SecureAuth→Okta for Wait Times Admin, CURES Member Admin, Epic API (PPVST-1452). _Evidence: leadership.md; wait-times-admin #51; ansible #548._
- **Organized + led Tech Debt Project Proposals** (Jan 29) — E2E realignment, crash investigation, API/SDK/DevOps streams — and authored the proposal doc. **Organized MD Staff ETL Technical Planning** (Oct 15) → became the Jan 2026 delivery above. _Evidence: leadership.md._
- **Unread-messages indicator + notifications endpoint** (PPVST-562) end-to-end: epic-api notification API → mobile red dot → refresh on proxy switch. _Evidence: epic-api #559; shc-mobile-app #2446, #2449._
- Mobile: SRS VUC refactor w/ AppConfig-driven peds eligibility by age, After-Hours Peds card, login accessibility (color contrast, labels), sign-in duration metrics, Zod config validation. _Evidence: shc-mobile-app #2310, #2315, #2393, #2284, #2248, #2585._
- **Copilot onboarding instructions** for epic-api and shc-mobile-app (Aug 13) + coding-standards refresh + devcontainer → repos are agent-ready. _Evidence: epic-api #595, #620, #667; shc-mobile-app #2657._
- Wait Times Admin hardening: session maxAge 8h→1h, logout redirect, permissions boundary removal, docs. _Evidence: wait-times-admin #56–#60._
- Manager introduced me to stakeholders (Aug 7) as **"a technical lead on my team"** for Engaging Networks; led it through New Technology Orientation (technical review), then handed off.
-  _Evidence: manager.md._

## 2024 — 239 PRs (peak year)

- **Built Wait Times platform end to end**: API redesign proposal (#441) → management endpoints, refresh handler, types package, hardened infra (epic-api #447–#483) → **Wait Times Admin app from PR #1** (Remix, Orval, SecureAuth; 20 PRs Sep–Dec) → mobile UC Wait Times card (#2022) → **soft closure / high-threshold** (PPVST-1344; admin #41–#47, mobile #2179/#2181). **Prod go-live Oct 10.** → Patients see live urgent-care wait times and closures; ops staff manage them without engineering. _Kudos: "Congrats on the wait times admin go live" (Montgomery); core team on UC Soft Closure kickoff deck (Oct 29); owned INC 1882289._
- **Backstage.io Phase 2** (PPVST-955, 30 tickets; `backstage` 162 commits): upgraded platform, catalogued 20+ services, Dynatrace/EOL/SonarQube plugins, TechDocs on S3, k8s prod cluster, migration guide. → Single developer portal for the department; every repo now has `catalog-info.yaml`. _Evidence: jira.md 2024; 15 catalog PRs Apr 2024._
- **Epic Provider ETL + Snowflake integration (`ea-webdev-app`, 29 PRs Jan–Feb) + Airflow orchestration (`mwaa-config`, 8 PRs)** — a career highlight. Provider/place/department/visit-type data flows nightly Clarity → Snowflake views → Airflow-kicked Lambda ETL → Provider API. → Every downstream app (Sharp App, web portal, Wait Times, Reserve with Google) reads provider data from this pipeline. Extended in 2026 by the MD Staff ETL. _Evidence: ea-webdev-app #19–#49; mwaa-config #387–#416._
- **epic-api production hardening**: secret/parameter caching layers, CloudWatch dashboards, CDK Nag, SAST in pipeline, OpenAPI linting, Powertools, Node 20, GTS style, throughput reduction to Epic, DST offset bug fix, secondary indexes for appointment cache (slug / epic_department_id). _Evidence: #204, #230, #289, #210, #442, #424, #303, #273, #166, #290–#291._
- **Mobile app release engineering**: Dynatrace plugin, Snowplow tracker, SonarQube branch pipeline, Dependabot, AppConfig custom domain + separate feature-flag profile, release process docs, in-app **update prompt + eligibility hook** with metrics. _Evidence: shc-mobile-app #1751, #1514, #1905, #1859, #1887, #1942, #1818, #2113, #2130, #2147._
- **Flu Shot cards** deployed via AppConfig with dynamic configuration updates — copy/link changes shipped without an app release. PPO fix (praised: "You're awesome! Thank you!!" — Parker, Sep 3, for same-day test+deploy of reason-for-visit change). _Evidence: #1941, #2003, #2042; kudos.md._
- **Team-wide Dependabot rollout** (PPVST-1048–1050): templates, deprecated + production repo configs; standardized across epic-api, mobile, customers-rest, web-patient-portal, rn-plugin. _Evidence: jira.md; PRs #367, #1859, #2, #1, #93._
- **Sprint metrics / Time-in-Status reporting** (SprintMetrics.xlsx, metrics-summary workflows in epic-api #494 + mobile #2117). Recognized in Thanks & Recognitions channel: "Thank you for all the Time in Status charts! Very very informative!" (Silva). _Evidence: leadership.md; kudos.md._
- **Process leadership**: authored **Async Sprint Review proposal** (Nov 4) — replaced live demo meetings with recorded demos; drove **tech + design handoff before kickoff** and **design-one-sprint-ahead dependency tracking** in Wait Times planning (Aug 22, 26). _Evidence: leadership.md._
- **Incidents**: routed INC 1781516 ("I'm On My Way") to Epic SA with integration context; owned INC 1882289 (Wait Times Admin login). _Evidence: leadership.md._
- **Sweetnam to leadership (Oct 10)**: "The need to add QA capacity is a result of the amazing work you're doing. The volume and velocity of delivering features is outstanding." _Evidence: kudos.md._
- Retired Virtual Urgent Care component (#26), migrated web portal from Component Library → SharpUI (#209), Provider Connections endpoint + new mobile strategy (#360, #1834), Snowplow on web portal (#101).

## 2023 — 124 PRs

- **Built epic-api from scratch** (`epic-api`, 78 PRs this year; 1,103 commits lifetime): Available Appointments (Epic + Marque, first-available multi-call search), Virtual Urgent Care, **Scheduling Tickets**, **FastPass** (retrieve/accept), PastVisits, PatientDemographics, Billing, Identifiers, Proxy API, Override Management, WaitTimes Display infra, **Provider/Place ETL pattern**, monorepo ADR-001, NPM workspaces, CODEOWNERS, prod stacks + publish-on-complete deployment. → The Epic integration layer every Sharp patient-facing app now sits on. _Evidence: #18–#196._
- **Sharp App (shc-mobile-app) launch features**: Scheduling Tickets + FastPass integration, deep links, Create Account changes, Spanish translations, privacy/ToS on login, prod CDK stack refactor. _Evidence: #1192, #1241, #1282, #1350, #1370, #1442._
- **mychart-web-portal foundations** (330 commits lifetime): config module, pre-commit typechecking, coverage thresholds, CloudFront request signing, Contentful client, cache invalidation on deploy. _Evidence: #3, #6, #9, #14, #15, #86._
- **Snowflake views for provider/place/visit-type attributes** (`ea-webdev-app`, 11 PRs) — the data contract behind the Provider ETL. _Evidence: #8–#18._
- **Led VUC API outage resolution (Dec 29)**: requested API GW logs, root-caused CDK parameter name, deployed fix, confirmed. "I'll take care of it." _Evidence: leadership.md._
- **CODEOWNERS / review ownership strategy** (Dec 28) — round-robin, SME ownership, review fatigue. Created CODEOWNERS in epic-api and mobile. _Evidence: leadership.md; #160, #104._
- **Migrated Companion App and Mulesoft to OAuth** (PPVST-487, -489); TLS policy updates on account/identity.sharp.com (🔥 tickets PPVST-509/510); cert renewals. _Evidence: jira.md 2023._
- Facilitated Patient Portal Scrum-of-Scrums — "That was a great scrum of scrums Tyler!" (Soto, Feb 9). Team-wide recognition post for Nov 16 Patient Engagement deployment. _Evidence: kudos.md._
- Microcks external API mocks (ansible #250); proxy-rest integration tests in pipeline (#13); DateField component (#62).

## 2022 — 61 PRs

- **Sharp Account rewrite (`sharp-portal`) — 507 commits, 30 PRs, Feb 2022→Mar 2023**, 7 Jira epics (PPVST-149–156). Remix app: PingFederate Authentication API integration, DynamoDB sessions, ioredis, WSS, Equifax identity quiz client, AccountService auth, Joi validation, Cypress, versionless Jenkins pipeline, k8s deploy, metrics architecture proposal (SARW-38). Also `account-rest` (authorizer, unit tests, SNS on create/update, architecture docs) and `verify-code-service`. → Replaced legacy patient identity/profile management for all Sharp patients. _Evidence: sharp-portal #1–#60; account-rest #1–#4; jira.md 2022._
- **Led Sharp Account production outage (Aug 22)**: identified expired LDAP cert, filed incident, ran comms, wrote customer-facing resolution guidance. _Evidence: leadership.md._
- **PingFederate upgrade** across INT/sandbox/prod incl. LDAP fixes (PPVST-153); bulk-export config tooling (pingfederate #3). _Evidence: jira.md._
- **Presented GitLab→GitHub migration at Web Dev Monthly Forum (Oct 7)** — governance, permissions, Jenkins/SonarQube/Jira integration, CODEOWNERS. Ran the migration (PPVST-18 + 15 repo tickets); Jira Cloud plugin + CASC config in Jenkins. _Evidence: leadership.md; jira.md PPVST-742; jenkins #13–#14; ansible #107._
- **Presented + demoed Digital Signage Framework POC (Jan 20)** — device mgmt, publishing, scheduling, Drupal integration, React displays; fielded architecture Qs from Facilities. _Evidence: leadership.md._
- Ansible/k8s: sharp-portal deployment playbooks, PingFederate certs, Customer REST authz policy (12 PRs). `standards` repo: Jenkins webhook, repo setup docs. Server patching (Mar/Apr/May/Nov) and Companion App SSO cert. _Evidence: ansible #10–#107; jira.md PPVST-14._

## 2021 (Aug–Dec) — 9 PRs, first 5 months

- **`feature-flags-rest`** — dynamic feature flags on AWS Parameter Store, 58 commits (first project, Aug 2021–May 2022). _Evidence: commits table._
- **`web-alerts`** — Dynatrace alerting profiles as code with Jenkins validation + deploy-on-merge, value-stream refactor (35 commits, 5 PRs). _Evidence: #1–#6._
- Founded **`standards`** repo (coding standards & governance, PR #1) and first Jenkins docs (Secrets Manager, Dynatrace certs). _Evidence: standards #1–#2; jenkins #1–#2._

---

## Gaps / to fill by hand

- 2021–2022 kudos (M365 retention window) — check old email PSTs or ask Gilmore/Soto directly.
- Annual reviews, ratings, comp changes — Workday.
- Available Appointments cache hit rate — custom metric, not pulled.
- FY25 accomplishments summary (self-authored, referenced by Copilot) — attach as appendix.
