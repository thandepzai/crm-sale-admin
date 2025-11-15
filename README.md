## Enviroment Requirement

-   Node Version: 20.10.0
-   VSCode plugin: Prettier, Eslint
-   Package management by Yarn:

    ```
    npm install yarn
    ```

    ```
    // run yarn in responsitory
    yarn
    ```

## Flow working with git

-   Git tree includes master, develop, feature and hotfix branch
-   **Master**: Branch for product release
-   **Develop**: Main working branch, include almost history code of project
-   **Feature**: Checkout from develop, for individual purpose. Example: feature/login, feature/home, feature/course, ...
-   **Hotfix**: For hot fix bugs, use it when needing apply small change code to fast fix bugs. Merge to develop and master after commit

Note:

-   Do

    ```
    git pull origin develop
    git checkout feature/home
    git merge develop
    ```

    frequently for update newest status from remote develop, to avoid conflict.<br>

-   Commit and push feature branch (feature/home, feature/login) frequently.

-   After done a specific commit from a feature and want to merge to develop, don't merge directly from local.<br>
    ❌ Don't do this

    ```
    git checkout develop
    git merge feature/home
    git push
    ```

    ✅ Do this: Create a pull request (merge request) from github page, to merge feature/home to develop branch.

-   In case of conflict, changing base code, creating a hot fix, -> need a dicussion.

## Project Structure

-   Project structure includes two main parts: **lib**, **module** and other sub parts <br>

    ```
    📦src
    ├── 📂env
    ├── 📂lib
    │   ├── 📂component
    │   │   ├── 📂BottomSheet
    │   │   ├── 📂Modal
    │   ├── 📂exception
    │   ├── 📂hook
    │   └── 📂util
    ├── 📂module
    │   ├── 📂_core
    │   │   ├── 📂app
    │   │   │   ├── 📂component
    │   │   │   │   ├── 📂AppModal
    │   │   │   │   ├── 📂AppWrapper
    │   │   │   ├── 📂config
    │   │   │   │   └── 📂type
    │   │   │   ├── 📂icon
    │   │   │   ├── 📂layout
    │   │   │   │   ├── 📂Footer
    │   │   │   │   ├── 📂Header
    │   │   │   └── 📂style
    │   │   ├── 📂domain
    │   │   │   ├── 📂constant
    │   │   │   └── 📂service
    │   │   └── 📂infras
    │   │       ├── 📂config
    │   │       │   ├── 📂endpointUrl
    │   │       │   ├── 📂exception
    │   │       │   ├── 📂request
    │   │       │   └── 📂type
    │   │       ├── 📂hook
    │   │       └── 📂util
    │   ├── 📂auth
    │   ├── 📂common
    │   ├── 📂course
    │   │   ├── 📂app
    │   │   │   ├── 📂icon
    │   │   │   ├── 📂component
    │   │   │   │   ├── videoCard
    │   │   │   └── 📂view
    │   │   │   │   ├── 📂course
    │   │   │   │   ├── 📂courseRegister
    │   │   │   │   ├── 📂courses
    │   │   │   │   ├── 📂lesson
    │   │   │   │   └── 📂test
    │   │   ├── 📂domain
    │   │   │   ├── 📂api
    │   │   │   ├── 📂config
    │   │   │   │   └── 📂type
    │   │   │   ├── 📂constant
    │   │   │   ├── 📂dto
    │   │   │   ├── 📂model
    │   │   │   └── 📂service
    │   │   └── 📂infras
    │   │       ├── 📂config
    │   │       │   ├── 📂endpointUrl
    │   │       │   ├── 📂type
    │   │       └── 📂util
    │   ├── 📂interaction
    │   ├── 📂news
    │   └── 📂qa
    ├── 📂style
    ```

> **lib** for library that built by core developer, using as the base of any similar project.

-   **component**: provides many ready components, like other component from github
-   **hook**: provides many hooks many can help developing
-   **util**: provides many functions may can help developing

> **module** is the area that developer works. We implement **DDD (Domain Driven Design)** for project architecture. It have **\_core** module like setup, config, shared component, ... and other module that have own business. In each module, we have:

-   **app**: For UI layer, include **view**, **component**, **icon**, **layout**, **style**, ... that using for this module.
-   **domain**: For Logic layer, include **dto**, **api**, **service**, ...
-   **infras**: Frastructure, for base config in module, like connecting to third party, defined endpoint-url, ...
