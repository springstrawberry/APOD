# Contributing to NASA APOD Viewer

Thank you for your interest in contributing to the NASA APOD Viewer project! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Enhancements

We love new ideas! To suggest an enhancement:
- Check if the enhancement has already been suggested
- Create an issue with a clear description of the feature
- Explain why this enhancement would be useful
- Provide examples if possible

### Pull Requests

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Run the linter**
   ```bash
   npm run lint
   ```

4. **Build the project** to ensure everything works
   ```bash
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** with:
   - A clear title and description
   - Reference to any related issues
   - Screenshots or GIFs for UI changes

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/apod-viewer.git
   cd apod-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Get a NASA API key from [https://api.nasa.gov](https://api.nasa.gov)

4. Add your API key to `src/lib/api.ts`

5. Start the development server:
   ```bash
   npm run dev
   ```

## Code Style

- Use TypeScript for type safety
- Follow the existing naming conventions
- Use functional components with hooks
- Keep components small and focused
- Write self-documenting code with clear variable names

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Start with a verb (Add, Update, Fix, Remove, etc.)
- Keep the first line under 72 characters
- Reference issues and pull requests when relevant

### Examples:
- `Add: date range validation for APOD queries`
- `Fix: loading state not clearing on error`
- `Update: improve mobile responsive layout`
- `Remove: deprecated API endpoint`

## Testing

Before submitting a PR:
- Test all features you've modified
- Check responsive design on different screen sizes
- Test with different dates in the APOD archive
- Verify error handling works correctly

## Questions?

Feel free to create an issue for any questions about contributing!

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and encourage diverse perspectives
- Focus on constructive feedback
- Assume good intentions

Thank you for contributing! 🚀🌌

