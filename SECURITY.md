# Security policy

## Reporting a vulnerability

Please do not open a public issue for a security problem. Instead, report it privately by either route:

- **GitHub:** the [Report a vulnerability](https://github.com/Beresol-BV/massimino/security/advisories/new) form on this repository
- **Email:** hello@beresol.eu

Include the steps to reproduce it and what an attacker could do with it.

## Testing

Test against your own local instance. Do not test against massimino.fitness or any data belonging to its users.

## Accidentally committed secrets

If a secret reaches this repository, treat it as compromised: revoke it first, then tell us. Removing it from the code does not remove it from git history.
