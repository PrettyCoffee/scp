# [Put project name here]

## What is this

This project is based off the reddit community [r/startpages](https://www.reddit.com/r/startpages) and aims to be a community project.

For further details, have a look at the associated posts:

- [Initial post](https://www.reddit.com/r/startpages/comments/ymzu14/lets_create_something_neat_together/)
- [Finding a concept](https://www.reddit.com/r/startpages/comments/yrqt41/lets_create_something_neat_together_finding_a/)

## Concept

### Picked comment (most upvotes)

> I think something like this startpage would be really cool. https://www.reddit.com/r/startpages/comments/eeal0f/bashrc_version_2/
>
> Features:
>
> - Multiple toggleable tiles
> - Ability to choose background
> - Ability to resize tiles
>
> — [u/SadWumpus](https://www.reddit.com/r/startpages/comments/yrqt41/comment/ivv538k/?utm_source=share&utm_medium=web2x&context=3)

### Refined concept

A startpage with different customizable tiles.
~~Each time you create a tile, it will start off as a terminal like text area.~~
You can list available widgets or start a widget in there.

Edit: I decided to go with a full blown UI editor instead of terminals.

Features:

- [x] Resizable tiles
- [x] Positioning of tiles
- [x] Background can be chosen
- [ ] Different usable widgets:
  - [ ] Link tree (like terminal filemanager)
  - [ ] Weather
  - [ ] Clock
  - [ ] Todo list
  - [ ] System fetcher

### Stretch goals

- [ ] Full keyboard support
- [ ] More widgets, e.g.:
  - [ ] Calendar
  - [ ] Planner
  - [ ] Shortcut bar
  - [ ] Spotify widget
  - ...
- [ ] ~~More commands~~
- [ ] Custom icons (pasted svg paths)
- [ ] ~~Terminal autocomplete~~
- [ ] Customizable color theme
- [x] Custom CSS for all tiles
- [ ] Custom CSS for individual tiles
- [ ] Web extension
- [x] [Hero Patterns](https://heropatterns.com/) as background
- [ ] Workspaces as pages for different topics

## Contributing

### Coding Guidelines

- Try to use the existing directory structure and adapt to it.
- Try to keep your PRs as small as possible.
- Basically all other guidelines are set by the eslint configuration.
  - Recommendation: Activate automatic linting on save in your IDE
  - Alternative: Manually run `npm run lint:fix`
  - Please don't deactivate eslint rules without a particular reason.

### Commit messages

This repository uses [conventionalcommits](https://www.conventionalcommits.org/) as convention for commit messages.

Wrap up of the convention:

- Pattern: `<type>[OptionalScope]: <Description>`
- Examples:
  - `feat(TextInput): Create component`
  - `chore: Update dependencies`
- Available types:
  - `feat`: Feature addition
  - `fix`: Bug fix
  - `docs`: Documentation only changes
  - `refactor`: Code cleanup, neither feat nor fix
  - `revert`: Revert a change
  - `perf`: Performance improvements
  - `chore`: Change to tooling, build process, dependencies etc
