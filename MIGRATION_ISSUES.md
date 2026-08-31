# Migration follow-up

This repository is a sanitized current-state duplicate of
`2077-Collective/research`, created on 2026-08-31. The original repositories
remain in `2077-Collective`; GitHub issue and pull-request metadata was not
copied.

## Security

- [ ] Revoke or rotate the Strapi API token that was committed to
  `research/.env.example`, then update the deployed service with the replacement.
- [ ] Revoke or rotate the generated-looking Strapi application keys, salts, and
  JWT secret documented in `strapi-cms/README.md`, then update affected services.
- [ ] Decide whether to rewrite the affected histories in the source repositories
  after rotation.
- [ ] Enable secret scanning and push protection in the destination organization.

## Open work from the source repositories

### `research` pull requests

- [ ] [#166: UI redesign tts](https://github.com/2077-Collective/research/pull/166)
  (`ui-redesign-tts` -> `main`, opened by `mosco98`)
- [ ] [#182: supabase ghost integration](https://github.com/2077-Collective/research/pull/182)
  (`add-ghost-member` -> `main`, opened by `losndu`)
- [ ] [#186: wip: added ui](https://github.com/2077-Collective/research/pull/186)
  (`feat-user-dashboard` -> `main`, opened by `mosco98`)

### `eips_wiki` issues

- [ ] [#15: Include Meta Cover Images for Blog Articles](https://github.com/2077-Collective/eips_wiki/issues/15)

`strapi-cms` and `etherpedia.2077.xyz` had no open issues or pull requests at
the time of duplication.

## Destination setup

- [ ] Recreate only the required Actions secrets, variables, environments,
  webhooks, deploy keys, and branch rules; Git history duplication does not copy
  these repository settings.
- [ ] Verify the production deployments and external CMS/database connections.
- [ ] Update deployment integrations to use the `2077-Research` repositories.
- [ ] Review repository descriptions, homepages, topics, and default branches.
