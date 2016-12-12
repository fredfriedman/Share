## Architecture

> Application is developed in Javascript using React-Native 34.1 and React 15.3.2

Our application began with the presentation, business, and data layers combined, but has since began to take on a more redux architecture. At the moment, our main branch only features a portion of the app using redux; however, we have begun migrating to a full implementation inside the `redux-refactor` branch. Here, the application has undergone significant architectural changes to fully reflect the redux structure; however, it is only about 50% complete into the transformation. As such, we have deployed the basic application without these changes, but suggest future development be made on that branch.

#### File System

- app
    - /actions
    - /components
    - /config
    - /containers
    - /images
    - /lib
    - /Reducers
    - /screens
    - /images
- main.js
- package.js

#### Presentation Layer

The entirety of the presentation layer is stored inside `app/screens` folder. Within this folder, each screen (or route) is stored along with any display sub-components that are unique to the route.

Display components shared across the application are stored inside `app/components`.

###### Styling

We are using `react-native-extended-stylesheets` in order to incorporate global styling easily. The default theme is located inside `app/config/theme.js`

Each component contains its own personal stylesheet, while the routes with multiple related components contain a global style sheet at the top of the folder `styles.js`

#### Business Layer

Currently, our app has begun its transition to a fully redux architecture. As such there are still some presentation components that continue to be combined with the business and data layers. Information on the redux architecture can be found [here](http://makeitopen.com/tutorials/building-the-f8-app/data/).

The basic idea of redux is to keep a global store that constantly updates "smart components;" thus allowing complex applications to monitor state across the app more efficiently. Below is a basic diagram illustrating the uni-directional flow of data through redux.

![alt text](https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966)

Our application, instantiates a global provider (store) wrapper around our application inside of `main.js`.

In order to link the components to the provider, you must connect it by wrapping your component with a connected container. To separate the redux business operations, we separated all of our containers into `app/containers`. Within each of these files, we map the global state to the component and bind the available actions (business logic functions that can be called from inside the component itself). This ensures each component only has access to the necessary state and action calls.

The available actions that can be called are inside the `app/actions` folder and are further broken down by category. (authentication actions, global actions, etc.)

When these actions creators are called within the component, a new action is created and executed before being transferred to the reducer. Our reducers are located inside `app/Reducers`. These reducers take the results of the action along with the current state and update the state to reflect these changes, which will then be propagated to all of the subscribing components.

By using this framework, our code is much more modular and easier to test because of the functional programming paradigms used by the architecture.



#### Data Layer

We define and instantiate our firebase instance inside `app/config/firebase.js`

As part of our refactoring, we have been in the process to migrating to a centralized firebase data layer. The main branch has the majority of our firebase calls within `app/screens/caregiversettings/firebasehelper`; however, the `redux-refactor` branch as begun to centralize this inside `app\lib\firebase`.

#### Support Infrastructure

We currently utilize the firebase application platform for authentication and data storage. Information on our database schema and authentication model can be found [here](./firebase.md)
