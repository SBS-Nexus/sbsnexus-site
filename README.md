# SBS Nexus Site — historical website repository

> **Historical / out of current SBS marketing scope (November 2026).** This repository contains an earlier SBS Nexus website/prototype. It is **not** the source of truth for the current SBS Deutschland corporate website, and its existing implementation, copied descriptions or screenshots must not be presented as verified functionality of the current product portfolio.

The active SBS Deutschland GmbH & Co. KG website is [sbsdeutschland.com](https://sbsdeutschland.com/). Its approved portfolio contains exactly four offerings:

| Current focus | Public product link | Positioning |
| --- | --- | --- |
| NormPilot Industrie | https://app.normpilot-industrie.de/ | Industrial audit evidence and readiness |
| HydraulikDoc | https://hydraulikdoc.de/ | Industrial inspections and service documentation |
| ReleaseProof | https://releaseproof.de/ | Deterministic Jira release-readiness |
| Workflow Rescue | https://www.workflowrescue.de/leistungen/ | Reliability services for existing automations |

[PythonPfad](https://pythonpfad.de/) and [SQLPfad](https://www.sqlpfad.de/) are supplementary learning offerings, not primary SaaS products.

## Historical material

Earlier SBS Nexus, AI suite, invoice, contract analysis, RAG, and multi-module positioning in this codebase is historical. Its technology, accuracy metrics, processing-time claims, hosting statements, pricing and implied availability must not be reused as current enterprise claims without a separately approved source and deployed-version verification.

This repository is preserved for traceability. **This documentation-only update does not archive the repository, disable running services, change DNS, alter live deployments or erase legal/data-retention obligations.**

For changes to the current marketing site, first establish its verified deployment source. The historical SBS web repository candidate is private at `SBS-Nexus/sbs-web`; it must not be presumed current solely because the name matches.

## Safety before re-use

- Do not commit customer documents, secrets, lead lists, credentials or exported databases.
- Verify the actual code and dependencies before running any historical application.
- Do not re-enable old domains, outreach, paid plans or integrations without explicit owner, security and legal review.
- Retain historical evidence; coordinate cleanup of personal data or exposed credentials through an incident-response process.

**Legal entity:** SBS Deutschland GmbH & Co. KG · [Official website](https://sbsdeutschland.com/) · [Official LinkedIn](https://www.linkedin.com/company/sbs-deutschland-gmbh-co-kg/)

## Mail credential configuration

Legacy Resend integrations read `RESEND_API_KEY` from the runtime environment. Missing or blank configuration stops the outbound request. Configure credentials in the hosting secret store; never commit them to source. Previewing content does not require a mail credential.

Run the offline credential regression with `python -m unittest discover -s tests -p test_resend_configuration.py -v`. HTTP and database interactions are mocked and all fixtures are synthetic.

### Legacy maintenance integration

The historical browser-embedded maintenance credential has been removed. A read-only request to the existing API with `limit=0` returned HTTP 401 on 2026-11-24; no customer records were requested. Maintenance browser requests now use the signed-in user bearer token and fail locally when it is missing. The backend must independently validate the token and enforce user/tenant ownership; client-side gates are not authorization. Live authenticated maintenance compatibility has not been verified, and this repository is not the current SBS marketing deployment.
