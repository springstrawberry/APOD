# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The NASA APOD Viewer team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

If you discover a security vulnerability, please follow these steps:

1. **Do Not** open a public GitHub issue
2. **Email** the maintainer directly (check the repository for contact information)
3. Include as much information as possible:
   - Type of vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Communication**: We will keep you informed about the progress of fixing the vulnerability
- **Credit**: We will credit you for the discovery when we release a fix (unless you prefer to remain anonymous)
- **Timeline**: We aim to release a fix within 30 days of the initial report

## Security Best Practices

When using this application:

1. **API Keys**: Never commit your NASA API key to version control
   - Store it securely
   - Use environment variables in production
   - Rotate keys regularly

2. **Dependencies**: 
   - Keep all dependencies up to date
   - Run `npm audit` regularly
   - Review security advisories

3. **HTTPS**: Always serve the application over HTTPS in production

4. **Content Security Policy**: Consider implementing CSP headers when deploying

## Known Security Considerations

- This application makes client-side API calls to NASA's APOD API
- API keys are visible in client-side code (this is acceptable for NASA's public API with rate limits)
- For production use, consider proxying API requests through your backend to protect API keys
- User input is limited to date selection, which is validated

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions as soon as possible

## Comments on This Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue.

## Security Hall of Fame

We thank the following individuals for responsibly disclosing security issues:

*(No reports yet)*

---

Thank you for helping keep NASA APOD Viewer and its users safe! 🔒

