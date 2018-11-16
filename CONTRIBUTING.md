# Contributing to Blueprint CSS

We would love for you to contribute to Blueprint CSS and help make it even better than it is
today! As a contributor, here are the guidelines we forked from Angular and we would like you to follow:

 - [Code of Conduct](#coc)
 - [Getting Started](#gs)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Commit Message Guidelines](#commit)

## <a name="coc"></a> Code of Conduct
Please read and follow the Angular [Code of Conduct](https://github.com/angular/angular/blob/master/CODE_OF_CONDUCT.md).

## <a name="gs"></a> Getting Started

Blueprint CSS has two projects. One is the library itself while the
other is the documentation site built with the Angular CLI. Both
projects use npm scripts in the package.json files. Each has
a `build`, `lint`, and `test` command.

The Angular project can be started by running `npm start` in the `/docs` directory.
The documentation imports the Blueprint CSS source code directly so you can modify changes
and see them reflect instantly in the documentation project.

To run library tests in the `lib` directory you must have the Angular documentation
project running by running `npm start` in the `/docs` directory. Once running
run `npm run test` in the `/lib` directory. This will run
the snapshot tests and compare them against previous snapshots of the documentation
in source control.

The snapshot tests provide a small percentage of leeway for minor browser differences
but if a change breaks existing behavior the tests will fail. Once tests have been
run you can view the report by opening the `/lib/backstop_data/html_report/index.html` in your browser.

## <a name="issue"></a> Found a Bug?
If you find a bug in the source code, you can help by
[submitting an issue](#submit-issue) to our GitHub Repository.
Even better, you can [submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to *implement* a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be
discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for
your problem already exists and the discussion might inform you of
workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we
need to reproduce and confirm it. In order to reproduce bugs, we will
systematically ask you to provide a minimal reproduction scenario using
https://stackblitz.com/. Having a live, reproducible scenario gives us a wealth
of important information without going back & forth to you with additional questions like:

- version of Blueprint CSS used
- 3rd-party libraries and their versions
- and most importantly - a use-case that fails

A minimal reproduce scenario using https://stackblitz.com/ allows us to quickly
confirm a bug (or point out coding problem) as well as confirm that we are
fixing the right problem. If plunker is not a suitable way to demonstrate the
problem (for example for issues related to our npm packaging), please create a
standalone git repository demonstrating the problem.

We will be insisting on a minimal reproduce scenario in order to save
maintainers time and ultimately be able to fix more bugs. Interestingly, from
our experience users often find coding problems themselves while preparing a
minimal stackblitz. We understand that sometimes it might be hard to extract
essentials bits of code from a larger code-base but we really need to isolate
the problem before we can fix it.

Unfortunately, we are not able to investigate / fix bugs without a minimal
reproduction, so if we don't hear back from you we are going to close an issue
that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/coryrylan/blueprint-css/issues/new).

### <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/coryrylan/blueprint-css/pulls) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
1. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
  Discussing the design up front helps to ensure that we're ready to accept your work.
1. Fork the coryrylan/blueprint-css repo.
1. Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules).
1. Run a full production build by running `npm run build:prod`
1. Run the full test suite by running `npm run test`
1. Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit).

     ```shell
     git commit -a
     ```
    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

1. In GitHub, send a pull request to `blueprint-css:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the blueprint-css test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests).
* All public API methods **must be documented**. (Details TBC).
* We follow the built in Prettier formatter build step.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

```
docs(changelog): update changelog
```
```
fix(release): need to depend on latest rxjs

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope
The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.

The following is the list of supported scopes:

* **docs**
* **lib**

There are currently a few exceptions to the "use package name" rule:

* **packaging**: used for changes that change the npm package layout in all of our packages, e.g.
  public path changes, package.json changes done to all packages, d.ts file/format changes, changes
  to bundles, etc.
* **changelog**: used for updating the release notes in CHANGELOG.md
* none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.
